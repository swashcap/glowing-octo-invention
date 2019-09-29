import { Field, ID, InterfaceType } from 'type-graphql'

@InterfaceType({ description: 'Describes an type that a user can navigate to' })
export abstract class NavigableEntity {
  @Field(type => ID)
  id: string

  @Field({ description: 'Full URL representing entity' })
  url: string
}
