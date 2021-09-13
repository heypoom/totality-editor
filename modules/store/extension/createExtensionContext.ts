import {Store} from '../../../@types/Store'
import {Extension} from '../../../@types/Extension'
import {ExtensionContext} from '../../../@types/ExtensionContext'

interface Config {
  store: Store
  extension: Extension
  options: Record<string, any>
}

export const createExtensionContext = (config: Config): ExtensionContext => {
  const {store, extension, options} = config

  return {
    editor: {
      setup(handler) {
        store.dispatch('hooks/add', {
          handler,
          type: 'editor.setup',
          extensionId: extension.id,
        })
      },
    },

    options,
  }
}
