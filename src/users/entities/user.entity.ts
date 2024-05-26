import { ApiProperty } from '@nestjs/swagger';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import Blog from 'src/blog/entities/blog.entity';

@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'Users full name',
    example: 'John Doe',
  })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({
    description: 'The email of the User',
    example: 'example@correo.com',
  })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @ManyToOne(() => Blog, (blog) => blog.user)
  blog: Blog[];

  @BeforeInsert()
  async hashPassword() {
    const saltOrRounds = 10;
    const hash = bcrypt.hash(this.password, saltOrRounds);
    this.password = await hash;
  }
}

export default User;
