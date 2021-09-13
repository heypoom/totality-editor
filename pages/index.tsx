import 'twin.macro'

import {Totality} from 'modules/view/Totality'

import {VimModeExtension} from 'extensions/vim'
import {DraculaThemeExtension} from 'extensions/dracula'
import {ExampleWidgetExtension} from 'extensions/example-widget'
import {JSXHighlighterExtension} from 'extensions/jsx-highlighter'
import {TypeScriptReactExtension} from 'extensions/typescript-react'
import {LiveCollaborationExtension} from 'extensions/collaboration'

const extensions = [
  VimModeExtension,
  DraculaThemeExtension,
  ExampleWidgetExtension,
  // JSXHighlighterExtension,
  // TypeScriptReactExtension,
  // LiveCollaborationExtension,
] as const

export default function Home() {
  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <Totality
        extensions={extensions}
        options={{'vim.enabled': true, 'editor.fontSize': 20}}
      />
    </div>
  )
}
