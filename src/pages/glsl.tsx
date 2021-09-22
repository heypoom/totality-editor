import 'twin.macro'

import {TotalityWindow} from '@totality/core'

import {VimModeExtension, DraculaThemeExtension} from '@totality/extensions'

import {ReactSample} from 'constants/sample/react.sample'

const extensions = [DraculaThemeExtension, VimModeExtension] as const

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
          options={{
            'editor.language': 'glsl',
            'editor.fontSize': 16,
            'editor.fontFamily': 'JetBrains Mono',
            'editor.fontWeight': '500',
            'theme.background': '#21222d',
            'persist.enabled': true,
            'file.path': 'shader.glsl',
          }}
        />
      </div>
    </div>
  )
}
