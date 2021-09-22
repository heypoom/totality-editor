import {compiler, runner} from 'modules/runner'

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

      addTypeDefinition(id, definition) {
        this.setup(async (context) => {
          const {monaco} = context
          const tsd = monaco.languages.typescript.typescriptDefaults

          tsd.addExtraLib(definition, `${id}.d.ts`)
        })
      },
    },

    renderer: {
      create: (id, renderer) => dispatch('renderer/add', {id, renderer}),
      use: (id) => dispatch('renderer/use', id),
      store: (data) => dispatch('renderer/store', data),
    },

    runner,

    typescript: {
      compiler,
    },
  }
}
