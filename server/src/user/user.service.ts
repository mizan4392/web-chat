import { BadGatewayException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: User) {
    const user = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (user) {
      return user;
    }
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return `This action returns all user`;
  }

  findUserByEmail(email: string) {
    return this.userRepo.findOne({
      where: {
        email,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async getUserFromToken(token: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      publicKey: process.env.JWT_PUBLIC_KEY,
      algorithms: ['RS256'],
    });
    if (!payload) {
      throw new BadGatewayException('Invalid token');
    }
    const user = await this.userRepo.findOne({
      where: {
        email: payload.email,
      },
    });
    return user;
  }
}
