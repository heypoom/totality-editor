import {StoreModule} from '../../@types/Store'

export const hooksModule: StoreModule = (store) => {
  store.on('@init', () => ({options: {}}))

  store.on('config/set', (state, options) => ({
    options: {...state.options, options},
  }))
}
