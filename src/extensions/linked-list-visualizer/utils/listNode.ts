import type {ElementDefinition} from 'cytoscape'

interface Node {
  id: string
  nodes: string[]
}

export const toListNode = (graph: Record<string, string[]>): Node[] =>
  graph && Object.entries(graph).map(([id, nodes]) => ({id, nodes}))

export const generateEdges = (nodes: Node[]): ElementDefinition[] =>
  nodes.flatMap((source) => {
    return source.nodes.flatMap((target) => ({
      data: {source: source.id, target},
    }))
  })

export const generateNodes = (nodes: Node[]): ElementDefinition[] => {
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

export const hsl = (i = 1, count = 8, s = 90, l = 60) =>
  `hsl(${i * Math.trunc(360 / count)}, ${s}%, ${l}%)`
