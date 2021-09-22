import 'twin.macro'

import {useEffect, useRef, useState} from 'react'
import type GLSLCanvas from 'glslCanvas'

import {useStore} from '@totality/core'

export const GLSLPlaygroundView: React.FC = () => {
  const {code, options} = useStore('code', 'options')

  const sandboxRef = useRef<GLSLCanvas>()
  const canvasElementRef = useRef<HTMLCanvasElement>()
  const [isReady, setReady] = useState(false)

  const height = options['layout.height'] ?? '100%'

  async function setup() {
    if (!canvasElementRef.current) return
    const {default: GLSLCanvas} = await import('glslCanvas')

    sandboxRef.current = new GLSLCanvas(canvasElementRef.current)
    setReady(true)
  }

  useEffect(() => {
    setup()
  }, [canvasElementRef])

  useEffect(() => {
    const sandbox = sandboxRef.current
    if (!sandbox || !isReady) return

    sandbox.load(code)
  }, [code, isReady])

  return (
    <div tw="text-white">
      <canvas
        tw="w-full"
        style={{height}}
        ref={(r) => (canvasElementRef.current = r!)}
      />
    </div>
  )
}
