import {SyncController} from './SyncController'

import {createExtension} from 'utils/createExtension'

export const LiveCollaborationExtension = createExtension({
  id: 'core.collaboration',

  async setup(app) {
    const sync = new SyncController()

    app.editor.setup(async (context) => {
      if (typeof window === 'undefined') return

      const {doc, rtc} = sync
      const {editor} = context

      console.log('> Setting up live collaboration...')

      const model = editor.getModel()
      if (!model) return

      // @ts-ignore
      const {MonacoBinding} = await import('y-monaco')

      const editors = new Set([editor])
      const text = doc?.getText('editor')

      const binding = new MonacoBinding(text, model, editors, rtc?.awareness)

      // @ts-ignore
      window.monacoYBinding = binding
    })
  },
})
