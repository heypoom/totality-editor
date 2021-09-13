import {StoreModule} from '@types'

export const configModule: StoreModule = (store) => {
  store.on('@init', () => ({options: {}}))

  store.on('config/set', (state, options) => ({
    options: {...state.options, ...options},
  }))
}
