import MonacoEditor from '@monaco-editor/react'
import {useAtom} from 'jotai'

import {contextAtom, useApp} from 'modules/context'
import {useCallback, useEffect, useRef, useState} from 'react'

import {EditorContext, IMonacoOption} from '../../@types/EditorContext'

interface Props {
  value: string
  onChange: (value: string) => void
  onSetup?: () => void
  options?: IMonacoOption
}

type SetupHookConfig = {onSetup?: () => void}

export function useSetupEditorExtension({onSetup}: SetupHookConfig) {
  const [{handlers}] = useAtom(contextAtom)

  const [editorContext, setEditorContext] = useState<EditorContext | null>(null)

  const register = (context: EditorContext) => setEditorContext(context)

  const setupHandlers = handlers['editor.setup']

  useEffect(() => {
    async function setup() {
      if (!editorContext) return

      // Setup the editor.
      for (const handle of setupHandlers) {
        console.time(`setup handler ${handle.ext}`)
        await handle.handler(editorContext)
        console.timeEnd(`setup handler ${handle.ext}`)
      }

      onSetup?.()
    }

    setup()
  }, [editorContext, setupHandlers])

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
