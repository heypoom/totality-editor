import {createExtension} from 'utils'

export const TypeScriptReactExtension = createExtension({
  id: 'language.typescriptreact',

  defaultConfig: {
    'language.typescriptreact.typeDefs': true,
  },

  async setup(app) {
    app.editor.setup(async (context) => {
      const {monaco} = context

      console.log('tsx:', context)

      const ts = monaco.languages.typescript
      const tsd = ts.typescriptDefaults

      async function addTypedef(uri: string, filePath: string) {
        const source = await fetch(uri).then((x) => x.text())

        tsd.addExtraLib(source, filePath)
      }

      if (app.options['language.typesciptreact.typeDefs']) {
        await addTypedef(
          'https://cdn.jsdelivr.net/npm/@types/react@17.0.14/index.d.ts',
          'react.d.ts'
        )
      }

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
