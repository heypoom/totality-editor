import Realm from 'realms-shim'

export class JSRunner {
  realm: Realm

  tracked: Map<string, unknown> = new Map()
  error = false

  constructor() {
    const realm = Realm.makeRootRealm()
    realm.global.console = console

    realm.global.track = this.track.bind(this)
    realm.global.tracks = this.tracks.bind(this)

    this.realm = realm
  }

  track(id: string, target: any) {
    target._id = id
    this.tracked?.set(id, target)

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

  run(code: string): string {
    try {
      this.tracked = new Map()

      return this.realm.evaluate(code)
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
