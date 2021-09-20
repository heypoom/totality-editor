import {useEffect, useRef} from 'react'

import type {Core, Stylesheet} from 'cytoscape'
import CytoscapeView from 'react-cytoscapejs'

import {useStore, RendererProps} from '@totality/core'

import {useGraphElements} from './hooks/useGraphElement'

interface VisualizerState {
  layout: string
  graph: Record<string, string[]>
}

const stylesheet: Stylesheet[] = [
  {
    selector: 'node',
    style: {
      'background-color': 'data(bg)',
      'border-width': '3px',
      'border-color': '#fff',
      color: '#ffffff',
      label: 'data(label)',
    },
  },
  {
    selector: 'edge',
    style: {
      'line-color': '#fff',
    },
  },
]

export const LinkedListVisualizer: React.FC<RendererProps> = (props) => {
  const {state} = props
  const {graph, layout = 'circle'} = state as VisualizerState

  const cyRef = useRef<Core>()
  const {dispatch} = useStore()
  const elements = useGraphElements(graph)

  useEffect(() => {
    dispatch('runner/on-frame', () => {
      try {
        const Core = cyRef.current
        if (!Core) return

        const Layout = Core.layout({name: layout as 'circle', animate: true})

        Layout?.run()
      } catch (err) {}
    })
  }, [dispatch])

  return (
    <CytoscapeView
      headless={false}
      elements={elements}
      layout={{name: layout}}
      style={{width: '100%', height: '100%'}}
      stylesheet={stylesheet}
      cy={(cy) => (cyRef.current = cy)}
    />
  )
}
