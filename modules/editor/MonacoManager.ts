import {setupTheme} from './utils/setupTheme'
import {setupWidget} from './utils/setupWidget'
import {setupVimMode} from './utils/setupVimMode'
import {highlightJSX} from './utils/jsxHighlighter'
import {setupTypescriptReact} from './utils/setupTypescriptReact'

import {IEditorContext} from '../../@types/IMonaco'

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

    // Setup vim mode
    setupVimMode(this.context)
  }
}
