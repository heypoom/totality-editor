declare module 'monaco-jsx-highlighter' {
  class MonacoJSXHighlighter {
    constructor(monaco, babelParse, traverse, editor, options) {}

    addJSXCommentCommand(): void
    highLightOnDidChangeModelContent(n: number): void
  }

  export = MonacoJSXHighlighter
}
