import {State} from '@types'

/** Some of the state fields are string, so they're not mergeable. */
type StateKeys = Exclude<keyof State, 'code'>

export const createMerge =
  <K extends StateKeys>(key: K) =>
  (state: State, data: Partial<State[K]>): Partial<State> => ({
    [key]: {...state[key], ...data},
  })
