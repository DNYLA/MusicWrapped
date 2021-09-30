import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SpotifyAuthGuard extends AuthGuard('spotify') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;

    return activate;
  }
}
