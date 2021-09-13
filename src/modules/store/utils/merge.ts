import {State} from '@types'

export const createMerge =
  <K extends keyof State>(key: K) =>
  (state: State, data: Partial<State[K]>): Partial<State> => ({
    [key]: {...state[key], ...data},
  })
