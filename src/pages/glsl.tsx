import 'twin.macro'

import {TotalityWindow} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
} from '@totality/extensions'

const extensions = [
  DraculaThemeExtension,
  GLSLPlaygroundExtension,
  VimModeExtension,
] as const

export default function GLSLDemo() {
  return (
    <div
      tw="bg-purple-400 text-gray-800 min-h-screen"
      style={{background: '#badc58'}}
    >
      <div tw="flex flex-col items-center justify-center w-full min-h-screen">
        <h1 tw="text-white text-4xl mb-6 font-semibold">GLSL Demo.</h1>

        <TotalityWindow
          width="760px"
          height="320px"
          extensions={extensions}
          path="shader.glsl"
          persist
        />
      </div>
    </div>
  )
}
