import {isActiveRendererPanel} from 'modules/panel'

import {Panel, Renderer} from '@types'

interface Context {
  panels: Panel[]
  renderers: Record<string, Renderer>
}

export const getActiveRenderer = (context: Context) => {
  const {panels, renderers} = context

  const panel = panels.find(isActiveRendererPanel)
  const panelId = panel?.id
  const rendererId = panel?.renderer ?? ''
  const renderer = renderers[rendererId] ?? {}

  return {renderer, rendererId, panelId}
}
