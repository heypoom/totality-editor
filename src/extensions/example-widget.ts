import {createExtension} from 'utils'

export const ExampleWidgetExtension = createExtension({
  id: 'example.widget',

  setup(app) {
    app.editor.setup((context) => {
      const {monaco, editor} = context
      const {ContentWidgetPositionPreference} = monaco.editor

      editor.addContentWidget({
        getId: () => 'my.content.widget',

        getDomNode() {
          const div = document.createElement('div')
          div.innerHTML = '<h1>🦄</h1>'
          div.style.fontSize = '24px'
          div.style.cursor = 'pointer'
          return div
        },

        getPosition() {
          return {
            position: {lineNumber: 1, column: 1},

            preference: [
              ContentWidgetPositionPreference.ABOVE,
              ContentWidgetPositionPreference.BELOW,
            ],
          }
        },
      })

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
