import {DraculaTheme} from './dracula.theme'

import {Extension} from '../../@types/Extension'

export const DraculaThemeExtension: Extension = {
  id: 'theme.dracula',

  setup(app) {
    app.editor.setup((context) => {
      const {editor} = context.monaco

      console.log('Configuring dracula theme...')

      editor.defineTheme('dracula', DraculaTheme)
      editor.setTheme('dracula')
    })
  },
}
