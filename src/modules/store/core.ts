import {StoreModule} from '@types'

export const coreModule: StoreModule = (store) => {
  store.on('@init', () => ({}))

  store.on('core/setup', async () => {
    await store.dispatch('code/load')
    await store.dispatch('runner/setup')
  })
}