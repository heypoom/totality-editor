import * as Y from 'yjs'

import {WebrtcProvider} from 'y-webrtc'
import {IndexeddbPersistence} from 'y-indexeddb'

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
    window.sync = this
  }
}
