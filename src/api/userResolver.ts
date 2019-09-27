import { Arg, Query, Resolver, ResolverInterface } from 'type-graphql'

import { User } from './userType'

@Resolver(type => User)
export class UserResolver {
  @Query(returns => User)
  async user(@Arg('id') id: string): Promise<User> {
    return { id }
  }
}
