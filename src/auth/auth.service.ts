import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwt: JwtService,
    private config: ConfigService,
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
  async signin(dto: SignupDto) {
    // finduser by email
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new ForbiddenException('email or password is wrong');
    }

    // compare password
    const isMatches = await argon.verify(user.password, dto.password);
    if (!isMatches) {
      throw new ForbiddenException('email or password is wrong');
    }

    // generate token
    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('jwt.secret');
    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret,
    });

    return { access_token };
  }
}
