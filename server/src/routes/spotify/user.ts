import Express, { Request } from 'express';
import passport from 'passport';
import { PrismaClient } from '.prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
export const userRouter = Express.Router();

userRouter.use(function (req, res, next) {
  const isAuth = req.isAuthenticated();
  console.log(isAuth);

  if (!isAuth) {
    res.redirect('/auth/spotify');
  } else {
    next();
  }
});

userRouter.get('/user', async function (req, res: Express.Response) {
  const passportSession = req.session.passport!;
  if (!passportSession) {
    return res.send(null);
  }

  const curUser = await prisma.user.findUnique({
    where: { id: passportSession.user.id },
  });

  return res.send(curUser);
});

userRouter.get('/top/tracks', async function (req, res: Express.Response) {
  const passportSession = req.session.passport!;
  if (!passportSession) {
    console.log('Invalid Passport Session');
    return res.send('Not Logged In');
  }

  const user = await prisma.user.findUnique({
    where: { id: passportSession.user.id },
  });

  if (!user) {
    return res.send('Not Logged In');
  }

  if (!req.query.time_range) {
    return;
  }

  const range: Range =
    Range[req.query.time_range as unknown as keyof typeof Range];

  console.log('Test ' + req.query.time_range);
  console.log(range);

  const token = user.accessToken;
  let url = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${range}`;
  // let url = `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_range`;

  console.log(url);

  try {
    const data = (
      await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;

    // data.map((song: any) => console.log(song));
    return res.send(data);
  } catch (e: any) {
    console.error(e);
    return res.send(null);
  }
});

//Fix So Allows you to use Uppercase
enum Range {
  long = 'long_term',
  medium = 'medium_term',
  short = 'short_term',
}
