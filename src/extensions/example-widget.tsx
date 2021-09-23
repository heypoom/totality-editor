import tw from 'twin.macro'

import {createExtension} from 'utils'

import {ComponentChild, render} from 'preact'

const Circle = tw.div`
	flex items-center justify-center text-3xl rounded-full
	cursor-pointer backdrop-filter backdrop-blur-sm
	w-14 h-14 border-[3px] border-opacity-20
	bg-white bg-opacity-5 shadow-carbon
	hover:bg-red-500 hover:bg-opacity-70
`

draw(<Circle>🦄</Circle>)

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
