import {DraculaTheme} from './dracula.theme'

import {createExtension} from 'utils'

export const DraculaThemeExtension = createExtension({
  id: 'theme.dracula',

  options: {
    'editor.fontSize': 16,
    'editor.fontFamily': 'JetBrains Mono',
    'editor.fontWeight': '500',
    'theme.background': '#21222d',
  },

  setup(app) {
    app.editor.setup((context) => {
      const {editor} = context.monaco

      console.log('Configuring dracula theme...')

      // Override the background colors, if present.
      const bg = app.options['theme.background']
      if (bg) DraculaTheme.colors['editor.background'] = bg

      editor.defineTheme('dracula', DraculaTheme)
      editor.setTheme('dracula')
    })
  },
})
