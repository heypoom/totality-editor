import {DraculaTheme} from '../dracula.theme'

import {IEditorContext} from '../../../@types/IMonaco'

export function setupTheme({monaco}: IEditorContext) {
  const ins = monaco.editor

  ins.defineTheme('dracula', DraculaTheme)
  ins.setTheme('dracula')
}
