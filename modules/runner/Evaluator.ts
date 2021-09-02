import Realm from 'realms-shim'

export class JSRunner {
  realm: Realm

  tracked: Map<string, unknown> = new Map()

  constructor() {
    const realm = Realm.makeRootRealm()
    realm.global.console = console

    realm.global.track = (id: string, target: any) => {
      const key = target?.constructor?.name ?? target

      const proxy = new Proxy(target, {
        get(target, prop, receiver) {
          // console.log('get tracked:', {id, key, target, prop, receiver})

          return target[prop]
        },

        set(target, prop, value) {
          // console.log('set tracked:', {id, key, target, prop, value})

          target[prop] = value

          return true
        },
      })

      // tracking id
      proxy._id = id

      // console.log('[Tracking]', id, proxy)
      this.tracked.set(id, proxy)

      return proxy
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
