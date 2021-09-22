import {GLSLPlaygroundView} from './View'

import {createExtension} from 'utils'

export const GLSLPlaygroundExtension = createExtension({
  id: 'playground.glsl',

  options: {
    'editor.language': 'glsl',
  },

  async setup(app) {
    const {renderer, runner, editor} = app

    // Create the GLSL renderer.
    renderer.create('glsl-playground', {component: GLSLPlaygroundView})
    renderer.use('glsl-playground')
  },
})
