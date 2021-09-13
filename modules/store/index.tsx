import {createStoreon} from 'storeon'
import {createContext} from 'preact'
import {customContext} from 'storeon/preact'
import {storeonDevtools} from 'storeon/devtools'

import {codeModule} from './code'
import {hooksModule} from './hooks'
import {runnerModule} from './runner'
import {configModule} from './config'
import {extensionModule} from './extension'

import {Events, State} from '../../@types/Store'

export const store = createStoreon<State, Events>([
  extensionModule,
  hooksModule,
  runnerModule,
  codeModule,
  configModule,
  storeonDevtools,
])

export const AppContext = createContext(store)

export const useStore = customContext(AppContext)
