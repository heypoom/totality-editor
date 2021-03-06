import {createStoreon, StoreonStore} from 'storeon'
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

import {Events, State, Store} from '@types'

export function createStore() {
  return createStoreon<State, Events>([
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
}

export const AppContext = createContext<Store>({} as Store)
export const useStore = customContext(AppContext)
