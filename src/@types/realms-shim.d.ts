declare module 'realms-shim' {
  class Realm {
    static makeRootRealm<T>(): T
  }

  export = Realm
}
