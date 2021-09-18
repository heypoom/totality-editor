import {StoreonModule, StoreonStore, StoreonDispatch} from 'storeon'

import {Renderer} from './Renderer'
import {Extension} from './Extension'
import {EditorContext} from './EditorContext'
import {LayoutPreset, LayoutState, Panel} from './LayoutState'

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

type CoreOptions = Record<string, any> &
  EditorOptions &
  Partial<TotalityOptions>

export interface TotalityOptions {
  'layout.height': string
  'theme.background': string
}

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
  layout: LayoutState

  renderer: {
    renderers: Record<string, Renderer>
  }
}

type HookPayload<T extends keyof ExtensionEventHooks> = {
  type: T
  handler: ExtensionEventHooks[T]
  extensionId: string
}

export interface Events extends RunnerEvents, ExtensionEvents, RendererEvents {
  'core/setup': void

  'code/set': string
  'code/save': void
  'code/load': void

  'config/set': Partial<CoreOptions>
  'hooks/add': HookPayload<keyof ExtensionEventHooks>

  'layout/set': Partial<LayoutState>
}

export interface ExtensionEvents {
  'extension/add': Extension
  'extension/use': Extension
  'extension/setup': Extension
  'extension/use-all': Extension[] | null
}

export interface RendererEvents {
  'renderer/add': {id: string; renderer: Renderer}
  'renderer/use': string
}

export interface LayoutEvents {
  'panel/add': Panel
  'layout/use': LayoutPreset
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
