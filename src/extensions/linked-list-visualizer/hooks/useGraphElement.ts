import {useMemo} from 'react'
import CytoscapeView from 'react-cytoscapejs'

import {toListNode, generateNodes, generateEdges} from '../utils/listNode'

export function useGraphElements(graph: Record<string, string[]>) {
  return useMemo(() => {
    const lists = toListNode(graph) ?? []

    const nodes = generateNodes(lists) ?? []
    const edges = generateEdges(lists) ?? []

    return CytoscapeView.normalizeElements({nodes, edges})
  }, [graph])
}
