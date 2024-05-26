import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LocalGuard } from './local.guard';
import User from 'src/users/entities/user.entity';
import { Request } from 'express';
import { IsPublic } from 'src/common/is-public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly jwtService: JwtService) {}

  @IsPublic()
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() request: Request) {
    const user = request.user as User;

    const payload = {
      sub: user.id,
      name: `${user.name}`,
      iat: new Date().getTime(),
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }
}
