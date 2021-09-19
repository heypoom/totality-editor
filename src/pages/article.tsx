import 'twin.macro'

import {Totality, TotalityWindow} from '@totality/core'

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

export default function Article() {
  return (
    <div
      tw="bg-purple-400 text-gray-800 min-h-screen"
      style={{background: '#a55eea'}}
    >
      <div tw="flex flex-col items-center justify-center w-full min-h-screen">
        <h1 tw="text-white text-4xl mb-6 font-semibold">
          Visualizing Linked List.
        </h1>

        <TotalityWindow
          width="900px"
          extensions={extensions}
          options={{
            'editor.fontSize': 16,
            'editor.fontFamily': 'JetBrains Mono',
            'editor.fontWeight': '500',
            'layout.height': '500px',
            'editor.fontLigatures': true,
            'theme.background': '#21222d',
          }}
        />
      </div>
    </div>
  )
}
