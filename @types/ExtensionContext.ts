import {EditorContext} from './EditorContext'

export interface ExtensionContext<Config = Record<string, any>> {
  /** Contains the Monaco Editor instances. */
  editor: {
    /** Customize the monaco editor. */
    setup: (handler: (context: EditorContext) => void) => void
  }

  options: Config & Record<string, any>
}
