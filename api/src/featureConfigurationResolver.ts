import { Resolver, ResolverInterface, Query, FieldResolver } from 'type-graphql'

import { FeatureConfiguration } from './featureConfigurationTypes'

@Resolver(type => FeatureConfiguration)
export class FeatureConfigurationResolver
  implements ResolverInterface<FeatureConfiguration> {
  @Query(returns => FeatureConfiguration)
  featureConfiguration() {
    return {}
  }

  @FieldResolver()
  global() {
    return {
      isSignupButtonEnabled: true
    }
  }

  @FieldResolver()
  search() {
    return {
      noResultsText: 'No search results',
      resultsCount: 20
    }
  }
}
