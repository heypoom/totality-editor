import React from 'react'

import {ReactRendererView} from './ReactRendererView'

import {createExtension} from 'utils'

export const ReactRendererExtension = createExtension({
  id: 'renderer.react',

  async setup(app) {
    const {renderer, runner} = app

    runner.setGlobalVar('React', React)

    runner.setGlobalVar('render', (element: React.ReactNode) => {
      runner.track('ReactRoot', element)
    })

    renderer.create('react', {
      component: ReactRendererView,
      state: {element: null},
    })

    renderer.use('react')

    // Add TypeScript type definitions for the render function.
    const definition = `declare function render(element: React.ReactNode): void`

    app.editor.addTypeDefinition('react-runtime', definition)
  },
})
