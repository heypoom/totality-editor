import {HtmlView} from './View'

import {createExtension} from 'utils'

export const HTMLPreviewerExtension = createExtension({
  id: 'language.html',

  options: {
    'editor.language': 'html',
  },

  async setup(app) {
    app.renderer.create('html', {component: HtmlView})
    app.renderer.use('html')
  },
})
