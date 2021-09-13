import {createExtension} from 'utils/createExtension'

export const VimModeExtension = createExtension({
  id: 'editor.vim',

  defaultConfig: {
    'vim.enabled': true,
  },

  async setup(app) {
    app.editor.setup(async (context) => {
      if (!app.options['vim.enabled']) return

      // @ts-ignore
      const MonacoVim = await import('monaco-vim')

      MonacoVim.initVimMode(context.editor)
    })
  },
})
