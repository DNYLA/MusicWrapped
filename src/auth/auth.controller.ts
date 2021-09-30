import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SpotifyAuthGuard } from 'src/auth/guards/SpotifyAuth.guard';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {}

  @Get('login')
  @UseGuards(SpotifyAuthGuard)
  login() {
    return 'Logging In';
  }

  @Get('redirect')
  @UseGuards(SpotifyAuthGuard)
  redirect(@Res() res: Response) {
    // res.redirect(process.env.FRONT_END_URL);
    console.log('Logged In');
    return 'Valid';
  }
}
