import {createExtension} from 'utils'

export const ExampleWidgetExtension = createExtension({
  id: 'example.widget',

  setup(app) {
    app.editor.setup((context) => {
      const {monaco, editor} = context
      const {ContentWidgetPositionPreference} = monaco.editor

      const widget = {
        getId: () => 'my.content.widget',

        getDomNode() {
          const n = document.createElement('div')

          n.innerText = '🦄'
          n.style.fontSize = '30px'
          n.style.cursor = 'pointer'
          n.style.background = '#ffffff22'
          n.style.padding = '4px 11px'
          n.style.borderRadius = '50%'
          n.style.border = '3px solid #ffffff33'
          n.style.boxShadow = 'rgb(0 0 0 / 55%) 0px 20px 68px'

          // @ts-ignore
          n.style.backdropFilter = 'blur(4px)'

          return n
        },

        getPosition() {
          return {
            position: editor.getPosition(),

            preference: [
              ContentWidgetPositionPreference.ABOVE,
              ContentWidgetPositionPreference.BELOW,
            ],
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
