import Realm from 'realms-shim'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export class JSRunner {
  realm: Realm

  tracked: Map<string, unknown> = new Map()
  error = false

  handlers: ((id: string, target: any) => void)[] = []

  constructor() {
    if (typeof window === 'undefined') return

    const realm = Realm.makeRootRealm()

    realm.global.console = console
    realm.global.setTimeout = window.setTimeout
    realm.global.delay = delay
    realm.global.track = this.track.bind(this)
    realm.global.tracks = this.tracks.bind(this)

    this.realm = realm
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
    try {
      this.tracked = new Map()

      return await this.realm.evaluate(code)
    } catch (err) {
      this.error = err
      throw err
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
