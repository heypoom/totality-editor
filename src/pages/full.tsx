import 'twin.macro'

import {Totality} from '@totality/core'

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

export default function Home() {
  return (
    <div tw="bg-gray-900 text-white">
      <Totality
        code={LinkedListSample}
        extensions={extensions}
        path="linked-list.tsx"
        options={{'editor.fontSize': 24, 'persist.enabled': true}}
      />
    </div>
  )
}
