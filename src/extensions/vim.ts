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

      const {initVimMode} = await import('monaco-vim')

      const statusEl = document.createElement('div')
      statusEl.style.display = 'flex'
      statusEl.style.position = 'fixed'
      statusEl.style.zIndex = '3'
      statusEl.style.bottom = '0'
      statusEl.style.left = '0'
      statusEl.style.color = 'white'
      statusEl.style.padding = '6px 10px'
      statusEl.style.background = '#2d2d30'
      statusEl.style.width = '100%'
      statusEl.style.fontFamily = 'JetBrains Mono'
      statusEl.style.fontSize = '18px'
      statusEl.style.fontWeight = '500'

      const vimMode = initVimMode(context.editor, statusEl)

      // @ts-ignore
      window.vimMode = vimMode

      document.body.appendChild(statusEl)
    })
  },
})
