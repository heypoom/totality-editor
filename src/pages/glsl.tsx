import 'twin.macro'

import {TotalityWindow} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
} from '@totality/extensions'

import {GLSLWarpingSample} from 'constants/sample/glsl-warping.sample'

const extensions = [
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
  VimModeExtension,
] as const

export default function GLSLDemo() {
  return (
    <div tw="bg-purple-500 text-gray-800 min-h-screen">
      <div tw="flex flex-col items-center justify-center w-full min-h-screen">
        <h1 tw="text-white text-4xl mb-6 font-semibold">GLSL Demo.</h1>

        <TotalityWindow
          width="960px"
          height="320px"
          path="shader.glsl"
          extensions={extensions}
          code={GLSLWarpingSample}
        />
      </div>
    </div>
  )
}
