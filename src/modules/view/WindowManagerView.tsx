import 'twin.macro'

import {useStore} from 'modules/store'

import {Editor} from 'modules/editor'
import {RendererPanel} from 'modules/panel/RendererPanel'

import {PanelProps, PanelType} from '@types'

export const panelViews: Record<PanelType, React.FC<PanelProps>> = {
  editor: Editor,
  renderer: RendererPanel,
  controls: () => null,
}

export const WindowManagerView: React.FC = () => {
  const {layout} = useStore('layout')

  return (
    <div tw="flex items-center justify-center h-full">
      {layout?.panels?.map((panel) => {
        const View = panelViews[panel.type]

        return (
          <div key={panel.id} tw="w-full h-screen">
            <View panel={panel} />
          </div>
        )
      })}
    </div>
  )
}
