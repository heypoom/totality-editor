import 'twin.macro'

import Split from 'react-split'

import {useStore} from 'modules/store'
import {panelViews} from 'modules/panel'

const handlerImage = `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==')`

const gutterStyle = {
  zIndex: '10',
  width: '8px',
  cursor: 'col-resize',
  backgroundPosition: '50%',
  backgroundRepeat: 'no-repeat',
  backgroundImage: handlerImage,
}

export const WindowManagerView: React.FC = () => {
  const {layout, options} = useStore('layout', 'options')

  const bgColor = options['theme.background']
  const height = options['layout.height']
  const style = {background: bgColor, height}

  if (typeof window === 'undefined') return null

  return (
    <div style={style}>
      <Split
        sizes={[70, 30]}
        tw="flex flex-row"
        gutterStyle={() => gutterStyle}
      >
        {layout?.panels?.map((panel) => {
          const View = panelViews[panel.type]

          return (
            <div tw="flex" key={panel.id}>
              <View panel={panel} />
            </div>
          )
        })}
      </Split>
    </div>
  )
}
