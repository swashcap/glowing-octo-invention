import { createContext } from 'preact'

import { getInitialState, getUseApiRequest } from '../hooks/useApiRequest'
import { makeRequest } from './makeRequest'

export const InitialData = createContext(getInitialState<InitialData>())

export interface InitialData {
  featureConfiguration: {
    global: {
      isSignupButtonEnabled: boolean
    }
    search: {
      noResultsText: string
      resultsCount: number
    }
  }
  user: {
    avatar: {
      scale_1x: {
        scaleFactor: string
        url: string
      }
      scale_2x: {
        scaleFactor: string
        url: string
      }
    }
  }
}

export const useInitialData = getUseApiRequest(() =>
  makeRequest<InitialData>({
    query: `{
  featureConfiguration {
    global {
      isSignupButtonEnabled
    }
    search {
      noResultsText
      resultsCount
    }
  }
  user(id: "1") {
    avatar {
      scale_1x {
        scaleFactor
        url
      }
      scale_2x {
        scaleFactor
        url
      }
    }

  }
}`
  })
)
