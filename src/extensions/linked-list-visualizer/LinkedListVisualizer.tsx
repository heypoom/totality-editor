import tw, {styled} from 'twin.macro'
import {useEffect, useMemo, useRef} from 'react'

import CytoscapeView from 'react-cytoscapejs'
import type {Core, ElementDefinition} from 'cytoscape'

import {useRenderer, RendererProps} from '@totality/core'

interface Node {
  id: string
  nodes: string[]
}

export const toListNode = (graph: Record<string, string[]>): Node[] =>
  graph && Object.entries(graph).map(([id, nodes]) => ({id, nodes}))

function generateEdges(nodes: Node[]) {
  const edges: ElementDefinition[] = []

  nodes.forEach((source) => {
    source.nodes.forEach((target) => {
      edges.push({data: {source: source.id, target}})
    })
  })

  return edges
}

const generateNodes = (nodes: Node[]): ElementDefinition[] => {
  nodes = nodes.filter((n) => n.id)

  const set = new Set<string>()

  for (const node of nodes) {
    set.add(node.id)

    for (const dst of node.nodes) set.add(dst)
  }

  return Array.from(set).map((id, i) => ({
    data: {id, label: id, bg: hsl(i, 10)},
  }))
}

const hsl = (i = 1, count = 8, s = 90, l = 60) =>
  `hsl(${i * Math.trunc(360 / count)}, ${s}%, ${l}%)`

interface VisualizerState {
  layout: string
  graph: Record<string, string[]>
}

export const LinkedListVisualizer: React.FC<RendererProps> = (props) => {
  const {state} = props

  const {dispatch} = useRenderer()
  const cyRef = useRef<Core>()

  const {graph, layout = 'circle'} = state as VisualizerState

  const elements = useMemo(() => {
    const lists = toListNode(graph as any) ?? []

    const nodes = generateNodes(lists) ?? []
    const edges = generateEdges(lists) ?? []

    return CytoscapeView.normalizeElements({nodes, edges})
  }, [graph])

  useEffect(() => {
    dispatch('runner/on-frame', () => {
      try {
        const Core = cyRef.current
        if (!Core) return

        const Layout = Core.layout({name: layout as 'circle', animate: true})

        Layout?.run()
      } catch (err) {}
    })
  }, [])

  return (
    <CytoscapeView
      headless={false}
      elements={elements}
      layout={{name: layout}}
      style={{width: '100%', height: '100%'}}
      stylesheet={[
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
      ]}
      cy={(cy) => (cyRef.current = cy)}
    />
  )
}
