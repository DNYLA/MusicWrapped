import Express, { Request } from 'express';
import passport from 'passport';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import { PrismaClient } from '.prisma/client';

const prisma = new PrismaClient();
const authRouter = Express.Router();

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
    scope: ['user-read-email', 'user-read-private'],
  }),
);

authRouter.get(
  '/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/error' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.session);
    // res.send(req.session);
    // req.session.userId = res.use;
    // res.send('hello');-
    res.redirect('/');
  },
);

authRouter.get('/spotify/details', function (req, res: Express.Response) {});

export { authRouter };

// export default authRouter;
