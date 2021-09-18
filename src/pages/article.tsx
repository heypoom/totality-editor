import 'twin.macro'

import {Totality} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  LinkedListVisualizerExtension,
} from '@totality/extensions'

const extensions = [
  DraculaThemeExtension,
  LinkedListVisualizerExtension,
  VimModeExtension,
] as const

export default function Article() {
  return (
    <div tw="min-h-screen bg-white text-gray-800">
      <div>lorem</div>

      <div tw="flex items-center justify-center max-w-5xl mx-5 w-full">
        <div tw="bg-gray-800 w-full" style={{minHeight: '20vh'}}>
          <Totality
            extensions={extensions}
            options={{
              'editor.fontSize': 20,
            }}
          />
        </div>
      </div>
    </div>
  )
}
