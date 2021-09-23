declare module 'monaco-vim' {
  const MonacoVim: {
    initVimMode: (context: import('./EditorContext').IEditor) => void
  }

  export = MonacoVim
}
