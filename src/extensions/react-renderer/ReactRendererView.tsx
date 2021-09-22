import 'twin.macro'
import {useEffect, useState} from 'react'

import {useStore} from '@totality/core'

import {RendererErrorBoundary} from './RendererErrorBoundary'

export const ReactRendererView: React.FC = () => {
  const {dispatch} = useStore()
  const [element, setElement] = useState(null)

  useEffect(() => {
    dispatch('runner/on-track', (variable) => {
      if (variable.key === 'ReactRoot') {
        setElement(variable.value)
      }
    })
  }, [dispatch])

  return (
    <RendererErrorBoundary>
      <div tw="overflow-scroll text-white">{element}</div>
    </RendererErrorBoundary>
  )
}
