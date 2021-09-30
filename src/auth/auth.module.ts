import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotifyStrategy } from 'src/auth/strategy/spotify.strategy';
import { User } from 'src/entities/User';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [
    SpotifyStrategy,
    { provide: 'AUTH_SERVICE', useClass: AuthService },
  ],
  imports: [TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
