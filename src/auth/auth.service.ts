import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
  async validateUser(details: any) {
    console.log(details.expires_in.id);
    console.log(details);

    const userDetails = {
      spotifyId: details.expires_in.id,
      username: details.expires_in.displayName,
      accessToken: details.accessToken,
      refreshToken: details.refreshToken,
    };

    const user = await this.userRepo.findOne({
      spotifyId: details.expires_in.id,
    });

    if (user) {
      //update Info
      await this.userRepo.update(
        { spotifyId: userDetails.spotifyId },
        userDetails,
      );
      console.log('Updated');
      return;
    }

    return this.createUser(userDetails);
  }
  createUser(details: any) {
    return this.userRepo.save(details);
  }
}
