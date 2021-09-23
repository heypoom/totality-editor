import {loadWASM} from 'onigasm'
import {Registry} from 'monaco-textmate'
import {wireTmGrammars} from 'monaco-editor-textmate'

import {EditorContext} from '@types'
import type {IMarkdownString} from 'monaco-editor'

async function loadOnigasm() {
  if (window.onigasmLoaded) return
  window.onigasmLoaded = true

  return loadWASM('/onigasm.wasm')
}

export async function configureGrammar(context: EditorContext) {
  const {monaco, editor} = context

  await loadOnigasm()

  const registry = new Registry({
    getGrammarDefinition: async () => {
      const res = await fetch(`/glsl.tmGrammar.json`)
      const content = await res.text()

      return {format: 'json', content}
    },
  })

  // Register GLSL shader language.
  monaco.languages.register({
    id: 'glsl',
    extensions: ['.glsl', '.frag', '.vert'],
  })

  // Configure line and block comments.
  monaco.languages.setLanguageConfiguration('glsl', {
    comments: {
      lineComment: '//',
      blockComment: ['/*', '*/'],
    },
  })

  monaco.languages.registerHoverProvider('glsl', {
    provideHover(model, position) {
      const wordAtPos = model.getWordAtPosition(position)
      const {word, startColumn = 0, endColumn = 0} = wordAtPos ?? {}

      const line = position.lineNumber
      const range = new monaco.Range(line, startColumn, line, endColumn)

      const contents: IMarkdownString[] = []

      if (word?.startsWith('u_')) contents.push({value: `Uniform: ${word}`})
      if (word?.startsWith('gl_')) contents.push({value: `Output: ${word}`})

      return {range, contents}
    },
  })

  // Map the GLSL language to the TextMate scope name.
  const grammars = new Map()
  grammars.set('glsl', 'source.glsl')

  await wireTmGrammars(monaco, registry, grammars, editor)
}
