import {
  Args,
  ArgsType,
  Field,
  FieldResolver,
  Int,
  Query,
  Resolver,
  ResolverInterface,
  Root
} from 'type-graphql'
import faker from 'faker'

import { Product } from './productTypes'

@ArgsType()
export class GetProductsArgs {
  @Field(type => Int, { nullable: true })
  page?: number

  @Field(type => Int, { nullable: true })
  resultsPerPage?: number

  @Field()
  searchText: string
}

@Resolver(type => Product)
export class ProductResolver implements ResolverInterface<Product> {
  private mockProductIds = Array.from(new Array(10)).map(() => ({
    id: faker.random.uuid()
  }))

  @Query(returns => [Product])
  products(@Args() { searchText }: GetProductsArgs) {
    return this.mockProductIds
  }

  @FieldResolver()
  brand() {
    const id = faker.random.uuid()

    return {
      id,
      name: faker.company.companyName(),
      url: id
    }
  }

  @FieldResolver()
  customerRatings() {
    return {
      currentValue: faker.random.number({ min: 0, max: 5, precision: 2 }),
      maxValue: 5,
      minValue: 0,
      ratingsCount: faker.random.number({ min: 1, max: 100 })
    }
  }

  @FieldResolver()
  description() {
    return {
      long: faker.lorem.paragraphs(2),
      short: faker.lorem.sentence()
    }
  }

  @FieldResolver()
  flags(@Root() product: Product) {
    return []
  }

  @FieldResolver()
  name() {
    return faker.commerce.productName()
  }

  @FieldResolver()
  price() {
    const current = faker.commerce.price(2, 100, 2, '$')

    return {
      current,
      sale: faker.random.boolean()
        ? faker.commerce.price(1, parseFloat(current.replace('$', '')), 2, '$')
        : undefined
    }
  }

  @FieldResolver()
  url(@Root() product: Product): string {
    return `/products/${product.id}`
  }
}
