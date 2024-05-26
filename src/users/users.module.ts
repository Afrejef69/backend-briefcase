import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';
import { UsersController } from './users.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
