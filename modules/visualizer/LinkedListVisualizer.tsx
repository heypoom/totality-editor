import 'twin.macro'

import CytoscapeView from 'react-cytoscapejs'
import type {ElementDefinition} from 'cytoscape'

interface IVisualListNode {
  id: string
  val?: unknown | null
  next?: any | null
}

export function filterLinkedList(vars: Record<string, any>): IVisualListNode[] {
  return Object.entries(vars)
    .filter(([id, v]) => v.constructor.name === 'ListNode')
    .map(([id, node]) => ({id, val: node.val, next: node.next}))
}

function generateEdges(nodes: IVisualListNode[]): ElementDefinition[] {
  const edges: ElementDefinition[] = []
  let visited: Record<string, boolean> = {}

  function traverse(node: IVisualListNode) {
    if (visited[node.id]) return
    visited[node.id] = true

    if (!node.next) return

    edges.push({data: {source: node.id, target: node.next._id}})
    traverse(node.next)
  }

  nodes.forEach(traverse)

  return edges
}

interface IProps {
  vars: Record<string, any>
}

export const LinkedListVisualizer: React.FC<IProps> = ({vars}) => {
  const nodes = filterLinkedList(vars) ?? []

  const elements = CytoscapeView.normalizeElements({
    nodes: nodes.map((n) => ({data: {id: n.id, label: `${n.id} = ${n.val}`}})),
    edges: generateEdges(nodes),
  })

  console.log('Normalised:', elements)

  return (
    <div>
      <CytoscapeView
        elements={elements}
        layout={{name: 'cose'}}
        style={{width: '600px', height: '400px'}}
        stylesheet={[
          {
            selector: 'node',
            style: {
              'background-color': '#686de0',
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
      />

      <div>
        {nodes.map((node) => (
          <div key={node.id} tw="p-3 bg-red-400 m-4">
            {node.id} {node.val}
          </div>
        ))}
      </div>

      {/* <code tw="text-sm text-pink-50">
        <pre>{JSON.stringify(vars, null, 2)}</pre>
      </code> */}
    </div>
  )
}
