import 'twin.macro'

import {Totality} from 'modules/view/Totality'

import {VimModeExtension} from 'extensions/vim'
import {DraculaThemeExtension} from 'extensions/dracula'
import {TypeScriptReactExtension} from 'extensions/typescript-react'

const extensions = [
  VimModeExtension,
  DraculaThemeExtension,
  TypeScriptReactExtension,
] as const

export default function Home() {
  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <Totality
        extensions={extensions}
        options={{'vim.enabled': true, 'editor.fontSize': 12}}
      />
    </div>
  )
}
