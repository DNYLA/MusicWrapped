import Express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/spotify/user';
import { PrismaClient } from '@prisma/client';
import { redis } from './redis';
import { User } from './types/User';
import { isAuthorized } from './routes/auth';
import 'dotenv/config';
require('dotenv').config();

const prisma = new PrismaClient();

declare module 'express-session' {
  interface Session {
    passport: { user: User };
  }
}

const main = async () => {
  require('dotenv').config();
  const app = Express();
  const RedisStore = connectRedis(session);

  app.use(
    session({
      store: new RedisStore({
        client: redis,
      }),
      secret: process.env.COOKIE_SECRET!,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, //1 Week
      },
    }),
  );

  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3000/'],
      credentials: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  //Custom Middleware
  app.use('/', isAuthorized);

  app.get('/', async function (req, res) {
    console.log('abcdefgasd');
    console.log(req.session);
    // const allUsers = await prisma.user.findMany();
    const passportSession = req.session.passport!;
    if (!passportSession) {
      return res.send('Not Logged In');
    }

    // if (!user) {
    // }

    const curUser = await prisma.user.findUnique({
      where: { id: passportSession.user.id },
    });
    // res.send(allUsers);
    return res.send(curUser);
  });

  app.use('/auth', authRouter);
  app.use('/spotify', userRouter);

  app.get('/error', function (req, res) {
    res.send('Invalid Login');
  });

  app.listen(4000, () => {
    console.log('Server started on http://localhost:4000');
  });
};

main()
  .catch((e) => {
    console.error(e);
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
