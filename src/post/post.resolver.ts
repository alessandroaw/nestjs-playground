import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './post.entity';
import { UserService } from 'src/user/user.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private postService: PostService,
    private userSerice: UserService,
  ) {}

  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @ResolveField()
  user(@Parent() post: Post) {
    return this.userSerice.findById(post.userId);
  }
}
