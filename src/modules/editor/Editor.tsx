import {useMemo} from 'react'
import MonacoEditor from '@monaco-editor/react'

import {useStore} from 'modules/store'

import {intoEditorOptions} from '.'
import {defaultMonacoOptions} from './constants/monacoOption'
import {useSetupEditorHooks} from './hooks/useSetupEditorHooks'

import {IMonacoOption} from '@types'

export const Editor: React.FC = () => {
  const {register} = useSetupEditorHooks()
  const {code, options, dispatch} = useStore('code', 'options')

  const config: IMonacoOption = useMemo(() => {
    return {...defaultMonacoOptions, ...intoEditorOptions(options ?? {})}
  }, [options])

  const height = options['layout.height'] ?? '100vh'

  const handleChange = (code?: string) => dispatch('code/set', code ?? '')

  return (
    <MonacoEditor
      value={code}
      height={height}
      options={config}
      theme={config.theme}
      onChange={handleChange}
      defaultLanguage={config.language}
      onMount={(editor, monaco) => register({editor, monaco})}
    />
  )
}
