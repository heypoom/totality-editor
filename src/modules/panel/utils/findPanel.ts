import {PanelOf, Panel} from '@types'

export type RendererPanel = PanelOf<'renderer'>

export const isActiveRendererPanel = (panel: Panel): panel is RendererPanel =>
  panel && panel.type === 'renderer' && panel.visible
