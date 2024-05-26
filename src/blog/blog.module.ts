import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Blog from './entities/blog.entity';
import { BlogController } from './blog.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from 'src/auth/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Blog])],
  controllers: [BlogController],
  providers: [
    BlogService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
  exports: [BlogService],
})
export class BlogModule {}
