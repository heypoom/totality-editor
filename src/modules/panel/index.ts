import {EditorPanel} from './EditorPanel'
import {ControlsPanel} from './ControlsPanel'
import {RendererPanel} from './RendererPanel'

import {PanelProps, PanelType} from '@types'

export const panelViews: Record<PanelType, React.FC<PanelProps>> = {
  editor: EditorPanel,
  renderer: RendererPanel,
  controls: ControlsPanel,
}
