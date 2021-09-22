import {createExtension} from 'utils'

export const TypeScriptReactExtension = createExtension({
  id: 'language.typescriptreact',

  defaultConfig: {},

  async setup(app) {
    async function addTypedef(id: string, uri: string) {
      const source = await fetch(uri).then((x) => x.text())

      app.editor.addTypeDefinition(id, source)
    }

    await addTypedef(
      'react',
      'https://cdn.jsdelivr.net/npm/@types/react@17.0.14/index.d.ts'
    )

    app.editor.setup(async (context) => {
      const {monaco} = context

      const ts = monaco.languages.typescript
      const tsd = ts.typescriptDefaults

      tsd.setCompilerOptions({
        jsx: ts.JsxEmit.React,
        strict: true,

        noEmit: true,
        target: ts.ScriptTarget.ES2016,
        allowJs: true,
        allowNonTsExtensions: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        module: ts.ModuleKind.CommonJS,
        typeRoots: ['node_modules/@types'],
        jsxFactory: 'React.createElement',
      })

      tsd.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      })
    })
  },
})
