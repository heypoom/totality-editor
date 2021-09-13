import {createStoreon} from 'storeon'
import {useStoreon} from 'storeon/preact'

import {hooksModule} from './hooks'
import {extensionModule} from './extension'

import {Events, State} from '../../@types/Store'

export const useStore = () => useStoreon<State, Events>()

export const store = createStoreon<State, Events>([
  extensionModule,
  hooksModule,
])
