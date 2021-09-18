import {StoreonModule, StoreonStore, StoreonDispatch} from 'storeon'

import {ExtensionEvents} from './extension'
import {RunnerState, RunnerEvents} from './runner'
import {ExtensionHooksMap, HooksEvents} from './hooks'

import {Renderer} from '../Renderer'
import {LayoutPreset, LayoutState, Panel} from '../LayoutState'

import {CoreOptions, Extension} from '@types'

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

export type Events = RunnerEvents &
  ExtensionEvents &
  RendererEvents &
  HooksEvents & {
    'core/setup': void

    'code/set': string
    'code/save': void
    'code/load': void

    'config/set': Partial<CoreOptions>
    'layout/set': Partial<LayoutState>
  }

export interface RendererEvents {
  'renderer/add': {id: string; renderer: Renderer}
  'renderer/use': string
}

export interface LayoutEvents {
  'panel/add': Panel
  'layout/use': LayoutPreset
}

export type StoreModule = StoreonModule<State, Events>
export type Store = StoreonStore<State, Events>
export type Dispatch = StoreonDispatch<Events>
