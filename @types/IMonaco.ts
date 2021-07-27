import type monaco from 'monaco-editor/esm/vs/editor/editor.api'

export interface IEditorContext {
  monaco: IMonaco
  editor: IEditor
}

export type IMonaco = typeof monaco
export type IEditor = monaco.editor.IStandaloneCodeEditor
export type IMonacoOption = monaco.editor.IStandaloneEditorConstructionOptions
