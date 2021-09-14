export type LayoutPreset =
  | 'focused'
  | 'maximized'
  | 'vertical-split'
  | 'horizontal-split'
  | 'visual-in-background'

/** Renderer Panel allows you to render algorithm visualizations, simulations, previews and more. */
type RendererPanel = {type: 'renderer'; renderer: string}

/** Editor Panel displays the Monaco editor for code editing. */
type EditorPanel = {type: 'editor'; uri: string}

/** Controls Panel allows you to tweak each parameters and interact with the simulation. */
type ControlsPanel = {type: 'controls'}

interface PanelState {
  // Is this panel currently visible?
  visible: boolean

  // Is this panel being focused on?
  focused: boolean
}

export type Panel = (RendererPanel | EditorPanel | ControlsPanel) & PanelState

export interface LayoutState {
  preset: LayoutPreset
  panels: Panel[]
}