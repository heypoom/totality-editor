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

const SampleCode = `
precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  st.x *= u_resolution.x / u_resolution.y;

  vec3 color = vec3(0);
  color = vec3(st.x, st.y, abs(sin(u_time)));

  gl_FragColor = vec4(color, 1.0);
}
`.trimStart()

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
          code={SampleCode}
        />
      </div>
    </div>
  )
}
