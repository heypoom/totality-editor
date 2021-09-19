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

export default function Article() {
  return (
    <div
      tw="bg-purple-400 text-gray-800 min-h-screen"
      style={{background: '#a55eea'}}
    >
      <div tw="flex items-center justify-center w-full min-h-screen">
        <div
          tw="shadow-2xl p-2 bg-gray-900 rounded-lg"
          css={{background: '#21222d', width: '900px'}}
        >
          <div tw="flex p-1 pb-2">
            <div tw="w-3 h-3 bg-red-400 rounded-lg shadow-2xl mr-2" />
            <div tw="w-3 h-3 bg-yellow-400 rounded-lg shadow-2xl mr-2" />
            <div tw="w-3 h-3 bg-green-400 rounded-lg shadow-2xl" />
          </div>

          <Totality
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
    </div>
  )
}
