import {parse} from '@babel/parser'
import traverse from '@babel/traverse'

import {Extension} from '@types'

// @ts-ignore
import MonacoJSXHighlighter from 'monaco-jsx-highlighter'

// Minimal Babel setup for React JSX parsing:
function babelParse(code: string) {
  try {
    return parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    })
  } catch (err) {
    return null
  }
}

export const JSXHighlighterExtension: Extension = {
  id: 'editor.jsx-highlighter',

  async setup(app) {
    app.editor.setup((context) => {
      const {monaco, editor} = context

      const options = {
        parser: 'babel',
        isHighlightGlyph: false,
        isShowHover: false,
        isUseSeparateElementStyles: false,
        isThrowJSXParseErrors: false,
      }

      const monacoJSXHighlighter = new MonacoJSXHighlighter(
        monaco,
        babelParse,
        traverse,
        editor,
        options
      )

      monacoJSXHighlighter.highLightOnDidChangeModelContent(100)
      monacoJSXHighlighter.addJSXCommentCommand()

      // @ts-ignore
      window.monacoJSXHighlighter = monacoJSXHighlighter
    })
  },
}
