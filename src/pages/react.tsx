import 'twin.macro'

import {TotalityWindow} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  TypeScriptReactExtension,
  JSXHighlighterExtension,
  TypeScriptExtension,
  ReactRendererExtension,
} from '@totality/extensions'

const extensions = [
  DraculaThemeExtension,
  TypeScriptExtension,
  TypeScriptReactExtension,
  ReactRendererExtension,
  VimModeExtension,
  JSXHighlighterExtension,
] as const

export default function ReactDemo() {
  return (
    <div
      tw="bg-purple-400 text-gray-800 min-h-screen"
      style={{background: '#badc58'}}
    >
      <div tw="flex flex-col items-center justify-center w-full min-h-screen">
        <h1 tw="text-white text-4xl mb-6 font-semibold">
          React Component Playground.
        </h1>

        <TotalityWindow
          width="760px"
          height="320px"
          extensions={extensions}
          options={{
            'editor.language': 'typescript',
            'editor.fontSize': 16,
            'editor.fontFamily': 'JetBrains Mono',
            'editor.fontWeight': '500',
            'editor.fontLigatures': true,
            'theme.background': '#21222d',
            'persist.enabled': true,
            'file.path': 'react.tsx',
          }}
        />
      </div>
    </div>
  )
}
