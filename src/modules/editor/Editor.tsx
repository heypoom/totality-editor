import MonacoEditor from '@monaco-editor/react'

import {IMonacoOption} from '@types'

import {defaultMonacoOptions} from './constants/monacoOption'
import {useSetupEditorHooks} from './hooks/useSetupEditorHooks'

interface Props {
  value: string
  onChange: (value: string) => void
  onSetup?: () => void
  options?: IMonacoOption
}

export const Editor: React.FC<Props> = (props) => {
  const {value, onChange, onSetup} = props

  const {register} = useSetupEditorHooks({onSetup})

  const options: IMonacoOption = {...defaultMonacoOptions, ...props.options}

  return (
    <MonacoEditor
      height="100vh"
      {...{value, options}}
      theme={options.theme}
      defaultLanguage={options.language}
      onChange={(code) => onChange(code ?? '')}
      onMount={(editor, monaco) => register({editor, monaco})}
    />
  )
}
