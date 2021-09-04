import Realm from 'realms-shim'

import {ExecutionAbortedError} from '../../errors/ExecutionAbortedError'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

interface Run {
  id: string | null

  error: Error | null
  isRunning: boolean
  isAborted: boolean

  // Cleanup handlers: used for abort and when execution finishes.
  cleanupHandlers: (() => void | Promise<void>)[]

  latestCompleteRunId: string | null
}

interface RunnerGlobal {
  console: Console
  setTimeout: typeof setTimeout

  delay(ms: number): Promise<void>

  track<T>(id: string, val: T): T
  tracks(vars: Record<string, any>): void
}

interface IRealm {
  global: RunnerGlobal
}

export class JSRunner {
  state: Run = {
    id: null,
    error: null,
    isRunning: false,
    isAborted: false,
    cleanupHandlers: [],

    latestCompleteRunId: null,
  }

  realm: Realm
  tracked: Map<string, unknown> = new Map()
  handlers: ((id: string, target: any) => void)[] = []

  constructor() {
    if (typeof window === 'undefined') return

    const realm: IRealm = Realm.makeRootRealm()

    realm.global.console = console
    realm.global.setTimeout = window.setTimeout
    realm.global.delay = this.delay.bind(this)
    realm.global.track = this.track.bind(this)
    realm.global.tracks = this.tracks.bind(this)

    this.realm = realm
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      const timeoutRef = setTimeout(resolve, ms)
      this.state.cleanupHandlers.push(() => clearTimeout(timeoutRef))
    })
  }

  on(type: 'track', handler: (id: string, target: any) => void) {
    this.handlers.push(handler)
  }

  track(id: string, target: any) {
    target._id = id
    this.tracked?.set(id, target)

    for (const handler of this.handlers) handler(id, target)

    return target
  }

  tracks(vars: Record<string, any>) {
    for (const [id, target] of Object.entries(vars)) {
      const proxy = this.track(id, target)
      vars[id] = proxy
    }
  }

  getTracked(): Record<string, any> {
    return Object.fromEntries(this.tracked)
  }

  // Process all abort and cleanup handlers.
  async cleanup() {
    const n = this.state.cleanupHandlers.length
    if (n === 0) return

    console.log(`[cleanup] processing ${n} cleanup handlers]`)

    await Promise.all(this.state.cleanupHandlers.map((x) => x()))
    this.state.cleanupHandlers = []
  }

  async run(code: string): Promise<string> {
    const runId = Math.random().toString(16).slice(2, 10)
    this.state.id = runId
    this.realm.global.runId = runId

    try {
      this.tracked = new Map()
      this.state.isRunning = true

      const result = await this.realm.evaluate(code)
      console.log(`[run] ${runId} complete`)

      this.state.latestCompleteRunId = runId

      return result
    } catch (error) {
      // Ignore aborted execution.
      if (error instanceof ExecutionAbortedError) {
        console.debug('execution aborted')
        return ''
      }

      this.state.error = error

      throw error
    } finally {
      console.log('[finally] cleanup')

      // Cleanup handlers
      await this.cleanup()

      this.state.isRunning = false
    }
  }
}

export const jsRunner = new JSRunner()

if (typeof window !== 'undefined') {
  window.jsRunner = jsRunner
}
