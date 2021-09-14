import {useMemo} from 'react'
import MonacoEditor from '@monaco-editor/react'

import {IMonacoOption} from '@types'

import {intoEditorOptions} from '.'
import {defaultMonacoOptions} from './constants/monacoOption'
import {useSetupEditorHooks} from './hooks/useSetupEditorHooks'
import {useStore} from 'modules/store'

interface Props {
  onChange?(): void
}

export const Editor: React.FC<Props> = (props) => {
  const {register} = useSetupEditorHooks()
  const {code, options, dispatch} = useStore('code', 'options')

  const config: IMonacoOption = useMemo(() => {
    return {...defaultMonacoOptions, ...intoEditorOptions(options ?? {})}
  }, [options])

  function handleChange(code?: string) {
    dispatch('code/set', code ?? '')

    props.onChange?.()
  }

  return (
    <MonacoEditor
      value={code}
      height="100vh"
      options={config}
      theme={config.theme}
      onChange={handleChange}
      defaultLanguage={config.language}
      onMount={(editor, monaco) => register({editor, monaco})}
    />
  )
}
