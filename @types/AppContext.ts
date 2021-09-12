import {Extension} from './Extension'
import {EditorContext} from './EditorContext'
import {EditorOptions} from 'modules/view/Totality'

export type EditorSetupHandler = (
  context: EditorContext
) => Promise<void> | void

export interface ExtensionEventHandlers {
  'editor.setup': EditorSetupHandler
}

export type ExtensionHandlerMap = {
  [K in keyof ExtensionEventHandlers]: {
    ext: string
    handler: ExtensionEventHandlers[K]
  }[]
}

export interface AppContext {
  extensions: Extension[]

  handlers: ExtensionHandlerMap

  options: Record<string, any> & EditorOptions
}

export interface App {
  setup(options: SetupOptions): void
  register(extension: Extension): void
}

export interface SetupOptions {
  options: AppContext['options']
}
