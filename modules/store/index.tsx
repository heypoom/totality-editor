import {createStoreon} from 'storeon'
import {createContext} from 'preact'
import {useStoreon, customContext} from 'storeon/preact'

import {hooksModule} from './hooks'
import {extensionModule} from './extension'

import {Events, State} from '../../@types/Store'
import {runnerModule} from './runner'

export const store = createStoreon<State, Events>([
  extensionModule,
  hooksModule,
  runnerModule,
])

export const AppContext = createContext(store)

export const useStore = customContext(AppContext)
