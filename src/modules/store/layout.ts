import {createMerge} from './utils/merge'

import {StoreModule} from '@types'
import {createPanelState} from 'utils/createPanel'

const set = createMerge('layout')

export const layoutModule: StoreModule = (store) => {
  store.on('@init', () => ({
    layout: {
      panels: [
        createPanelState({type: 'editor', uri: ''}),
        createPanelState({type: 'renderer', renderer: ''}),
        createPanelState({type: 'controls'}),
      ],
      preset: 'horizontal-split',
    },
  }))

  store.on('layout/set', (s, data) => set(s, data))
}
