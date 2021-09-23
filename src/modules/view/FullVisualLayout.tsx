import 'twin.macro'

import {panelViews} from 'modules/panel'
import {useStore} from 'modules/store'

export const FullVisualLayout: React.FC = () => {
  const {layout} = useStore('layout')

  return (
    <div tw="relative">
      {layout?.panels?.map((panel, idx) => {
        const View = panelViews[panel.type]
        if (!panel.visible) return null

        return (
          <div
            key={panel.id}
            tw="flex absolute w-full h-screen"
            style={{zIndex: 2 - idx}}
          >
            {panel.type !== 'editor' && <View panel={panel} />}

            {panel.type === 'editor' && (
              <div
                tw="w-full"
                style={{
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '60px 50px',
                }}
              >
                <View panel={panel} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
