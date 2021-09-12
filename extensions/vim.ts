import {createExtension} from 'modules/utils/createExtension'

export const VimModeExtension = createExtension({
  id: 'editor.vim',

  defaultConfig: {
    'vim.enabled': true,
  },

  async setup(app) {
    app.editor.setup(async (context) => {
      console.log('options >', app.options)

      // @ts-ignore
      const MonacoVim = await import('monaco-vim')

      MonacoVim.initVimMode(context.editor)
    })
  },
})
