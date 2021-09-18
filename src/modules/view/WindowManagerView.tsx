import 'twin.macro'

import loadable from '@loadable/component'

import {useStore} from 'modules/store'
import {panelViews} from 'modules/panel'

const Mosaic = loadable(async () => {
  const {Mosaic} = await import('react-mosaic-component')

  // @ts-ignore
  await import('react-mosaic-component/react-mosaic-component.css')

  return Mosaic
})

export const WindowManagerView: React.FC = () => {
  const {layout, options} = useStore('layout', 'options')

  const bgColor = options['theme.background']
  const style = {background: bgColor}

  if (typeof window === 'undefined') return null

  const [a, b, c] = layout?.panels?.map((p) => p.id)

  return (
    <div tw="flex items-center justify-center h-screen" style={style}>
      <Mosaic
        renderTile={(id) => {
          const panel = layout?.panels?.find((p) => p.id === id)
          if (!panel) return <div />

          const View = panelViews[panel.type]

          return (
            <div tw="w-full">
              <View panel={panel} />
            </div>
          )
        }}
        initialValue={{
          direction: 'row',
          first: a,
          second: b,
          splitPercentage: 70,
        }}
      />
    </div>
  )
}
