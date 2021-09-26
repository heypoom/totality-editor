declare module 'monaco-vim' {
  const MonacoVim: {
    initVimMode: (
      context: import('./EditorContext').IEditor,
      statusBarElement?: HTMLDivElement
    ) => void
  }

  export = MonacoVim
}
