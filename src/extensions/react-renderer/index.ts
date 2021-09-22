import React from 'react'

import {ReactRendererView} from './ReactRendererView'

import {createExtension} from 'utils'

export const ReactRendererExtension = createExtension({
  id: 'renderer.react',

  async setup(app) {
    const {renderer, runner, editor} = app

    // Inject the React global and the renderer function.
    runner.injectGlobal({
      React,
      render: (element: React.ReactNode) => runner.track('ReactRoot', element),
    })

    // Create the React renderer.
    renderer.create('react', {
      component: ReactRendererView,
      state: {element: null},
    })

    renderer.use('react')

    // Add TypeScript type definitions for the render function.
    const definition = `declare function render(element: React.ReactNode): void`
    editor.addTypeDefinition('react-runtime', definition)
  },
})
