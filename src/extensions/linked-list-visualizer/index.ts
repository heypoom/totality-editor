import {createExtension} from 'utils'

import loadable from '@loadable/component'

const LinkedListVisualizer = loadable(async () => {
  return (await import('./LinkedListVisualizer')).LinkedListVisualizer
})

export const LinkedListVisualizerExtension = createExtension({
  id: 'visualizer.linked-list',

  async setup(app) {
    app.renderer.create('linked-list', {component: LinkedListVisualizer})
    app.renderer.use('linked-list')
  },
})
