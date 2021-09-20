import produce from 'immer'

import {createMerge} from './utils/merge'

import {isActiveRendererPanel} from 'modules/panel'

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
      const panel = s.panels.find(isActiveRendererPanel)
      if (!panel) return s

      panel.renderer = data

      return s
    })

    store.dispatch('layout/set', layout)
  })

  store.on('renderer/store', (s, data) => {
    return produce(s, (s) => {
      const panel = s.layout.panels.find(isActiveRendererPanel)
      if (!panel?.renderer) return s

      const renderer = s.renderer.renderers[panel?.renderer]
      renderer.state = {...(renderer.state as {}), ...data}

      return s
    })
  })
}
