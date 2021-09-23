import {createExtension} from 'utils'

import {render} from 'preact'

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

export const ExampleWidgetExtension = createExtension({
  id: 'widget.example',

  setup(app) {
    app.editor.setup((context) => {
      const {monaco, editor} = context
      const {ContentWidgetPositionPreference} = monaco.editor

      const n = document.createElement('div')
      render(<div style={styles}>🦄</div>, n)

      const widget = {
        getId: () => 'my.content.widget',
        getDomNode: () => n,

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

        getDomNode() {
          const div = document.createElement('div')
          div.innerHTML = '<button>🌟</button>'
          div.style.fontSize = '24px'
          return div
        },

        getPosition() {
          return null
        },
      })
    })
  },
})
