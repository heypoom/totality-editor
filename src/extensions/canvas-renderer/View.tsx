import tw from 'twin.macro'

import {useStore} from '@totality/core'

import {useEffect, useRef} from 'react'

export const CanvasRendererView: React.FC = () => {
  const {runner, dispatch} = useStore('runner')
  const canvasRef = useRef<HTMLCanvasElement | null>()

  const toggleEvaluation = () => dispatch('runner/toggle-live-evaluation')

  useEffect(() => {
    if (!canvasRef) return

    const canvas = canvasRef.current
    if (!canvas) return

    dispatch('runner/inject-global', {canvas})
  }, [canvasRef, dispatch])

  return (
    <>
      <canvas
        style={{width: '100%', height: '100%'}}
        ref={(c) => (canvasRef.current = c)}
      />

      <button
        tw="absolute z-20 top-5 right-5 px-3 py-1 text-white shadow-lg"
        onClick={toggleEvaluation}
        css={{...(runner?.live ? tw`bg-green-500` : tw`bg-red-500`)}}
      >
        live = {runner?.live ? 'on' : 'off'}
      </button>
    </>
  )
}
