import {createExtension} from 'utils'

export const VisualBackdropExtension = createExtension({
  id: 'visual-backdrop',

  defaultConfig: {
    'visual-backdrop.enabled': true,
  },

  async setup(app) {
    if (!app.options['visual-backdrop.enabled']) return

    app.store.dispatch('layout/set', {preset: 'visual-in-background'})

    app.store.dispatch('config/set', {
      'theme.background': '#00000000',
      'theme.highlight': '#00000022',
      'editor.fontSize': 21,
    })
  },
})
