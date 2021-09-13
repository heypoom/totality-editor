import {State} from '../../../@types/Store'

export const createMerge =
  <K extends keyof State>(key: K) =>
  (state: State, data: Partial<State[K]>): Partial<State> => ({
    [key]: {...state[key], ...data},
  })
