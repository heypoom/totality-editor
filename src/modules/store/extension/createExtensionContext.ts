import {Store, Extension, ExtensionContext} from '@types'

interface Config {
  store: Store
  extension: Extension
  options: Record<string, any>
}

export const createExtensionContext = (config: Config): ExtensionContext => {
  const {store, extension, options} = config
  const {dispatch} = store

  return {
    store,
    options,

    editor: {
      setup(handler) {
        dispatch('hooks/add', {
          handler,
          type: 'editor.setup',
          extensionId: extension.id,
        })
      },
    },

    renderer: {
      create: (id, renderer) => dispatch('renderer/add', {id, renderer}),
      use: (id) => dispatch('renderer/use', id),
    },
  }
}
