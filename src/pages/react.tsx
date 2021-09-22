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

import {ReactSample} from 'constants/sample/react.sample'

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
          scope={{fetch}}
          path="react.tsx"
          code={ReactSample}
          extensions={extensions}
          options={{'persist.enabled': true}}
        />
      </div>
    </div>
  )
}
