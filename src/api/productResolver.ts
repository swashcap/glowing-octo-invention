import { Query, Resolver, Arg } from 'type-graphql'

import { Product } from './productTypes'

@Resolver(type => Product)
export class ProductResolver {
  @Query(returns => [Product])
  products(@Arg('id') id: string) {
    return []
  }
}
