import {
  Arg,
  Query,
  Resolver,
  ResolverInterface,
  FieldResolver
} from 'type-graphql'

import { User } from './userType'

@Resolver(type => User)
export class UserResolver implements ResolverInterface<User> {
  @Query(returns => User)
  async user(@Arg('id') id: string): Promise<Pick<User, 'id' | 'url'>> {
    return { id, url: id }
  }

  @FieldResolver()
  async avatar() {
    return {
      scale_1x: {
        height: 40,
        scaleFactor: '1x',
        url: 'http://placekitten.com/40/40?image=4',
        width: 40
      },
      scale_2x: {
        height: 80,
        scaleFactor: '2x',
        url: 'http://placekitten.com/80/80?image=4',
        width: 80
      }
    }
  }
}
