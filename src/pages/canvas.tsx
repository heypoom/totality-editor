import 'twin.macro'
import React, {useReducer} from 'react'

import {Totality} from '@totality/core'

import {
  VimModeExtension,
  TypeScriptExtension,
  DraculaThemeExtension,
  CanvasRendererExtension,
} from '@totality/extensions'

import {CanvasSample} from 'constants/sample/canvas.sample'

const extensions = [
  DraculaThemeExtension,
  VimModeExtension,
  TypeScriptExtension,
  CanvasRendererExtension,
] as const

export default function CanvasDemo() {
  const [isLiveLayout, toggle] = useReducer((s) => !s, true)

  return (
    <div
      style={{background: '#badc58'}}
      tw="text-gray-800 min-h-screen relative"
    >
      <button
        tw="absolute z-10 bg-red-500 bottom-5 right-5 px-3 py-1 text-white shadow-lg"
        onClick={toggle}
      >
        toggle layout
      </button>

      <Totality
        height="100vh"
        code={CanvasSample}
        path="canvas.tsx"
        extensions={extensions}
        {...(isLiveLayout && {
          layout: 'visual-in-background',
          options: {
            'theme.background': '#00000000',
            'theme.highlight': '#00000022',
            'editor.fontSize': 21,
          },
        })}
      />
    </div>
  )
}
