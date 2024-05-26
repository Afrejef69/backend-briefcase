import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Blog from './entities/blog.entity';
import CreateBlogDto from './dtos/create-blog.dto';
import UpdateBlogDto from './dtos/update-blog.dto';

@Injectable()
export class BlogService {
  private blogs = [];

  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}

  findAll(): Promise<Blog[]> {
    return this.blogRepository.find();
  }

  async findOne(id: number) {
    const record = this.blogRepository.findOne({ where: { id } });
    if (record === null) {
      throw new NotFoundException(`Blog with id ${id} not found`);
    }
    return record;
  }

  create(newblog: CreateBlogDto) {
    const blog = this.blogRepository.create(newblog);
    return this.blogRepository.save(blog);
  }

  async update(id: number, updateBlog: UpdateBlogDto) {
    const blog = await this.findOne(id);
    this.blogRepository.merge(blog, updateBlog);
    return this.blogRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.findOne(id);
    return this.blogRepository.remove(blog);
  }
}
