import {createMerge} from './utils/merge'

import {StoreModule} from '../../@types/Store'

const set = createMerge('runner')

export const runnerModule: StoreModule = (store) => {
  store.on('@init', () => ({options: {}}))

  store.on('runner/set-error', (s, error) => set(s, {error}))
  store.on('runner/set-compiled', (s, compiled) => set(s, {compiled}))
  store.on('runner/set-variables', (s, variables) => set(s, {variables}))

  store.on('runner/override', (s, data) => set(s, data))
}
