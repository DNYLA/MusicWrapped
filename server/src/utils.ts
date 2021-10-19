export function getUserId(req: Express.Request) {
  if (req.session.passport.user) {
    return req.session.passport.user;
  }

  throw new AuthError();
}

export class AuthError extends Error {
  constructor() {
    super('Not Authorized');
  }
}
