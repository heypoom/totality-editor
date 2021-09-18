import loadable from '@loadable/component'

import {createExtension} from 'utils'

import {linkedListToAdjList} from './utils/linkedListToAdjList'

const LinkedListVisualizer = loadable(async () => {
  return (await import('./LinkedListVisualizer')).LinkedListVisualizer
})

export const LinkedListVisualizerExtension = createExtension({
  id: 'visualizer.linked-list',

  async setup(app) {
    const {renderer, store} = app

    renderer.create('linked-list', {component: LinkedListVisualizer})
    renderer.use('linked-list')

    store.dispatch('runner/listen', (variables) => {
      const graph = linkedListToAdjList(variables)

      store.dispatch('runner/set', {shared: {graph}, error: null})
    })
  },
})
