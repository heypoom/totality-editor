import {DraculaTheme} from './dracula.theme'

import {createExtension} from 'utils'

export const DraculaThemeExtension = createExtension({
  id: 'theme.dracula',

  setup(app) {
    app.editor.setup((context) => {
      const {editor} = context.monaco

      console.log('Configuring dracula theme...')

      editor.defineTheme('dracula', DraculaTheme)
      editor.setTheme('dracula')
    })
  },
})
