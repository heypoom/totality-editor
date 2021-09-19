import 'twin.macro'

import {useStore} from 'modules/store'
import {panelViews} from 'modules/panel'

export const WindowManagerView: React.FC = () => {
  const {layout, options} = useStore('layout', 'options')

  const bgColor = options['theme.background']
  const height = options['layout.height']
  const style = {background: bgColor, height}

  if (typeof window === 'undefined') return null

  const [a, b] = layout?.panels?.map((p) => p.id)

  function renderPanelById(id: string) {
    const panel = layout?.panels?.find((p) => p.id === id)
    if (!panel) return <div />

    const View = panelViews[panel.type]

    return <View panel={panel} />
  }

  return (
    <div tw="flex items-center justify-center" style={style}>
      <div tw="w-3/4">{renderPanelById(a)}</div>
      <div tw="w-1/4">{renderPanelById(b)}</div>
    </div>
  )
}
