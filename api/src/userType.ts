import { ObjectType, Field } from 'type-graphql'

import { NavigableEntity } from './utilityTypes'
import { ScalableImageCollection } from './imageTypes'

@ObjectType({ implements: NavigableEntity })
export class User implements NavigableEntity {
  @Field(type => ScalableImageCollection)
  avatar: ScalableImageCollection
  id: string
  url: string
}
