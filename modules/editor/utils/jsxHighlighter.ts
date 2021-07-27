import {parse} from '@babel/parser'
import traverse from '@babel/traverse'

// @ts-ignore
import MonacoJSXHighlighter from 'monaco-jsx-highlighter'

import {IEditorContext} from '../../../@types/IMonaco'

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

export function highlightJSX({monaco, editor}: IEditorContext) {
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
}
