import {StoreModule} from '../../@types/Store'

export const codeModule: StoreModule = (store) => {
  store.on('@init', () => ({code: ''}))

  store.on('code/set', (s, code) => ({code}))
}
