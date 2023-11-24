import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth';
import { User, UserInfo } from '../../decorators/User';

@Controller()
export class ProfileController {
  constructor(private readonly appService: ProfileService) {
    //
  }

  @UseGuards(JwtAuthGuard)
  @Get('/api/user/profile')
  getProfile(@User() user: UserInfo) {
    const { id } = user;
    return { id };
  }
}
