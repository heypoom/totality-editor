import 'twin.macro'

import {useStore} from 'modules/store'

import {PanelProps} from '@types'

function renderError(error: Error | string) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return `${error.name} - ${error.message}`

  return null
}

export const RendererPanel: React.FC<PanelProps> = ({panel}) => {
  const {runner, renderer} = useStore('runner', 'renderer')

  if (!panel || panel.type !== 'renderer' || !panel.renderer) return null

  const {component: Renderer} = renderer.renderers[panel.renderer] ?? {}
  if (!Renderer) return null

  return (
    <div>
      {runner.error && (
        <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
          {renderError(runner.error)}
        </div>
      )}

      <Renderer />
    </div>
  )
}
