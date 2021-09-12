import {atom, useAtom} from 'jotai'
import {useApp} from 'modules/context'
import {jsRunner} from 'modules/runner/Evaluator'
import {tsTranspiler} from 'modules/runner/TypescriptManager'
import {CircleLinkedListExample} from 'modules/sample/circle-linked-list'
import {useDebounce} from 'modules/utils/useDebounce'
import React, {useState, useEffect, useMemo} from 'react'
import tw from 'twin.macro'
import loadable from '@loadable/component'
import {UnionToIntersection} from 'type-fest'

import {Extension} from '../../@types/Extension'
import {Editor} from 'modules/editor/Editor'
import {IMonacoOption} from '../../@types/EditorContext'

/** Construct the options object from the extensions. */
export type OptionsFromExtensions<E extends readonly Extension<any, any>[]> =
  UnionToIntersection<
    {
      [K in keyof E]: E[K] extends Extension<infer Config> ? Config : never
    }[number]
  >

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

const tsAtom = atom('')
const codeAtom = atom('')
const varsAtom = atom({})
const errorsAtom = atom<Error | null>(null)

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

  const [code, setCode] = useAtom(codeAtom)
  const [tsCode, setTsCode] = useAtom(tsAtom)
  const [vars, setVars] = useAtom(varsAtom)
  const [error, setError] = useAtom(errorsAtom)

  const {setup, register} = useApp()

  const transpile = useDebounce((code: string) => {
    tsTranspiler.transpile(code).then((tsCode) => {
      // @ts-ignore
      window.tsCode = tsCode
      setTsCode(tsCode)
    })
  }, 100)

  useEffect(() => {
    async function registerAll() {
      console.time('register extension')

      for (const extension of extensions!) {
        await register(extension)
      }

      console.timeEnd('register extension')
    }

    registerAll()
  }, [extensions])

  const save = useDebounce((code: string) => {
    localStorage.setItem(saveKey, code)
  }, 1000)

  const exec = useDebounce(async (code: string) => {
    try {
      await jsRunner.run(code)

      setVars(jsRunner.getTracked())
      setError(null)
    } catch (error) {
      // @ts-ignore
      window.error = error

      if (error instanceof Error) {
        console.warn('[runner::error]', error.message)
        setError(error)
      }
    }
  }, 50)

  useEffect(() => {
    if (!options) return

    setup({options})
  }, [options])

  useEffect(() => {
    jsRunner.on('track', () => {
      setVars(jsRunner.getTracked())
    })
  }, [])

  useEffect(() => {
    transpile(code)
    save(code)
  }, [code, transpile, save])

  useEffect(() => {
    exec(tsCode)
  }, [exec, tsCode])

  function onSetup() {
    setCode(localStorage.getItem(saveKey) || CircleLinkedListExample)
  }

  const monacoOptions = useMemo(() => {
    return intoEditorOptions(options ?? {})
  }, [options])

  return (
    <div tw="flex">
      <div tw="max-w-5xl mx-auto py-6 w-full">
        <Editor
          value={code}
          onChange={setCode}
          onSetup={onSetup}
          options={monacoOptions}
        />
      </div>

      <div tw="w-full">
        {error && (
          <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
            {renderError(error)}
          </div>
        )}

        <LinkedListVisualizer vars={vars} />
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
  )
}
