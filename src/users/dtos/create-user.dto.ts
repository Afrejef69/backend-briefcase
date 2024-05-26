import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
