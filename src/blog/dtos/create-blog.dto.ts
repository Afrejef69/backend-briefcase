import { IsEnum, IsString } from 'class-validator';
import { Genre } from '../entities/blog.entity';

export default class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(Genre)
  genre: Genre;

  async validateContent(): Promise<string[]> {
    const minwords = 2500;
    const wordcount = this.content.trim().split(/\s+/).length;

    if (wordcount < minwords) {
      return [
        `The content should have at least ${minwords} words, currently it has ${wordcount} words.`,
      ];
    }
    return [];
  }
}
