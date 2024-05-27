import { ApiProperty } from '@nestjs/swagger';
import User from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum Genre {
  develop = 'develop',
  design = 'design',
  lifestyle = 'lifestyle',
  technology = 'technology',
  programming = 'programming',
}

@Entity('blogs')
class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'The title of the Blog',
    example: 'Title of the blog',
  })
  title: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'The content of the Blog',
    example: 'Content of the blog',
  })
  content: string;

  @Column({ type: 'enum', enum: Genre })
  @ApiProperty({
    description:
      'The genre of the Blog, choices: develop, design, lifestyle, technology, programming',
    example: 'desarrollo',
  })
  genre: Genre;

  @ManyToOne(() => User, (user) => user.blog)
  user: User;
}

export default Blog;
