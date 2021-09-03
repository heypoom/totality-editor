import 'twin.macro'

import CytoscapeView from 'react-cytoscapejs'
import type {Core, ElementDefinition} from 'cytoscape'
import {useRef, useState} from 'react'
import {useEffect} from 'react'
import {useDebounce} from '../utils/useDebounce'

interface IVisualListNode {
  id: string
  val?: unknown | null
  next?: any | null
}

export const toListNode = (vars: Record<string, any>): IVisualListNode[] =>
  Object.entries(vars).map(([id, node]) => ({id, ...node}))

function generateEdges(nodes: IVisualListNode[]): ElementDefinition[] {
  const edges: ElementDefinition[] = []
  let visited: Record<string, boolean> = {}

  function traverse(node: IVisualListNode) {
    if (visited[node.id]) return
    visited[node.id] = true

    if (!node.next) return

    if (node.id && node.next._id) {
      edges.push({data: {source: node.id, target: node.next._id}})
    }

    traverse(node.next)
  }

  nodes.forEach(traverse)

  return edges
}

interface IProps {
  vars: Record<string, any>
}

const hsl = (i = 1, count = 8, s = 90, l = 60) =>
  `hsl(${i * Math.trunc(360 / count)}, ${s}%, ${l}%)`

export const LinkedListVisualizer: React.FC<IProps> = ({vars}) => {
  const [layout, setLayout] = useState('cose')
  const cyRef = useRef<Core>()

  const nodes = toListNode(vars) ?? []

  const elements = CytoscapeView.normalizeElements({
    nodes: nodes
      .filter((n) => n.id)
      .map((n, i) => ({
        data: {
          id: n.id,
          label: `${n.id} = ${n.val}`,
          bg: hsl(i, 10),
        },
      })),
    edges: generateEdges(nodes),
  })

  useEffect(() => {
    cyRef.current?.layout({name: layout}).run()
  }, [vars, layout])

  window.elements = elements

  return (
    <div>
      <button onClick={() => setLayout('cose')}>cose</button>

      <button onClick={() => setLayout('circle')} tw="ml-2">
        circle
      </button>

      <CytoscapeView
        elements={elements}
        layout={{name: layout}}
        style={{width: '100%', height: '100vh'}}
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
    </div>
  )
}
