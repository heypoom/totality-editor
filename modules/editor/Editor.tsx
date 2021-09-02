import MonacoEditor from '@monaco-editor/react'

import {MonacoManager} from './MonacoManager'

import {IMonacoOption} from '../../@types/IMonaco'

interface Props {
  value: string
  onChange: (value: string) => void
}

export const Editor: React.FC<Props> = ({value, onChange}) => {
  const options: IMonacoOption = {
    selectOnLineNumbers: true,
    fontSize: 21,
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
        {...{value, options}}
        onChange={(code) => onChange(code ?? '')}
        onMount={(editor, monaco) => {
          const manager = new MonacoManager({monaco, editor})
          manager.setup()
        }}
      />
    </div>
  )
}
