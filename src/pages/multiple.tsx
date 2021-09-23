import 'twin.macro'

import {TotalityWindow, TotalityProvider} from '@totality/core'

import {
  VimModeExtension,
  DraculaThemeExtension,
  TypeScriptReactExtension,
  JSXHighlighterExtension,
  TypeScriptExtension,
  ReactRendererExtension,
} from '@totality/extensions'

import {ReactSample} from 'constants/sample/react.sample'

const extensions = [
  DraculaThemeExtension,
  TypeScriptExtension,
  TypeScriptReactExtension,
  ReactRendererExtension,
  JSXHighlighterExtension,
  VimModeExtension,
] as const

export default function MultipleEditorDemo() {
  return (
    <TotalityProvider extensions={extensions} scope={{fetch}}>
      <div tw="bg-purple-500 text-white min-h-screen">
        <div tw="flex flex-col w-full min-h-screen max-w-5xl mx-auto gap-8 py-10 px-10">
          <h1 tw="text-4xl font-semibold">Multiple Editor Demo.</h1>

          <p tw="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            labore officiis voluptatem nobis vero ullam accusamus facilis
            placeat qui eum eius est voluptates ipsum, velit quas assumenda quo
            molestias dolores.
          </p>

          <TotalityWindow
            width="760px"
            height="320px"
            code={ReactSample}
            path="a.tsx"
          />

          <p tw="text-xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            labore officiis voluptatem nobis vero ullam accusamus facilis
            placeat qui eum eius est voluptates ipsum, velit quas assumenda quo
            molestias dolores.
          </p>

          <TotalityWindow width="760px" height="320px" path="b.tsx" />
        </div>
      </div>
    </TotalityProvider>
  )
}
