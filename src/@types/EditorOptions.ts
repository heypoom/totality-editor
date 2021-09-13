import {IMonacoOption} from './EditorContext'

export type EditorOptions = {
  [K in keyof IMonacoOption as `editor.${K}`]: IMonacoOption[K]
}
