import { Controller, Get, Param } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get('/create-random/:userId')
  createRandomPost(@Param('userId') userId: number) {
    return this.postService.createRandomPost(userId);
  }

  @Get('/')
  findAll() {
    return this.postService.findAll();
  }

  @Get('/:id')
  findById(@Param('id') id: number) {
    return this.postService.findById(id);
  }

  @Get('/hello')
  hello() {
    return 'hello';
  }
}
