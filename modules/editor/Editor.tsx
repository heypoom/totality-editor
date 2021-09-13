import MonacoEditor from '@monaco-editor/react'
import {useStore} from 'modules/store'

import {useEffect, useState} from 'react'

import {EditorContext, IMonacoOption} from '@types'

interface Props {
  value: string
  onChange: (value: string) => void
  onSetup?: () => void
  options?: IMonacoOption
}

type SetupHookConfig = {onSetup?: () => void}

export function useSetupEditorExtension({onSetup}: SetupHookConfig) {
  const {hooks} = useStore('hooks')

  const [monacoContext, setMonacoContext] = useState<EditorContext | null>(null)

  const register = (context: EditorContext) => setMonacoContext(context)

  const setupHooks = hooks['editor.setup']

  useEffect(() => {
    async function setup() {
      if (!monacoContext) return

      // Setup the editor.
      for (const hook of setupHooks) {
        console.time(`editor hook ${hook.ext}`)
        await hook.handler(monacoContext)
        console.timeEnd(`editor hook ${hook.ext}`)
      }

      onSetup?.()
    }

    setup()
  }, [monacoContext, setupHooks])

  return {register}
}

export const defaultMonacoOptions: IMonacoOption = {
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

export const Editor: React.FC<Props> = (props) => {
  const {value, onChange, onSetup} = props

  const {register} = useSetupEditorExtension({onSetup})

  const options: IMonacoOption = {
    ...defaultMonacoOptions,
    ...props.options,
  }

  return (
    <MonacoEditor
      height="100vh"
      theme="vs-dark"
      defaultLanguage="typescript"
      {...{value, options}}
      onChange={(code) => onChange(code ?? '')}
      onMount={(editor, monaco) => register({editor, monaco})}
    />
  )
}
