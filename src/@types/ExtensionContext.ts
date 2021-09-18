import {Renderer} from './Renderer'
import {TotalityOptions} from './store'
import {EditorContext} from './EditorContext'

import {Store} from '@types'

/**
 * The extension context allows totality extensions
 * to contribute new features, such as editor modifications,
 * renderers, panels and more.
 **/
export interface ExtensionContext<Config = Record<string, any>> {
  /** The internal storeon store instance in use by the app. Allows full access to the editor's state. */
  store: Store

  /** Options that are initially supplied to the app. */
  options: Config & TotalityOptions & Record<string, any>

  /** Customize the monaco editor instances. */
  editor: {
    /** Injects an editor hook, which runs when the monaco editor is initialized. */
    setup(handler: (context: EditorContext) => void): void
  }

  /** Create and use custom renderers and visualizers. */
  renderer: {
    /** Create a renderer. */
    create(id: string, renderer: Renderer): void

    /** Activate a renderer. */
    use(id: string): void
  }
}
