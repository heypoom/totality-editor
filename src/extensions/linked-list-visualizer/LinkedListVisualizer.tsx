import CytoscapeView from 'react-cytoscapejs'
import type {Core, ElementDefinition} from 'cytoscape'
import {useRef, useState} from 'react'
import {useEffect} from 'react'
import tw, {styled} from 'twin.macro'

import {useStore} from '@totality/core'

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

const Button = styled.button({
  ...tw`bg-white text-violet-700 px-2 py-1 rounded transform duration-75 outline-none focus:outline-none`,
  ...tw`hocus:(scale-105)`,

  variants: {active: {true: tw`bg-violet-700 text-white`}},
})

const hsl = (i = 1, count = 8, s = 90, l = 60) =>
  `hsl(${i * Math.trunc(360 / count)}, ${s}%, ${l}%)`

export const LinkedListVisualizer: React.FC = () => {
  const {runner} = useStore('runner')

  const [layout, setLayout] = useState('cose')
  const cyRef = useRef<Core>()

  const nodes = toListNode(runner.variables) ?? []

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
  }, [runner.variables, layout])

  return (
    <div>
      <Button
        active={layout === 'cose'}
        onClick={() => setLayout('cose')}
        tw="mr-2"
      >
        COSE
      </Button>

      <Button active={layout === 'circle'} onClick={() => setLayout('circle')}>
        Circle
      </Button>

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
