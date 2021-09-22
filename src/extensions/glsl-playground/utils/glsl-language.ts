import {loadWASM} from 'onigasm'
import {Registry} from 'monaco-textmate'
import {wireTmGrammars} from 'monaco-editor-textmate'

import {EditorContext} from '@types'

class OnigasmManager {
  loaded = false

  async load() {
    if (this.loaded) return

    this.loaded = true
    await loadWASM('/onigasm.wasm')
  }
}

const manager = new OnigasmManager()

export async function configureGrammar(context: EditorContext) {
  const {monaco, editor} = context

  await manager.load()

  const registry = new Registry({
    getGrammarDefinition: async () => {
      const res = await fetch(`/glsl.tmGrammar.json`)
      const content = await res.text()

      return {format: 'json', content}
    },
  })

  monaco.languages.register({
    id: 'glsl',
    extensions: ['.glsl', '.frag', '.vert'],
    aliases: [],
  })

  // map of monaco "language id's" to TextMate scopeNames
  const grammars = new Map()
  grammars.set('glsl', 'source.glsl')

  await wireTmGrammars(monaco, registry, grammars, editor)
}
