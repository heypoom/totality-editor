import {IMonacoOption} from './EditorContext'

export type EditorOptions = {
  [K in keyof IMonacoOption as `editor.${K}`]: IMonacoOption[K]
}

export type CoreOptions = Record<string, any> &
  EditorOptions &
  Partial<TotalityOptions>

export interface TotalityOptions {
  'layout.height': string
  'theme.background': string
}
