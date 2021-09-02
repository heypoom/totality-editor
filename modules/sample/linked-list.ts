export const LinkedListExample = `
declare function track<T>(id: string, val: T): T
declare function tracks(vars: Record<string, any>): void

class ListNode<T> {
  val: T | null
  next: ListNode<T> | null

  constructor(val: T, next?: ListNode<T>) {
    this.val = val
    this.next = next ?? null
  }

  static of<T>(val: T) {
    return new ListNode(val)
  }
}

let A = ListNode.of(100)
let B = ListNode.of(50)
let C = ListNode.of(30)
let D = ListNode.of(40)

tracks({A, B, C, D})

A.next = B
B.next = C
C.next = D
D.next = B
`.trim()
