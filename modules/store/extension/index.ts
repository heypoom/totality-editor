import {createExtensionContext} from './createExtensionContext'

import {StoreModule} from '@types'

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
      extension,
      options: state.options,
      dispatch: store.dispatch,
    })

    await extension.setup(context)
  })

  store.on('extension/use-all', async (state, extensions) => {
    if (!extensions) return

    console.time('register extension')

    for (const extension of extensions) {
      await store.dispatch('extension/use', extension)
    }

    console.timeEnd('register extension')
  })
}
