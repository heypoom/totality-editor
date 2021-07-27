import MonacoEditor from '@monaco-editor/react'

import {MonacoManager} from './MonacoManager'

import {IMonacoOption} from '../../@types/IMonaco'

export const Editor: React.FC = () => {
  const options: IMonacoOption = {
    selectOnLineNumbers: true,
    fontSize: 26,
    fontFamily: '"JetBrains Mono", monospace',
    fontLigatures: true,
    tabSize: 2,
    detectIndentation: false,
    insertSpaces: true,
    minimap: {enabled: false},
  }

  return (
    <div>
      <MonacoEditor
        height="500px"
        theme="vs-dark"
        defaultLanguage="typescript"
        defaultValue="// ok?"
        options={options}
        onMount={(editor, monaco) => {
          const manager = new MonacoManager({monaco, editor})
          manager.setup()
        }}
      />
    </div>
  )
}
