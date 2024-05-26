import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import CreateUserDto from './dtos/create-user.dto';
import User from './entities/user.entity';
import { IsPublic } from 'src/common/is-public.decorator';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @IsPublic()
  findAll() {
    const users = this.usersService.findAll();
    return users;
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @IsPublic()
  @ApiCreatedResponse({
    description: 'This endpoint is used to create a new user.',
    type: User,
  })
  create(@Body() newUser: CreateUserDto) {
    return this.usersService.create(newUser);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param(':id') id: number) {
    return this.usersService.remove(id);
  }
}
