import {StoreonModule, StoreonStore, StoreonDispatch} from 'storeon'

import {Extension} from './Extension'
import {EditorContext} from './EditorContext'

import {EditorOptions} from '@types'

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

type CoreOptions = Record<string, any> & EditorOptions

export interface RunnerState {
  compiled: string
  variables: Record<string, any>
  error: Error | null
}

export interface State {
  extensions: Extension[]
  hooks: ExtensionHooksMap
  options: CoreOptions

  code: string
  runner: RunnerState
}

type HookPayload<T extends keyof ExtensionEventHooks> = {
  type: T
  handler: ExtensionEventHooks[T]
  extensionId: string
}

export interface Events extends RunnerEvents, ExtensionEvents {
  'core/setup': void

  'code/set': string
  'code/save': void
  'code/load': void

  'config/set': Partial<CoreOptions>
  'hooks/add': HookPayload<keyof ExtensionEventHooks>
}

export interface ExtensionEvents {
  'extension/add': Extension
  'extension/use': Extension
  'extension/setup': Extension
  'extension/use-all': Extension[] | null
}

export interface RunnerEvents {
  'runner/run': void
  'runner/setup': void
  'runner/compile': void
  'runner/set': Partial<RunnerState>
}

export type StoreModule = StoreonModule<State, Events>
export type Store = StoreonStore<State, Events>
export type Dispatch = StoreonDispatch<Events>
