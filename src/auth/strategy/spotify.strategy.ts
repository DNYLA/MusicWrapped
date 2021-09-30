import { Strategy } from 'passport-spotify';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SpotifyStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super({
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL,
      scope: ['user-top-read'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    expires_in: string,
    profile: any,
    done: boolean,
  ) {
    this.authService.validateUser({
      accessToken,
      refreshToken,
      expires_in,
      profile,
      done,
    });
  }
}
