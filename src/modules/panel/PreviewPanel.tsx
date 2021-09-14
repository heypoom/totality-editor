import 'twin.macro'
import loadable from '@loadable/component'

import {useStore} from 'modules/store'

const LinkedListVisualizer = loadable(async () => {
  const {LinkedListVisualizer} = await import(
    'modules/visualizer/LinkedListVisualizer'
  )

  return LinkedListVisualizer
})

function renderError(error: Error | string) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return `${error.name} - ${error.message}`

  return null
}

export const PreviewPanel: React.FC = () => {
  const {runner} = useStore('runner')

  return (
    <div>
      {runner.error && (
        <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
          {renderError(runner.error)}
        </div>
      )}

      <LinkedListVisualizer vars={runner.variables} />
    </div>
  )
}
