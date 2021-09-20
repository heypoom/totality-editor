import {createExtension} from 'utils'

export const JSXHighlighterExtension = createExtension({
  id: 'jsx.highlighter',

  defaultConfig: {
    'jsx.highlighter.enabled': true,
  },

  async setup(app) {
    const {parse} = await import('@babel/parser')
    const {default: traverse} = await import('@babel/traverse')
    const {default: Highlight} = await import('monaco-jsx-highlighter')

    // Minimal Babel setup for React JSX parsing.
    function babelParse(code: string) {
      try {
        return parse(code, {sourceType: 'module', plugins: ['jsx']})
      } catch (err) {
        return null
      }
    }

    app.editor.setup((context) => {
      const {monaco, editor} = context

      if (!app.options['jsx.highlighter.enabled']) return

      const options = {
        parser: 'babel',
        isHighlightGlyph: true,
        isShowHover: true,
        isUseSeparateElementStyles: true,
        isThrowJSXParseErrors: false,
      }

      const hi = new Highlight(monaco, babelParse, traverse, editor, options)

      hi.highLightOnDidChangeModelContent(100)
      hi.addJSXCommentCommand()

      // @ts-ignore
      window.monacoJSXHighlighter = hi
    })
  },
})
