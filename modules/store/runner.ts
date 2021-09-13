import {createMerge} from './utils/merge'

import {StoreModule} from '../../@types/Store'

const set = createMerge('runner')

export const runnerModule: StoreModule = (store) => {
  store.on('@init', () => ({
    runner: {
      compiled: '',
      variables: {},
      error: null,
    },
  }))

  store.on('runner/set', (s, data) => set(s, data))
}
