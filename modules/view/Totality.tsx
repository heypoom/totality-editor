import 'twin.macro'
import loadable from '@loadable/component'
import React, {useEffect, useMemo} from 'react'

import {
  Extension,
  OptionsFromExtensions,
  EditorOptions,
  IMonacoOption,
} from '@types'

import {Editor} from 'modules/editor/Editor'
import {useDebounce} from 'utils/useDebounce'
import {AppContext, store, useStore} from 'modules/store'

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  extensions?: E
  options?: Partial<OptionsFromExtensions<E> & EditorOptions>
}

const LinkedListVisualizer = loadable(async () => {
  const {LinkedListVisualizer} = await import(
    'modules/visualizer/LinkedListVisualizer'
  )

  return LinkedListVisualizer
})

function renderError(error: Error | string) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return `${error.name} - ${error.message}`

  return null
}

const intoEditorOptions = (options: Record<string, any>): IMonacoOption =>
  Object.fromEntries(
    Object.entries(options)
      .filter(([key]) => key.startsWith('editor.'))
      .map(([k, v]) => [k.replace('editor.', ''), v])
  )

export const Totality = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
) => {
  const {extensions, options} = props

  const {code, runner, dispatch} = useStore('code', 'runner')

  const run = useDebounce(() => dispatch('runner/run'), 50)
  const save = useDebounce(() => dispatch('code/save'), 1000)
  const transpile = useDebounce(() => dispatch('runner/compile'), 100)

  const setCode = (code: string) => dispatch('code/set', code)

  useEffect(() => {
    dispatch('config/set', options)
  }, [options, dispatch])

  useEffect(() => {
    dispatch('extension/use-all', (extensions ?? []) as Extension[])
  }, [extensions, dispatch])

  useEffect(() => {
    dispatch('core/setup')
  }, [dispatch])

  useEffect(() => {
    save(code)
    transpile(code)
  }, [code, transpile, save])

  useEffect(() => {
    run()
  }, [run, runner.compiled])

  const monacoOptions = useMemo(() => {
    return intoEditorOptions(options ?? {})
  }, [options])

  return (
    <AppContext.Provider value={store}>
      <div tw="flex">
        <div tw="max-w-5xl mx-auto py-6 w-full">
          <Editor value={code} onChange={setCode} options={monacoOptions} />
        </div>

        <div tw="w-full">
          {runner.error && (
            <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
              {renderError(runner.error)}
            </div>
          )}

          <LinkedListVisualizer vars={runner.variables} />
        </div>
      </div>
    </AppContext.Provider>
  )
}
