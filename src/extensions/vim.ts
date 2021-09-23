import {createExtension} from 'utils'

export const VimModeExtension = createExtension({
  id: 'editor.vim',

  defaultConfig: {
    'vim.enabled': true,
  },

  options: {
    'editor.cursorStyle': 'block',
  },

  async setup(app) {
    app.editor.setup(async (context) => {
      if (!app.options['vim.enabled']) return

      const MonacoVim = await import('monaco-vim')

      MonacoVim.initVimMode(context.editor)
    })
  },
})
