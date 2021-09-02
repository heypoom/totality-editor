import {IEditorContext} from '../../../@types/IMonaco'

export async function setupVimMode({monaco, editor}: IEditorContext) {
  const MonacoVim = await import('monaco-vim')
  window.MonacoVim = MonacoVim

  MonacoVim.initVimMode(editor)
}
