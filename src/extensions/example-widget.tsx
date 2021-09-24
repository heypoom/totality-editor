import tw from 'twin.macro'

import {createExtension} from 'utils'

import {ComponentChild, render} from 'preact'

import type {editor} from 'monaco-editor/esm/vs/editor/editor.api'

const Circle = tw.button`
	flex items-center justify-center text-3xl rounded-full
	cursor-pointer backdrop-filter backdrop-blur-sm
	w-14 h-14 border-[3px] border-opacity-20
	bg-white/5 shadow-carbon hover:bg-red-500/70
`

function create(node: ComponentChild) {
  const div = document.createElement('div')
  render(node, div)

  return div
}

function draw(node: ComponentChild, element: HTMLElement) {
  render(node, element, element.firstChild as any)
}

export const ExampleWidgetExtension = createExtension({
  id: 'widget.example',

  setup(app) {
    app.editor.setup((context) => {
      const {monaco, editor} = context
      const {ContentWidgetPositionPreference} = monaco.editor

      const cwNode = create(<Circle>🦄</Circle>)
      const owNode = create(<Circle>🍻</Circle>)

      const model = editor.getModel()!

      const widget: editor.IContentWidget = {
        getId: () => 'widget.unicorn',
        getDomNode: () => cwNode,

        getPosition() {
          return {
            position: editor.getPosition(),
            preference: [ContentWidgetPositionPreference.ABOVE],
          }
        },
      }

      function editWord(
        text: string,
        word: editor.IWordAtPosition,
        line: number
      ) {
        const {Range} = monaco
        const {startColumn, endColumn} = word

        const range = new Range(line, startColumn, line, endColumn)
        model.pushEditOperations([], [{text, range}], () => [])
      }

      editor.onDidChangeCursorPosition((e) => {
        const word = model.getWordAtPosition(e.position)
        const text = word?.word ?? ''

        let n = parseInt(text)
        const show = !isNaN(n)

        function redraw() {
          draw(show && <Circle onClick={run}>{n}</Circle>, cwNode)
        }

        function run() {
          n++
          editWord(`${n}`, word!, e.position.lineNumber)
          redraw()
        }

        redraw()

        editor.layoutContentWidget(widget)
      })

      editor.addContentWidget(widget)

      editor.addOverlayWidget({
        getId: () => 'widget.beer',
        getDomNode: () => owNode,

        getPosition: () => ({
          preference:
            monaco.editor.OverlayWidgetPositionPreference.TOP_RIGHT_CORNER,
        }),
      })
    })
  },
})
