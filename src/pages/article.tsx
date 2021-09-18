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
    <div>
      <Totality
        extensions={extensions}
        options={{
          'editor.fontSize': 20,
          'theme.background': '#21222d',
        }}
      />
    </div>
  )
}
