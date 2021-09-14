import produce from 'immer'

import {createMerge} from './utils/merge'

import {StoreModule} from '@types'

const set = createMerge('renderer')

export const rendererModule: StoreModule = (store) => {
  store.on('@init', () => ({
    renderer: {
      current: null,
      renderers: {},
    },
  }))

  store.on('renderer/use', (s, current) => set(s, {current}))

  store.on('renderer/add', (s, {id, renderer}) => {
    return produce(s, (state) => {
      state.renderer.renderers[id] = renderer
    })
  })
}
