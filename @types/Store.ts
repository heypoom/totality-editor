import {StoreonModule, StoreonStore, StoreonDispatch} from 'storeon'

import {Extension} from './Extension'
import {EditorContext} from './EditorContext'

import {EditorOptions} from 'modules/view/Totality'

export type EditorSetupHook = (context: EditorContext) => Promise<void> | void

export interface ExtensionEventHooks {
  'editor.setup': EditorSetupHook
}

export type ExtensionHooksMap = {
  [K in keyof ExtensionEventHooks]: {
    ext: string
    handler: ExtensionEventHooks[K]
  }[]
}

export interface State {
  extensions: Extension[]
  hooks: ExtensionHooksMap
  options: Record<string, any> & EditorOptions
}

type HookPayload<T extends keyof ExtensionEventHooks> = {
  type: T
  handler: ExtensionEventHooks[T]
  extensionId: string
}

export interface Events {
  'extension/add': Extension
  'extension/use': Extension
  'extension/setup': Extension

  'hooks/add': HookPayload<keyof ExtensionEventHooks>
}

export type StoreModule = StoreonModule<State, Events>
export type Store = StoreonStore<State, Events>
export type Dispatch = StoreonDispatch<Events>
