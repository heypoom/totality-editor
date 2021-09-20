import Realm from 'realms-shim'

import {Run, RunHandlers, RunHandlerMap, IRealm} from '@types'

import {store} from 'modules/store'
import {ExecutionAbortedError} from 'errors/ExecutionAbortedError'

export class JSRunner {
  state: Run = {
    id: null,
    error: null,
    isAsync: false,
    isRunning: false,
    isAborted: false,

    latestCompleteRunId: null,
  }

  handlers: RunHandlerMap = {
    frame: [],
    cleanup: [],
    track: [],
  }

  frame = 0
  realm = this.createScope()
  tracked: Map<string, unknown> = new Map()

  createScope() {
    const realm: IRealm = Realm.makeRootRealm()

    if (typeof window !== 'undefined') {
      realm.global.console = console
      realm.global.setTimeout = window.setTimeout
      realm.global.delay = this.delay.bind(this)
      realm.global.track = this.track.bind(this)
      realm.global.tracks = this.tracks.bind(this)
      realm.global.tick = this.tick.bind(this)
    }

    return realm
  }

  delay(ms: number): Promise<void> {
    this.state.isAsync = true

    return new Promise((resolve) => {
      const timeoutRef = setTimeout(() => {
        this.updateFrame()
        resolve()
      }, ms)

      this.handlers.cleanup.push(() => clearTimeout(timeoutRef))
    })
  }

  updateFrame() {
    for (const handler of this.handlers.frame) {
      handler(this)
    }

    this.frame++
  }

  tick(): Promise<void> {
    this.state.isAsync = true

    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        this.updateFrame()

        resolve()
      })
    })
  }

  setScope(key: string, value: unknown) {
    this.realm.global[key] = value
  }

  on<T extends keyof RunHandlers>(type: T, handler: RunHandlers[T]) {
    const handlers = this.handlers[type]
    handlers.push(handler as any)
  }

  track(id: string, target: any) {
    try {
      if (target) target._id = id

      this.tracked?.set(id, target)

      for (const handler of this.handlers.track) {
        handler({key: id, value: target}, this)
      }

      return target
    } catch (error) {
      console.warn('[tracking error]', error)
    }
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
    const {cleanup} = this.handlers

    const n = cleanup.length
    if (n === 0) return

    console.log(`[cleanup] processing ${n} cleanup handlers]`)
    await Promise.all(cleanup.map((x) => x()))

    this.handlers.cleanup = []
  }

  async run(code: string): Promise<string> {
    const runId = Math.random().toString(16).slice(2, 10)
    this.state.id = runId
    this.state.isAsync = false
    this.realm.global.runId = runId

    try {
      this.tracked = new Map()
      this.state.isRunning = true

      const result = await this.realm.evaluate(code)

      // HACK: Manually rerender if not in async run.
      if (!this.state.isAsync) this.updateFrame()

      this.state.latestCompleteRunId = runId

      return String(result)
    } catch (error) {
      if (error instanceof Error) {
        // Ignore aborted execution.
        if (error instanceof ExecutionAbortedError) {
          console.debug('execution aborted')
          return ''
        }

        this.state.error = error

        throw error
      }
    } finally {
      // Cleanup handlers
      await this.cleanup()

      this.state.isRunning = false
    }

    return ''
  }
}
