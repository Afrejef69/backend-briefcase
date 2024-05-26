import { PartialType } from '@nestjs/swagger';
import CreateBlogDto from './create-blog.dto';

class UpdateBlogDto extends PartialType(CreateBlogDto) {}

export default UpdateBlogDto;
