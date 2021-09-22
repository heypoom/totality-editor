import {Store, Extension, ExtensionContext} from '@types'

import {compiler} from 'modules/runner'
import {editorManager, runnerManager} from 'modules/core'

interface Config {
  store: Store
  runnerId: string
  extension: Extension
  options: Record<string, any>
}

const {typeDefs} = editorManager

export const createExtensionContext = (config: Config): ExtensionContext => {
  const {store, extension, options, runnerId} = config
  const {dispatch} = store

  const runner = runnerManager.of(runnerId)

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
        // Prevent duplicate type definitions.
        if (typeDefs.has(id)) return
        typeDefs.set(id, definition)

        // Register type definition with the language service.
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
