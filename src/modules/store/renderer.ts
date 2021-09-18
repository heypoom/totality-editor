import produce from 'immer'

import {createMerge} from './utils/merge'

import {StoreModule} from '@types'

const set = createMerge('renderer')

export const rendererModule: StoreModule = (store) => {
  store.on('@init', () => ({
    renderer: {
      renderers: {},
    },
  }))

  store.on('renderer/add', (s, {id, renderer}) => {
    return produce(s, (state) => {
      state.renderer.renderers[id] = renderer
    })
  })

  store.on('renderer/use', (s, data) => {
    const layout = produce(s.layout, (s) => {
      const panel = s.panels.find((p) => p.type === 'renderer')
      if (panel?.type !== 'renderer') return s

      panel.renderer = data

      return s
    })

    store.dispatch('layout/set', layout)
  })
}
