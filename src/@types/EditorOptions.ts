import {IMonacoOption} from './EditorContext'

export type EditorOptions = {
  [K in keyof IMonacoOption as `editor.${K}`]: IMonacoOption[K]
}

export type CoreOptions = Record<string, any> &
  EditorOptions &
  Partial<TotalityOptions>

export interface TotalityOptions {
  'layout.height': string
  'file.path': string
  'persist.enabled': boolean

  'theme.background': string
  'theme.highlight': string
}
