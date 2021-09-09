import * as Y from 'yjs'
import {IndexeddbPersistence} from 'y-indexeddb'
import {WebrtcProvider} from 'y-webrtc'

export class SyncController {
  key = 'totality'
  doc: Y.Doc | null = null

  rtc: WebrtcProvider | null = null
  persistence: IndexeddbPersistence | null = null

  constructor() {
    this.setup()
  }

  async setup() {
    if (typeof window === 'undefined') return

    this.doc = new Y.Doc()

    this.persistence = new IndexeddbPersistence(this.key, this.doc)
    this.persistence.whenSynced.then(() => {
      console.log('Synchronized with IndexedDB')
    })

    this.rtc = new WebrtcProvider(this.key, this.doc)

    // @ts-ignore
    window.sync = this
  }
}

export const syncManager = new SyncController()
