import { Field, Int, ObjectType, registerEnumType } from 'type-graphql'

import { NavigableEntity } from './utilityTypes'
import { ScalableImageCollection } from './imageTypes'

@ObjectType({
  description:
    'The brand that created the product, such as "Apple", "Adidas", or "Outdoor Research".',
  implements: NavigableEntity
})
export class ProductBrand implements NavigableEntity {
  id: string

  @Field({ description: "Brand's name, suitable for presentation" })
  name: string

  url: string
}

@ObjectType({
  description:
    'A taxinomical bucket for the product to permit discovery of simliar products, such as "Flashlights", "Women\'s Footwear", or "Children\'s Hiking Boots".',
  implements: NavigableEntity
})
export class ProductCategory implements NavigableEntity {
  id: string

  @Field({ description: "Category's name, suitable for presentation" })
  name: string

  url: string
}

@ObjectType()
export class ProductCustomerRatings {
  @Field({ description: "The product's current rating" })
  currentValue: number

  @Field(type => Int, { defaultValue: 5 })
  maxValue: number

  @Field(type => Int, { defaultValue: 0 })
  minValue: number

  @Field(type => Int, { description: 'The total count of ratings' })
  ratingsCount: number
}

@ObjectType()
export class ProductDescription {
  @Field({ description: 'Summary of the product' })
  short: string

  @Field({ description: 'May contain HTML' })
  long: string
}

export enum ProductFlagType {
  Delivery = 'DELIVERY',
  Offer = 'OFFER'
}

registerEnumType(ProductFlagType, {
  description: `Describes the \`ProductFlag\`'s type, suitable for adjusting the presentation of the flag:

* \`Delivery\`: Relates to the deliverable status of the product. This should correspond to text like "Free pickup", "Sold and shipped by Apple Computers", or "Free 1-day shipping".
* \`Offer\`: Relates to sale offering of the product. This should correspond to text like "Clearance", "On Sale", or "Discounted".
`,
  name: 'ProductFlagType'
})

@ObjectType()
export class ProductFlag {
  @Field({ description: "Flag's text, suitable for presentation" })
  text: string

  @Field(type => ProductFlagType, { description: 'Type of flag' })
  type: ProductFlagType
}

@ObjectType()
export class ProductPrice {
  @Field()
  current: string
  @Field({ nullable: true })
  sale?: string
  @Field({ nullable: true })
  pricePerUnit?: string
}

@ObjectType()
export class ProductSeller implements NavigableEntity {
  id: string

  @Field()
  name: string

  url: string
}

@ObjectType({
  description:
    'Represents a sellable product, usable for search, order history, detail views, etc.',
  implements: NavigableEntity
})
export class Product implements NavigableEntity {
  @Field()
  brand: ProductBrand

  @Field(type => [ProductCategory])
  categories: ProductCategory[]

  @Field({
    description: "Summary of customers' ratings for the product"
  })
  customerRatings: ProductCustomerRatings

  @Field()
  description: ProductDescription

  @Field(type => [ProductFlag], {
    description: "A bucket for the product's presentation elements"
  })
  flags: ProductFlag[]

  id: string

  @Field({ nullable: true })
  manufacturer?: string

  @Field()
  name: string

  @Field()
  previewImage: ScalableImageCollection

  @Field()
  price: ProductPrice

  @Field({ nullable: true })
  seller?: ProductSeller

  url: string
}
