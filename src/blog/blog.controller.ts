import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BlogService } from './blog.service';
import CreateBlogDto from './dtos/create-blog.dto';
import { IsPublic } from 'src/common/is-public.decorator';

@ApiTags('blog')
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @IsPublic()
  @Get()
  findAll() {
    const blogs = this.blogService.findAll();
    return blogs;
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }

  @Post()
  @IsPublic()
  async create(@Body(new ValidationPipe()) newBlog: CreateBlogDto) {
    const validationErrors = await newBlog.validateContent();
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }
    return this.blogService.create(newBlog);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateBlog: CreateBlogDto) {
    return this.blogService.update(id, updateBlog);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id') id: number) {
    return this.blogService.remove(id);
  }
}
