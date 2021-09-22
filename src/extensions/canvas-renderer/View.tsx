import {useStore} from '@totality/core'

import {useEffect, useRef} from 'react'

export const CanvasRendererView: React.FC = () => {
  const {dispatch} = useStore()
  const canvasRef = useRef<HTMLCanvasElement | null>()

  useEffect(() => {
    if (!canvasRef) return

    const canvas = canvasRef.current
    if (!canvas) return

    dispatch('runner/inject-global', {canvas})
  }, [canvasRef, dispatch])

  return (
    <canvas
      style={{width: '100%', height: '100%'}}
      ref={(c) => (canvasRef.current = c)}
    />
  )
}
