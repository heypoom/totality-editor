export type LayoutPreset =
  | 'vertical'
  | 'horizontal-split'
  | 'visual-in-background'

/** Renderer area allows you to render algorithm visualizations, simulations, previews and more. */
type RendererPanel = {type: 'renderer'; renderer: string}

/** Editor area allows you to display the Monaco editor. */
type EditorPanel = {type: 'editor'; uri: string}

/** Controls area allows you to tweak each parameters and interact with the simulation. */
type ControlsPanel = {type: 'controls'}

export type Panel = RendererPanel | EditorPanel | ControlsPanel

export interface LayoutState {
  preset: LayoutPreset
  panels: Panel[]
}
