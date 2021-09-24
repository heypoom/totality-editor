export const LinkedListSample = `
class ListNode<T> {
  val: T | null
  next: ListNode<T> | null

  constructor(val: T, next?: ListNode<T>) {
    this.val = val ?? null
    this.next = next ?? null
  }

  static of<T>(val: T) {
    return new ListNode(val)
  }
}

async function process(k = 6) {
  let n = 1
  let current = ListNode.of(n)

  while (n <= k) {
    current.next = ListNode.of(n + 1)
    track(n.toString(), current)
    current = current.next

    await tick()

    n++
  }

  return current
}

process(18)
`.trim()
