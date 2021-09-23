import 'twin.macro'

import {createExtension} from 'utils'

import {ComponentChild, render} from 'preact'

const styles: React.CSSProperties = {
  background: '#ffffff22',
  backdropFilter: 'blur(3px)',
  border: '3px solid #ffffff33',
  boxShadow: 'rgb(0 0 0 / 55%) 0px 20px 68px',
}

const Circle: React.FC = ({children}) => (
  <div
    style={styles}
    tw="flex items-center justify-center text-3xl rounded-full cursor-pointer w-14 h-14"
  >
    {children}
  </div>
)

function draw(node: ComponentChild) {
  const div = document.createElement('div')
  render(node, div)

  return div
}

export const ExampleWidgetExtension = createExtension({
  id: 'widget.example',

  setup(app) {
    app.editor.setup((context) => {
      const {monaco, editor} = context
      const {ContentWidgetPositionPreference} = monaco.editor

      const cwNode = draw(<Circle>🦄</Circle>)
      const owNode = draw(<Circle>🍻</Circle>)

      const widget = {
        getId: () => 'my.content.widget',
        getDomNode: () => cwNode,

        getPosition() {
          return {
            position: editor.getPosition(),
            preference: [ContentWidgetPositionPreference.ABOVE],
          }
        },
      }

      editor.onDidChangeCursorPosition((e) => {
        editor.layoutContentWidget(widget)
      })

      editor.addContentWidget(widget)

      editor.addOverlayWidget({
        getId: () => 'my.overlay.widget',
        getDomNode: () => owNode,

        getPosition: () => ({
          preference:
            monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
        }),
      })
    })
  },
})
