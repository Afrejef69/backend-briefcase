import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import User from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signIn(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (user == undefined) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
