import {Dispatch, Extension, ExtensionContext} from '@types'

interface Config {
  dispatch: Dispatch
  extension: Extension
  options: Record<string, any>
}

export const createExtensionContext = (config: Config): ExtensionContext => {
  const {extension, options, dispatch} = config

  return {
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

    options,
  }
}
