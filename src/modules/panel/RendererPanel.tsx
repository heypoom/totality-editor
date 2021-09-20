import 'twin.macro'

import {useStore} from 'modules/store'

import {PanelProps} from '@types'
import {isActiveRendererPanel} from '.'
import {getActiveRenderer} from 'modules/renderer/utils/activeRenderer'

function renderError(error: Error | string) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return `${error.name} - ${error.message}`

  return null
}

export const RendererPanel: React.FC<PanelProps> = ({panel}) => {
  const {runner, renderer} = useStore('runner', 'renderer')

  if (!isActiveRendererPanel(panel)) return null
  if (!panel.renderer) return null

  const {component: Renderer, state} = renderer.renderers[panel.renderer] ?? {}
  if (!Renderer) return null

  return (
    <div tw="flex flex-col w-full">
      {runner.error && (
        <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
          {renderError(runner.error)}
        </div>
      )}

      <Renderer state={state} panelId={panel.id} rendererId={panel.renderer} />
    </div>
  )
}
