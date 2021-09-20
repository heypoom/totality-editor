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
    const panel = s.layout.panels.find(isActiveRendererPanel)
    if (!panel?.renderer) return s

    const id = panel.renderer
    const renderer = s.renderer.renderers[id]
    if (!renderer) return s

    const state = renderer.state ?? ({} as any)

    return produce(s, (s) => {
      s.renderer.renderers[id].state = {...state, ...data}

      return s
    })
  })
}
