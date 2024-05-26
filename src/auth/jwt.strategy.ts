import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { BlogService } from 'src/blog/blog.service';
import { UsersService } from 'src/users/users.service';

type Payload = {
  sub: number;
  email: string;
  iat: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly blogService: BlogService,
  ) {
    console.log('JWT_SECRET:', process.env.JWT_SECRET);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Payload) {
    const user = await this.usersService.findOne(payload.sub);
    const blog = await this.blogService.findOne(payload.sub);
    return {
      user,
      blog,
    };
  }
}
