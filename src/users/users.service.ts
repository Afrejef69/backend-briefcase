import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user.entity';
import CreateUserDto from './dtos/create-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    const record = await this.userRepository.findOne({ where: { id } });
    if (record === null) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return record;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    return user;
  }

  create(newUser: CreateUserDto) {
    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
