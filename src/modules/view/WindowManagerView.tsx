import 'twin.macro'

import loadable from '@loadable/component'

import {useStore} from 'modules/store'
import {panelViews} from 'modules/panel'

import {LoadingSkeleton} from 'modules/editor/LoadingSkeleton'

export const WindowManagerView: React.FC = () => {
  const {layout, options} = useStore('layout', 'options')

  const bgColor = options['theme.background']
  const style = {background: bgColor}

  if (typeof window === 'undefined') return null

  const [a, b] = layout?.panels?.map((p) => p.id)

  function renderPanelById(id: string) {
    const panel = layout?.panels?.find((p) => p.id === id)
    if (!panel) return <div />

    const View = panelViews[panel.type]

    return <View panel={panel} />
  }

  return (
    <div tw="flex items-center justify-center h-screen" style={style}>
      <div tw="w-3/4">{renderPanelById(a)}</div>
      <div tw="w-1/4">{renderPanelById(b)}</div>
    </div>
  )
}
