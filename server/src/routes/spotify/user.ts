import Express, { Request } from 'express';
import passport from 'passport';
import { PrismaClient } from '.prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
export const userRouter = Express.Router();

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

  const range = req.query.time_range;

  const token = user.accessToken;

  try {
    const data = (
      await axios.get(
        `https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${range}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )
    ).data;

    return res.send(data);
  } catch (e: any) {
    console.error(e);
    return res.send(null);
  }
});
