import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models';

@Injectable()
export class AuthService {
  // Fake DB users
  private readonly users = [
    {
      id: '7ca8c5bd-1b42-41bf-8670-2b9bffea1c39',
      email: 'test@email.com',
      password: 'Pa$$W0rd!',
    },
  ];

  constructor(private jwtService: JwtService) {
    //
  }

  getUserByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  validateUser(email: string, password: string) {
    const userPassword = this.getUserPasswordByEmail(email);
    this.validatePassword(userPassword, password);
  }

  validatePassword(userPassword: string, inputPassword: string) {
    if (userPassword !== inputPassword) {
      this.throwUnauthorizedError();
    }
  }

  throwUnauthorizedError() {
    throw new UnauthorizedException();
  }

  getUserPasswordByEmail(email: string) {
    return this.getUserByEmail(email)?.password;
  }

  login(email: string, password: string) {
    this.validateUser(email, password);
    const user = this.getUserByEmail(email);
    return {
      access_token: this.jwtService.sign({ id: user.id }),
    };
  }
}
