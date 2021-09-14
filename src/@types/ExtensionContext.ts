import {Renderer} from './Renderer'
import {EditorContext} from './EditorContext'

import {Store} from '@types'

export interface ExtensionContext<Config = Record<string, any>> {
  store: Store
  options: Config & Record<string, any>

  /** Contains the Monaco Editor instances. */
  editor: {
    /** Customize the monaco editor. */
    setup(handler: (context: EditorContext) => void): void
  }

  /** Create and use custom renderers and visualizers. */
  renderer: {
    create(id: string, renderer: Renderer): void
    use(id: string): void
  }
}
