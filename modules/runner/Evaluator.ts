import Realm from 'realms-shim'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class JSRunner {
  realm: Realm

  tracked: Map<string, unknown> = new Map()

  error = false
  running = false
  canceled = false
  currentRunId = ''

  runs: Map<string, any> = new Map()
  handlers: ((id: string, target: any) => void)[] = []

  constructor() {
    if (typeof window === 'undefined') return

    const realm = Realm.makeRootRealm()

    realm.global.console = console
    realm.global.setTimeout = window.setTimeout
    realm.global.delay = this.delay.bind(this)
    realm.global.track = this.track.bind(this)
    realm.global.tracks = this.tracks.bind(this)

    this.realm = realm
  }

  delay(ms: number) {
    if (this.canceled) {
      console.log('[delay::execution_aborted]')
      this.running = false

      return Promise.reject('Execution Aborted')
    }

    return delay(ms)
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

  async run(code: string): Promise<string> {
    if (this.canceled) throw new Error('Execution aborted.')

    const runId = Math.random().toString(16).slice(2, 10)
    this.currentRunId = runId

    let waitLoopCount = 0

    try {
      // Wait loop: wait until other operation finishes.
      while (this.running) {
        this.canceled = true
        await delay(10)

        waitLoopCount++

        if (runId !== this.currentRunId) throw new Error('Run superseded.')

        if (waitLoopCount > 1000)
          throw new Error('Wait loop deadline exceeded.')

        console.log(`[wait loop] waiting for ${runId} @ ${waitLoopCount}`)
      }
    } catch (err) {
      console.log(`[wait error] ${err.message}`)

      throw err
    } finally {
      this.canceled = false
    }

    this.canceled = false

    try {
      this.tracked = new Map()
      this.running = true

      const result = await this.realm.evaluate(code)
      console.log(`[run] ${runId} complete`)

      return result
    } catch (err) {
      this.error = err
      throw err
    } finally {
      this.running = false
    }
  }

  set(key: string, value: unknown) {
    this.realm.global[key] = value
  }

  get(key: string) {
    return this.realm.global[key]
  }
}

export const jsRunner = new JSRunner()

if (typeof window !== 'undefined') {
  window.jsRunner = jsRunner
}
