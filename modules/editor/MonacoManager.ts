import {DraculaTheme} from './dracula.theme'

import {IEditor, IEditorContext, IMonaco} from '../../@types/IMonaco'
import {highlightJSX} from './utils/jsxHighlighter'
import {setupTypescriptReact} from './utils/setupTypescriptReact'
import {setupTheme} from './utils/setupTheme'
import {setupWidget} from './utils/setupWidget'

export class MonacoManager {
  context: IEditorContext

  constructor(context: IEditorContext) {
    this.context = context
  }

  async setup() {
    // Setup the Dracula theme
    setupTheme(this.context)

    // Setup TypeScript + React support
    await setupTypescriptReact(this.context)

    // Setup JSX Highlighter
    highlightJSX(this.context)

    // Setup Widgets
    setupWidget(this.context)
  }
}
