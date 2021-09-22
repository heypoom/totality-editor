import {loadWASM} from 'onigasm'
import {Registry} from 'monaco-textmate'
import {wireTmGrammars} from 'monaco-editor-textmate'

import {EditorContext} from '@types'

export async function configureGrammar(context: EditorContext) {
  const {monaco, editor} = context

  await loadWASM(`path/to/onigasm.wasm`) // See https://www.npmjs.com/package/onigasm#light-it-up

  const registry = new Registry({
    getGrammarDefinition: async (scopeName) => {
      const res = await fetch(`/grammars/css.tmGrammar.json`)

      return {
        format: 'json',
        content: await res.text(),
      }
    },
  })

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map()
  grammars.set('glsl', 'source.glsl')

  await wireTmGrammars(monaco, registry, grammars, editor)
}
