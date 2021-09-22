import {CanvasRendererView} from './View'

import {createExtension} from 'utils'

export const CanvasRendererExtension = createExtension({
  id: 'renderer.canvas',

  async setup(app) {
    const {renderer, runner, editor} = app

    // Create the React renderer.
    renderer.create('canvas', {component: CanvasRendererView})
    renderer.use('canvas')

    // Resize function syncs the canvas dimensions.
    runner.on('setup', (runner) => {
      const canvas = runner.realm.global.canvas as HTMLCanvasElement
      const {width, height} = canvas.getBoundingClientRect()

      if (canvas.width !== width || canvas.height !== height) {
        const {devicePixelRatio: dpr = 1} = window

        const context = canvas.getContext('2d')
        canvas.width = width * dpr
        canvas.height = height * dpr

        context?.scale(dpr, dpr)
      }
    })

    // Setup the type definitions.
    const definition = `declare const canvas: HTMLCanvasElement`

    editor.addTypeDefinition('canvas-runtime', definition)
  },
})
