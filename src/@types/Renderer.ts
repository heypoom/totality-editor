import {CoreOptions} from '@types'

export interface RendererProps {
  panelId: string
  rendererId: string

  state: unknown
}

export interface Renderer {
  state?: unknown
  component: React.ComponentType<RendererProps>
}
