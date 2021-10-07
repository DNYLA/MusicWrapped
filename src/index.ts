import Express from 'express';
import cors from 'cors';
import { Strategy as SpotifyStrategy } from 'passport-spotify';
import passport from 'passport';
import session from 'express-session';

const main = async () => {
  const app = Express();

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj: any, done) {
    done(null, obj);
  });

  passport.use(
    new SpotifyStrategy(
      {
        clientID: '7a1747aec320462db0de26fe71a939bf',
        clientSecret: '7f905e97b5c0437eba962530f1cdc4d8',
        callbackURL: 'http://localhost:4000/auth/spotify/callback',
      },
      function (accessToken, refreshToken, expires_in, profile, done) {
        console.log(accessToken);

        process.nextTick(function () {
          return done(null, profile);
        });
      },
    ),
  );

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/', function (req, res) {
    console.log(req.accepted);
    res.send('Hello World');
  });

  app.get(
    '/auth/spotify',
    passport.authenticate('spotify', {
      scope: ['user-read-email', 'user-read-private'],
    }),
  );

  app.get(
    '/auth/spotify/callback',
    passport.authenticate('spotify', { failureRedirect: '/error' }),
    function (req, res) {
      console.log('running?');

      console.log(req._destroy);
      // Successful authentication, redirect home.
      // res.send('hello');
      res.redirect('/');
    },
  );

  app.get('/error', function (req, res) {
    console.log(req._destroy);
    res.send('Invalid Login');
  });

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
  });
};

main().catch((err) => {
  console.error(err);
});
