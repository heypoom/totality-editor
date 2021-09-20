import React from 'react'

import {ReactRendererView} from './ReactRendererView'

import {createExtension} from 'utils'

export const ReactRendererExtension = createExtension({
  id: 'renderer.react',

  async setup(app) {
    const {renderer, runner} = app

    runner.setScope('React', React)

    renderer.create('react', {
      component: ReactRendererView,
      state: {element: null},
    })

    renderer.use('react')
  },
})
