import Redis from 'ioredis';

// export const redis = new Redis(
//   Number(process.env.REDIS_PORT),
//   process.env.REDIS_HOST,
//   { password: process.env.REDIS_PASSWORD },
// );

export const redis = new Redis(
  17886,
  'redis-17886.c293.eu-central-1-1.ec2.cloud.redislabs.com:17886',
  {
    password: 'YS9CyoxXuq3l5Lqf1tUaHOPb3DvDiYpe',
  },
);
