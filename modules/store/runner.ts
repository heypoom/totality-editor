import {createMerge} from './utils/merge'

import {StoreModule} from '../../@types/Store'

const set = createMerge('runner')

export const runnerModule: StoreModule = (store) => {
  store.on('@init', () => ({options: {}}))

  store.on('runner/set', (s, data) => set(s, data))
}
