import 'twin.macro'

import {TotalityWindow} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  HTMLPreviewerExtension,
} from '@totality/extensions'

const extensions = [
  DraculaThemeExtension,
  VimModeExtension,
  HTMLPreviewerExtension,
] as const

const source = `
<h1 style="font-size: 40px; text-align: center; font-weight: bold; color: #f6e58d">
	Hello, World!
</h1>
`.trimStart()

export default function HtmlDemo() {
  return (
    <div tw="bg-indigo-500 text-gray-800 min-h-screen">
      <div tw="flex flex-col items-center justify-center w-full min-h-screen">
        <h1 tw="text-white text-4xl mb-6 font-semibold">HTML Demo.</h1>

        <TotalityWindow
          code={source}
          width="960px"
          height="320px"
          path="index.html"
          extensions={extensions}
        />
      </div>
    </div>
  )
}
