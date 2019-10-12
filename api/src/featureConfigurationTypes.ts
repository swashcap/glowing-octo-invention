import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType({
  description: 'Feature configuration that applies to the entire application'
})
export class GlobalFeatureConfiguration {
  @Field({ defaultValue: false })
  isSignupButtonEnabled: boolean
}

@ObjectType({
  description:
    'Feature configuration that applies to a specific feature/page, search'
})
export class SearchFeatureConfiguration {
  @Field({
    description:
      'A user interface message to present when a search yields no results'
  })
  noResultsText: string = ''
  @Field(type => Int, {
    description: 'The default number of search results to request'
  })
  resultsCount: number = 20
}

@ObjectType({
  description:
    'An object that describes features available to the current user in their session. This could enable dynamic feature flags, A/B testing, etc.'
})
export class FeatureConfiguration {
  @Field()
  global: GlobalFeatureConfiguration
  @Field()
  search: SearchFeatureConfiguration
}
