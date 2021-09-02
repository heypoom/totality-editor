export const CircleLinkedListExample = `
declare function track<T>(id: string, val: T): T
declare function tracks(vars: Record<string, any>): void
declare function delay(ms: number): Promise<void>

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

    await delay(50)

    n++
  }

  return current
}

process(20)
`.trim()
