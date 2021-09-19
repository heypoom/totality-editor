import React, {ReactNode} from 'react'
import loadable, {LoadableComponent} from '@loadable/component'

import {PanelProps, PanelType} from '@types'
import {LoadingSkeleton} from 'modules/editor/LoadingSkeleton'

const load = (
  panel: () => Promise<React.FC<PanelProps>>,
  fallback?: JSX.Element
) => loadable(panel, {fallback})

const EditorPanel = load(
  async () => (await import('./EditorPanel')).EditorPanel,
  <LoadingSkeleton />
)

const RendererPanel = load(
  async () => (await import('./RendererPanel')).RendererPanel
)

const ControlsPanel = load(
  async () => (await import('./ControlsPanel')).ControlsPanel
)

export const panelViews: Record<PanelType, LoadableComponent<PanelProps>> = {
  editor: EditorPanel,
  renderer: RendererPanel,
  controls: ControlsPanel,
}
