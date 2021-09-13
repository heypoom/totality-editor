import React, {useEffect, useMemo} from 'react'
import loadable from '@loadable/component'

import {Editor} from 'modules/editor/Editor'
import {useDebounce} from 'modules/utils/useDebounce'
import {AppContext, store, useStore} from 'modules/store'
import {CircleLinkedListExample} from 'modules/sample/circle-linked-list'

import {Extension} from '../../@types/Extension'
import {IMonacoOption} from '../../@types/EditorContext'
import {OptionsFromExtensions} from '../../@types/OptionsFromExtensions'

export type EditorOptions = {
  [K in keyof IMonacoOption as `editor.${K}`]: IMonacoOption[K]
}

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  extensions?: E
  options?: OptionsFromExtensions<E> & EditorOptions
}

const LinkedListVisualizer = loadable(async () => {
  const {LinkedListVisualizer} = await import(
    '../visualizer/LinkedListVisualizer'
  )

  return LinkedListVisualizer
})

const saveKey = 'code.content'

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
  const transpile = useDebounce(() => dispatch('runner/compile'), 100)

  const save = useDebounce((code: string) => {
    localStorage.setItem(saveKey, code)
  }, 1000)

  useEffect(() => {
    dispatch('extension/use-all', (extensions ?? []) as Extension[])
  }, [extensions, dispatch])

  useEffect(() => {
    if (!options) return

    dispatch('config/set', options)
  }, [options, dispatch])

  useEffect(() => {
    dispatch('runner/setup')
  }, [dispatch])

  useEffect(() => {
    transpile(code)
    save(code)
  }, [code, transpile, save])

  useEffect(() => {
    run()
  }, [run, runner.compiled])

  function onSetup() {
    const sample = localStorage.getItem(saveKey) || CircleLinkedListExample

    dispatch('code/set', sample)
  }

  const monacoOptions = useMemo(() => {
    return intoEditorOptions(options ?? {})
  }, [options])

  return (
    <AppContext.Provider value={store}>
      <div tw="flex">
        <div tw="max-w-5xl mx-auto py-6 w-full">
          <Editor
            value={code}
            onChange={(code) => dispatch('code/set', code)}
            onSetup={onSetup}
            options={monacoOptions}
          />
        </div>

        <div tw="w-full">
          {runner.error && (
            <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
              {renderError(runner.error)}
            </div>
          )}

          <LinkedListVisualizer vars={runner.variables} />
        </div>

        <style>
          {`
          .JSXElement.JSXBracket, .JSXElement.JSXText {
            color: #fff;
          }

          .JSXElement.JSXIdentifier {
            color: #ff79c6;
          }
        `}
        </style>
      </div>
    </AppContext.Provider>
  )
}
