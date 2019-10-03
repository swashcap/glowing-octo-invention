import { useReducer } from 'preact/hooks'

import { ApiError } from '../api/makeRequest'
import { useAsyncEffect } from './useAsyncEffect'

export type State<D, E = ApiError> =
  | {
      data: null
      error: null
      isFetching: boolean
      isLoaded: false
    }
  | {
      data: D
      error: null
      isFetching: false
      isLoaded: true
    }
  | {
      data: null
      error: E
      isFetching: false
      isLoaded: true
    }

export type Actions<D, E = ApiError> =
  | {
      payload: null
      type: 'START_FETCHING'
    }
  | {
      payload: D
      type: 'SET_DATA'
    }
  | {
      payload: E
      type: 'SET_ERROR'
    }

export const getInitialState = <D>(): State<D> => ({
  data: null,
  error: null,
  isFetching: false,
  isLoaded: false
})

export const getUseApiRequest = <
  F extends (...args: any[]) => Promise<any>,
  D = ReturnType<F> extends Promise<infer U> ? U : never
>(
  fn: F
) => (...args: Parameters<F>): State<D> => {
  const [state, setState] = useReducer<
    Readonly<State<D>>,
    Readonly<Actions<D>>
  >((state, action) => {
    if (action.type === 'SET_DATA') {
      return {
        data: action.payload,
        error: null,
        isFetching: false,
        isLoaded: true
      }
    } else if (action.type === 'SET_ERROR') {
      return {
        data: null,
        error: action.payload,
        isFetching: false,
        isLoaded: true
      }
    } else if (action.type === 'START_FETCHING') {
      return {
        data: null,
        error: null,
        isFetching: true,
        isLoaded: false
      }
    }

    return state
  }, getInitialState())

  useAsyncEffect(async () => {
    setState({
      payload: null,
      type: 'START_FETCHING'
    })

    try {
      setState({
        payload: await fn(...args),
        type: 'SET_DATA'
      })
    } catch (payload) {
      setState({
        payload,
        type: 'SET_ERROR'
      })
    }
  }, args)

  return state
}
