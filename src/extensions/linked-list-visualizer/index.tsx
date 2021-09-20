import loadable from '@loadable/component'

import {createExtension} from 'utils'

import {linkedListToAdjList} from './utils/linkedListToAdjList'

const LinkedListVisualizer = loadable(
  async () => (await import('./LinkedListVisualizer')).LinkedListVisualizer
)

export const LinkedListVisualizerExtension = createExtension({
  id: 'visualizer.linked-list',

  async setup(app) {
    const {renderer, store, runner} = app

    renderer.create('linked-list', {
      component: LinkedListVisualizer,
      state: {layout: 'circle', graph: null},
    })

    renderer.use('linked-list')

    runner.on('track', () => {
      const variables = runner.getTracked()
      const graph = linkedListToAdjList(variables)

      renderer.store({graph})
    })
  },
})
