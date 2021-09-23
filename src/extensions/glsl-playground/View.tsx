import 'twin.macro'

import {useEffect, useRef, useState} from 'react'
import type GLSLCanvas from 'glslCanvas'

import {useStore} from '@totality/core'

export const GLSLPlaygroundView: React.FC = () => {
  const {code, options} = useStore('code', 'options')

  const sandboxRef = useRef<GLSLCanvas>()
  const canvasElementRef = useRef<HTMLCanvasElement>()

  const [isReady, setReady] = useState(false)
  const [error, setError] = useState('')

  const height = options['layout.height'] ?? '100%'

  async function setup() {
    if (!canvasElementRef.current) return
    const {default: GLSLCanvas} = await import('glslCanvas')
    const sandbox = new GLSLCanvas(canvasElementRef.current)

    sandbox.on('error', ({error}) => {
      setError(error)
    })

    sandboxRef.current = sandbox
    setReady(true)

    window.sandbox = sandbox
  }

  useEffect(() => {
    setup()
  }, [canvasElementRef])

  useEffect(() => {
    const sandbox = sandboxRef.current
    if (!sandbox || !isReady) return

    setError('')
    sandbox.load(code)
  }, [code, isReady])

  return (
    <div tw="text-white overflow-hidden relative">
      {error && (
        <div tw="absolute top-0 bg-red-500 text-white px-3 py-2 shadow-lg">
          {error}
        </div>
      )}

      <canvas
        tw="w-full"
        style={{height}}
        ref={(r) => (canvasElementRef.current = r!)}
      />
    </div>
  )
}
