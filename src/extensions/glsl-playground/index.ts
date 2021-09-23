import {createExtension} from 'utils'

import {GLSLPlaygroundView} from './View'

import {configureGrammar} from './utils/glsl-language'

export const GLSLPlaygroundExtension = createExtension({
  id: 'playground.glsl',

  options: {
    'editor.language': 'glsl',
  },

  async setup(app) {
    const {renderer, editor} = app

    // Create the GLSL renderer.
    renderer.create('glsl-playground', {component: GLSLPlaygroundView})
    // renderer.use('glsl-playground')

    // Configure the GLSL Syntax Highlighting.
    editor.setup(async (context) => {
      await configureGrammar(context)
    })
  },
})
