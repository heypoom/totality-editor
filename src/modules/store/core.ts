import {StoreModule} from '@types'

export const coreModule: StoreModule = (store) => {
  store.on('@init', () => ({}))

  store.on('core/setup', async () => {
    await store.dispatch('code/load')

    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.store = store
    }
  })
}
