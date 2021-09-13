import {StoreModule} from '../../../@types/Store'
import {createExtensionContext} from './createExtensionContext'

export const extensionModule: StoreModule = (store) => {
  store.on('@init', () => ({extensions: []}))

  store.on('extension/add', (state, extension) => ({
    extensions: [...state.extensions, extension],
  }))

  store.on('extension/use', async (state, extension) => {
    await store.dispatch('extension/setup', extension)

    store.dispatch('extension/add', {...extension, enabled: true})
  })

  store.on('extension/setup', async (state, extension) => {
    const context = createExtensionContext({
      store,
      extension,
      options: state.options,
    })

    await extension.setup(context)
  })
}
