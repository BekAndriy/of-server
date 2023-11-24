import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentials } from './models';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
    //
  }

  @Post('/api/user/auth/login')
  login(@Body() body: AuthCredentials) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }
}
