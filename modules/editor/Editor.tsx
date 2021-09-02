import MonacoEditor, {Monaco} from '@monaco-editor/react'

import {MonacoManager} from './MonacoManager'

import {IMonacoOption} from '../../@types/IMonaco'

interface Props {
  value: string
  onChange: (value: string) => void
  onSetup?: (manager: MonacoManager) => void
}

export const Editor: React.FC<Props> = (props) => {
  const {value, onChange, onSetup = () => {}} = props

  const options: IMonacoOption = {
    selectOnLineNumbers: true,
    fontSize: 21,
    fontFamily: '"JetBrains Mono", monospace',
    fontLigatures: true,
    tabSize: 2,
    detectIndentation: false,
    insertSpaces: true,
    minimap: {enabled: false},
    cursorStyle: 'block',
  }

  return (
    <div>
      <MonacoEditor
        height="100vh"
        theme="vs-dark"
        defaultLanguage="typescript"
        {...{value, options}}
        onChange={(code) => onChange(code ?? '')}
        onMount={(editor, monaco) => {
          const manager = new MonacoManager({monaco, editor})
          manager.setup().then(() => onSetup(manager))
        }}
      />
    </div>
  )
}
