import produce from 'immer'

import {StoreModule} from '../../@types/Store'

export const hooksModule: StoreModule = (store) => {
  store.on('@init', () => ({hooks: {'editor.setup': []}}))

  store.on('hooks/add', (state, data) =>
    produce(state, (draft) => {
      draft.hooks[data.type].push({
        handler: data.handler,
        ext: data.extensionId,
      })
    })
  )
}
