import React from 'react'
import loadable from '@loadable/component'

import {linkedListToAdjList} from './utils/linkedListToAdjList'

import {createExtension} from 'utils'
import {LoadingSkeleton} from 'modules/editor/LoadingSkeleton'

const LinkedListVisualizer = loadable(
  async () => (await import('./LinkedListVisualizer')).LinkedListVisualizer,
  {fallback: <LoadingSkeleton />}
)

export const LinkedListVisualizerExtension = createExtension({
  id: 'visualizer.linked-list',

  async setup(app) {
    const {renderer, store} = app

    renderer.create('linked-list', {component: LinkedListVisualizer})
    renderer.use('linked-list')

    store.dispatch('runner/set-shared', {layout: 'circle'})

    store.dispatch('runner/listen', (variables) => {
      const graph = linkedListToAdjList(variables)

      store.dispatch('runner/set-shared', {graph})
    })

    // @ts-ignore
    window.store = store
  },
})
