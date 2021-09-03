import React, {useMemo, useState} from 'react'
import tw from 'twin.macro'
import {atom, useAtom} from 'jotai'
import {debounce, divide} from 'lodash'
import {useEffect} from 'react'
import loadable from '@loadable/component'

import {Editor} from '../modules/editor/Editor'
import {jsRunner} from '../modules/runner/Evaluator'
import {tsTranspiler} from '../modules/runner/TypescriptManager'
import {CircleLinkedListExample} from '../modules/sample/circle-linked-list'
import {useDebounce} from '../modules/utils/useDebounce'

const LinkedListVisualizer = loadable(async () => {
  const {LinkedListVisualizer} = await import(
    '../modules/visualizer/LinkedListVisualizer'
  )

  return LinkedListVisualizer
})

const Title = tw.h1`text-4xl`

const codeAtom = atom('')
const tsAtom = atom('')

const saveKey = 'code.content'

function renderError(error: Error | string) {
  if (typeof error === 'string') return error
  if (error instanceof Error) return `${error.name} - ${error.message}`

  return null
}

export default function Home() {
  const [code, setCode] = useAtom(codeAtom)
  const [tsCode, setTsCode] = useAtom(tsAtom)
  const [vars, setVars] = useState({})
  const [error, setError] = useState<Error | null>(null)

  const transpile = useDebounce((code: string) => {
    tsTranspiler.transpile(code).then((tsCode) => {
      // @ts-ignore
      window.tsCode = tsCode
      setTsCode(tsCode)
    })
  }, 100)

  const save = useDebounce((code: string) => {
    localStorage.setItem(saveKey, code)
  }, 1000)

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
    async function rerun() {
      try {
        await jsRunner.run(tsCode)

        setVars(jsRunner.getTracked())
        setError(null)
      } catch (err) {
        // @ts-ignore
        window.error = err

        setError(err)
      }
    }

    rerun()
  }, [tsCode])

  function onSetup() {
    setCode(localStorage.getItem(saveKey) || CircleLinkedListExample)
  }

  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <div tw="flex">
        <div tw="max-w-5xl mx-auto py-6 w-full">
          <Editor value={code} onChange={setCode} onSetup={onSetup} />
        </div>
        <div tw="w-full">
          {error && (
            <div tw="p-2 bg-red-500 text-white shadow-lg m-2">
              {renderError(error)}
            </div>
          )}

          <LinkedListVisualizer vars={vars} />
        </div>
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
