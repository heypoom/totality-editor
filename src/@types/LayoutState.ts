export type LayoutPreset =
  | 'focused'
  | 'maximized'
  | 'vertical-split'
  | 'horizontal-split'
  | 'visual-in-background'

/** Renderer Panel allows you to render algorithm visualizations, simulations, previews and more. */
export type RendererPanel = {type: 'renderer'; renderer: string}

/** Editor Panel displays the Monaco editor for code editing. */
export type EditorPanel = {type: 'editor'; uri: string}

/** Controls Panel allows you to tweak each parameters and interact with the simulation. */
export type ControlsPanel = {type: 'controls'}

export interface PanelState {
  // Panel Identifier
  id: string

  // Is this panel currently visible?
  visible: boolean

  // Is this panel being focused on?
  focused: boolean
}

export type PanelConfig = RendererPanel | EditorPanel | ControlsPanel

export type PanelOf<K extends PanelType> = Extract<PanelConfig, {type: K}> &
  PanelState

export type Panel = PanelConfig & PanelState
export type PanelType = Panel['type']

export interface PanelProps {
  /** State of the current panel. */
  panel: Panel
}

export interface LayoutState {
  preset: LayoutPreset
  panels: Panel[]
}
