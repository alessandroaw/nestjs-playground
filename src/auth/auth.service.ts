import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.userRepository.create({
      email: dto.email,
      password: hash,
    });

    await this.userRepository.save(user);

    return user;
  }
  signin() {
    return {
      msg: 'user login',
    };
  }
}
