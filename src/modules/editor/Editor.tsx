import {nanoid} from 'nanoid'
import React, {useMemo} from 'react'
import MonacoEditor from '@monaco-editor/react'

import {useStore} from 'modules/store'

import {intoEditorOptions} from '.'
import {LoadingSkeleton} from './LoadingSkeleton'
import {defaultMonacoOptions} from './constants/monacoOption'
import {useSetupEditorHooks} from './hooks/useSetupEditorHooks'

import {IMonacoOption} from '@types'

export const Editor: React.FC = () => {
  const {register} = useSetupEditorHooks()
  const {code, options, dispatch} = useStore('code', 'options')

  const monacoOption: IMonacoOption = useMemo(() => {
    return {...defaultMonacoOptions, ...intoEditorOptions(options ?? {})}
  }, [options])

  const defaultPath = options['file.path']
  const path = useMemo(() => defaultPath ?? `${nanoid()}.tsx`, [defaultPath])

  const height = options['layout.height'] ?? '100vh'

  const handleChange = (code?: string) => dispatch('code/set', code ?? '')

  return (
    <MonacoEditor
      path={path}
      value={code}
      height={height}
      options={monacoOption}
      onChange={handleChange}
      theme={monacoOption.theme}
      loading={<LoadingSkeleton />}
      language={monacoOption.language}
      onMount={(editor, monaco) => register({editor, monaco})}
    />
  )
}
