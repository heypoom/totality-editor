import {createStoreon} from 'storeon'
import {createContext} from 'preact'
import {customContext} from 'storeon/preact'
import {storeonDevtools} from 'storeon/devtools'

import {coreModule} from './core'
import {codeModule} from './code'
import {hooksModule} from './hooks'
import {runnerModule} from './runner'
import {configModule} from './config'
import {layoutModule} from './layout'
import {rendererModule} from './renderer'
import {extensionModule} from './extension'

import {Events, State} from '@types'

export const store = createStoreon<State, Events>([
  codeModule,
  configModule,
  coreModule,
  extensionModule,
  hooksModule,
  rendererModule,
  runnerModule,
  layoutModule,
  storeonDevtools,
])

export const AppContext = createContext(store)

export const useStore = customContext(AppContext)

// Enables debugging the store.
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.store = store
}
