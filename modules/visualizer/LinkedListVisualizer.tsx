import {divide} from 'lodash'
import tw from 'twin.macro'

interface IVisualListNode {
  id: string
  val?: unknown | null
  next?: IVisualListNode | null
}

export function filterLinkedList(vars: Record<string, any>): IVisualListNode[] {
  return Object.entries(vars)
    .filter(([id, v]) => v.constructor.name === 'ListNode')
    .map(([id, node]) => ({id, val: node.val, next: node.next}))
}

interface Props {
  vars: Record<string, any>
}

export const LinkedListVisualizer: React.FC<Props> = ({vars}) => {
  const nodes = filterLinkedList(vars) ?? []

  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id} tw="p-3 bg-red-400 m-4">
          {node.id} {node.val}
        </div>
      ))}
    </div>
  )
}
