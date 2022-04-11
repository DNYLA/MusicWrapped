import Express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { PrismaClient } from '.prisma/client';

import 'dotenv/config';

const prisma = new PrismaClient();
const authRouter = Express.Router();

//Change to Serialize ID only.
passport.serializeUser(async function (data: any, done) {
  const { id, username, displayName, photos } = data.profile;
  const photoUrl = photos[0].value ? photos[0].value : null;
  const upsertedUser = await prisma.user.upsert({
    where: { id },
    update: {
      displayName: displayName,
      photoUrl: photoUrl,
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      expires_in: data.expires_in,
    },
    create: {
      id,
      username,
      displayName: displayName,
      photoUrl: photoUrl,
      refreshToken: data.refreshToken,
      accessToken: data.accessToken,
      expires_in: data.expires_in,
    },
  });
  done(null, upsertedUser);
});

//Change to fetch User from ID.
passport.deserializeUser(function (obj: any, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      callbackURL: '/auth/spotify/callback',
    },
    function (accessToken, refreshToken, expires_in, profile, done) {
      console.log(accessToken);
      console.log(expires_in);

      process.nextTick(function () {
        return done(null, { profile, accessToken, refreshToken, expires_in });
      });
    },
  ),
);

authRouter.get(
  '/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private', 'user-top-read'],
  }),
);

authRouter.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.session);
    console.log('Call Back Hit?');
    // res.send(req.session);
    // req.session.userId = res.use;
    // res.send('hello');-
    res.redirect(process.env.REACT_FRONTEND_REDIRECT!);
  },
);

authRouter.get('/spotify/details', function (req, res: Express.Response) {});

export { authRouter };

export async function isAuthorized(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Running Auth Tesat');
  const passportSession = req.session.passport!;

  if (!passportSession) {
    var err = new Error('Not Authorized!');
    res.status(401).send(err);
    res.redirect('/auth/spotify');
    return next(err);
  }

  const user = await prisma.user.findUnique({
    where: { id: passportSession.user.id },
  });

  if (user) {
    return next();
  }

  var err = new Error('Not Authorized!');
  res.status(401).send(err);
  res.redirect('/auth/spotify');
  return next(err);
}

// export default authRouter;
