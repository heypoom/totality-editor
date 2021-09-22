export interface RendererProps {
  state: unknown

  panelId: string
  rendererId: string
}

export interface Renderer {
  state?: unknown
  component: React.ComponentType<RendererProps>
}
