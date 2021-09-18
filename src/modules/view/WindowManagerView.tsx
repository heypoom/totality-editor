import 'twin.macro'

import loadable from '@loadable/component'

import {useStore} from 'modules/store'
import {panelViews} from 'modules/panel'

const Mosaic = loadable(async () => {
  const {Mosaic} = await import('react-mosaic-component')

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

          const background =
            panel.type === 'renderer'
              ? '#21222d'
              : panel.type === 'editor'
              ? '#21222d'
              : 'violet'

          return (
            <div tw="w-full" style={{background}}>
              <View panel={panel} />
            </div>
          )
        }}
        initialValue={{
          direction: 'row',
          first: a,
          second: {
            direction: 'column',
            first: b,
            second: c,
            splitPercentage: 70,
          },
          splitPercentage: 70,
        }}
      />
    </div>
  )
}