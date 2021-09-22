import {createExtensionContext} from './createExtensionContext'

import {Extension, StoreModule} from '@types'

const mergeOptions = <T>(options: T, extension: Extension) => ({
  ...(extension.options ?? {}),
  ...(extension.defaultConfig ?? {}),
  ...options,
})

export const extensionModule: StoreModule = (store) => {
  store.on('@init', () => ({extensions: []}))

  store.on('extension/add', (state, extension) => ({
    extensions: [...state.extensions, extension],
    options: mergeOptions(state.options, extension),
  }))

  store.on('extension/use', async (state, extension) => {
    await store.dispatch('extension/add', {...extension, enabled: true})

    await store.dispatch('extension/setup', extension)
  })

  store.on('extension/setup', async (state, extension) => {
    const context = createExtensionContext({
      store,
      extension,
      options: state.options,
      runnerId: state.runner.id,
    })

    await extension.setup(context)
  })

  store.on('extension/use-all', async (state, extensions) => {
    if (!extensions) return

    console.log('Extensions to register:', extensions)

    console.time('register extension')

    for (const extension of extensions) {
      await store.dispatch('extension/use', extension)
    }

    console.timeEnd('register extension')
  })
}
