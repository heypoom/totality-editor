interface Window {
  // Checks if Onigasm library is loaded. Persists across hot reloads.
  onigasmLoaded: boolean

  // Globals for debugging the app internals.
  store: import('.').Store
  sandbox: import('glslCanvas')
  monacoYBinding: import('y-monaco').MonacoBinding
  monacoJSXHighlighter: import('monaco-jsx-highlighter')
  runnerManager: import('../modules/core/RunnerManager').RunnerManager
  sync: import('../extensions/collaboration/SyncController').SyncController
}
