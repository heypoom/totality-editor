import 'twin.macro'

import {TotalityWindow} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  TypeScriptExtension,
  LinkedListVisualizerExtension,
} from '@totality/extensions'

import {LinkedListSample} from 'constants/sample/linked-list.sample'

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
          width="760px"
          height="320px"
          path="linked-list.tsx"
          code={LinkedListSample}
          extensions={extensions}
          options={{'persist.enabled': true}}
        />
      </div>
    </div>
  )
}
