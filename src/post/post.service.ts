import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findById(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({
      where: { id },
    });
    return post;
  }

  async createRandomPost(userId: number): Promise<Post> {
    const post = new Post();
    post.title = 'Post ' + Math.random();
    post.content = 'Content ' + Math.random();
    post.userId = userId;
    return await this.postRepository.save(post);
  }
}
