import {Renderer} from './Renderer'
import {EditorContext} from './EditorContext'

import {CoreOptions, Store} from '@types'

import {JSRunner, TypeScriptCompiler} from 'modules/runner'

/**
 * The extension context allows totality extensions
 * to contribute new features, such as editor modifications,
 * renderers, panels and more.
 **/
export interface ExtensionContext<Config = Record<string, any>> {
  /** The internal storeon store instance in use by the app. Allows full access to the editor's state. */
  store: Store

  /** Options that are initially supplied to the app. */
  options: Config & CoreOptions

  /** Customize the monaco editor instances. */
  editor: {
    /** Injects an editor hook, which runs when the monaco editor is initialized. */
    setup(handler: (context: EditorContext) => void): void

    /** Injects a TypeScript type definition. */
    addTypeDefinition(id: string, definition: string): void
  }

  /** Create and use custom renderers and visualizers. */
  renderer: {
    /** Create a renderer. */
    create(id: string, renderer: Renderer): void

    /** Activate a renderer. */
    use(id: string): void

    /** Store an initial value in the renderer. */
    store(value: Record<string, unknown>): void
  }

  runner: JSRunner

  typescript: {
    compiler: TypeScriptCompiler
  }
}
