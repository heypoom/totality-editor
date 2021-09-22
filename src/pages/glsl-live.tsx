import 'twin.macro'

import {Totality} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
} from '@totality/extensions'

import {GLSLSample} from 'constants/sample/glsl.sample'
import React from 'react'

const extensions = [
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
  VimModeExtension,
] as const

export default function GLSLLiveDemo() {
  return (
    <div tw="bg-purple-500 text-gray-800 min-h-screen">
      <Totality
        path="shader.glsl"
        extensions={extensions}
        code={GLSLSample}
        height="100vh"
        layout="visual-in-background"
        options={{
          'theme.background': '#00000000',
          'theme.highlight': '#00000022',
          'editor.fontSize': 21,
        }}
      />
    </div>
  )
}
