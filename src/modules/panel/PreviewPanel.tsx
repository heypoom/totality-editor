import 'twin.macro'

import {useStore} from 'modules/store'

function renderError(error: Error | string) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return `${error.name} - ${error.message}`

  return null
}

export const PreviewPanel: React.FC = () => {
  const {runner, renderer} = useStore('runner', 'renderer')
  if (!renderer.current) return null

  const {component: Renderer} = renderer.renderers[renderer.current]
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
