import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PostService } from 'src/post/post.service';
import { User } from './user.entity';
import { UserService } from './user.service';
import { Post } from 'src/post/post.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ResolveField()
  async posts(@Parent() user: User): Promise<Post[]> {
    return this.postService.findByUserId(user.id);
  }
}
