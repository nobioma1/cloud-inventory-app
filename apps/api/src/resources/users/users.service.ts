import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findOne(params: Partial<CreateUserDto>) {
    return this.userRepository.findOne({ where: { uid: params.uid } });
  }

  async findOrCreate(attrs: Partial<CreateUserDto>) {
    let user = await this.findOne(attrs);

    if (!user) {
      user = await this.create({ uid: attrs.uid });
    }

    return user;
  }
}
