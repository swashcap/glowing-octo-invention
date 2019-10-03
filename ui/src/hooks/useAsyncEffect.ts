import { useEffect, Inputs } from 'preact/hooks'

export const useAsyncEffect = (effect: () => Promise<any>, inputs?: Inputs) =>
  useEffect(() => {
    effect()
  }, inputs)
