import {IMonacoOption} from '@types'

export const intoEditorOptions = (
  options: Record<string, any>
): IMonacoOption =>
  Object.fromEntries(
    Object.entries(options)
      .filter(([key]) => key.startsWith('editor.'))
      .map(([k, v]) => [k.replace('editor.', ''), v])
  )
