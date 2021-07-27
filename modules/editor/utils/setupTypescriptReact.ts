import {IEditorContext} from '../../../@types/IMonaco'

export async function setupTypescriptReact({monaco, editor}: IEditorContext) {
  const ins = monaco.editor
  const ts = monaco.languages.typescript
  const tsd = ts.typescriptDefaults

  const modelUri = monaco.Uri.file('hello.tsx')
  const codeModel = ins.createModel(`//`, 'typescript', modelUri)

  async function addTypedef(uri: string, filePath: string) {
    const source = await fetch(uri).then((x) => x.text())

    tsd.addExtraLib(source, filePath)
  }

  tsd.setCompilerOptions({
    jsx: ts.JsxEmit.React,
    strict: true,

    noEmit: true,
    target: ts.ScriptTarget.ES2016,
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

  await addTypedef(
    'https://cdn.jsdelivr.net/npm/@types/react@17.0.14/index.d.ts',
    'react.d.ts'
  )

  editor.setModel(codeModel)
}
