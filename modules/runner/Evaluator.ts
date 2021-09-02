import Realm from 'realms-shim'

export class JSRunner {
  realm: Realm

  tracked: Map<string, unknown> = new Map()

  constructor() {
    const realm = Realm.makeRootRealm()
    realm.global.console = console

    realm.global.track = (id: string, target: any) => {
      target._id = id
      this.tracked.set(id, target)

      return target
    }

    realm.global.tracks = (vars: Record<string, any>) => {
      for (const [id, target] of Object.entries(vars)) {
        const proxy = realm.global.track(id, target)
        vars[id] = proxy
      }
    }

    this.realm = realm
  }

  getTracked(): Record<string, any> {
    return Object.fromEntries(this.tracked)
  }

  run(code: string): string {
    try {
      this.tracked = new Map()

      return this.realm.evaluate(code)
    } catch (err) {
      return ''
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
