type Node = {_id: string; next: Node}
type NodeMap = Record<string, Node>

export function linkedListToAdjList(vars: NodeMap) {
  const adj: Record<string, Set<string>> = {}

  Object.entries(vars).forEach(([key, root]) => {
    let node = root

    while (node) {
      const src = node._id
      node = node.next

      if (node) {
        const dst = node._id
        if (!dst) continue

        if (!adj[src]) adj[src] = new Set()
        adj[src].add(dst)
      }
    }

    // Delete local key
    // adj[key]?.delete(key)
  })

  const map: Record<string, string[]> = {}
  for (const key in adj) map[key] = Array.from(adj[key])

  return map
}
