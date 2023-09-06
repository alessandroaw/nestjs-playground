import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return {
      msg: 'user registration',
    };
  }
  signin() {
    return {
      msg: 'user login',
    };
  }
}
