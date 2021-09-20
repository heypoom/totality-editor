import {nanoid} from 'nanoid'

import {Panel, PanelConfig} from '@types'

export const createPanelState = (config: PanelConfig): Panel => ({
  id: nanoid(),
  visible: true,
  focused: true,
  ...config,
})
