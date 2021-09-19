import 'twin.macro'

import {Totality} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  TypeScriptExtension,
  LinkedListVisualizerExtension,
} from '@totality/extensions'

const extensions = [
  DraculaThemeExtension,
  TypeScriptExtension,
  LinkedListVisualizerExtension,
  VimModeExtension,
] as const

export default function Home() {
  return (
    <div tw="bg-gray-900 text-white">
      <Totality
        extensions={extensions}
        options={{
          'editor.fontSize': 24,
          'editor.fontFamily': 'JetBrains Mono',
          'editor.fontWeight': '500',
          'editor.fontLigatures': true,
        }}
      />
    </div>
  )
}
