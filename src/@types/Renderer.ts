interface RendererProps {}

export interface Renderer {
  state: unknown
  component: React.ComponentType<RendererProps>
}
