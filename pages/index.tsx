import 'twin.macro'

import {Totality} from '@totality/core'

import {
  DraculaThemeExtension,
  ExampleWidgetExtension,
  TypeScriptReactExtension,
  VimModeExtension,
} from '@totality/extensions'

const extensions = [
  DraculaThemeExtension,
  ExampleWidgetExtension,
  VimModeExtension,
  TypeScriptReactExtension,
] as const

export default function Home() {
  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <Totality
        extensions={extensions}
        options={{
          'vim.enabled': true,
          'editor.fontSize': 20,
          'language.typescriptreact.typeDefs': false,
        }}
      />
    </div>
  )
}
