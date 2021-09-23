import 'twin.macro'
import React, {useReducer} from 'react'

import {Totality} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
  ExampleWidgetExtension,
} from '@totality/extensions'

import {GLSLSample} from 'constants/sample/glsl.sample'

const extensions = [
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
  VimModeExtension,
  ExampleWidgetExtension,
] as const

export default function GLSLLiveDemo() {
  const [isLiveLayout, toggle] = useReducer((s) => !s, true)

  return (
    <div tw="bg-purple-500 text-gray-800 min-h-screen relative">
      <button
        tw="absolute z-10 bg-red-500 bottom-5 right-5 px-3 py-1 text-white shadow-lg"
        onClick={toggle}
      >
        toggle layout
      </button>

      <Totality
        height="100vh"
        code={GLSLSample}
        path="shader.glsl"
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
