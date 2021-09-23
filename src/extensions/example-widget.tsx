import {createExtension} from 'utils'

import {ComponentChild, render} from 'preact'

const styles: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 30,
  cursor: 'pointer',
  background: '#ffffff22',
  borderRadius: '50%',
  width: '55px',
  height: '55px',
  border: '3px solid #ffffff33',
  boxShadow: 'rgb(0 0 0 / 55%) 0px 20px 68px',
  backdropFilter: 'blur(3px)',
}

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

      const cwNode = draw(<div style={styles}>🦄</div>)
      const owNode = draw(<div style={styles}>🍻</div>)

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
