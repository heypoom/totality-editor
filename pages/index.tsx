import React, {useMemo, useState} from 'react'
import tw from 'twin.macro'
import {atom, useAtom} from 'jotai'
import {debounce} from 'lodash'

import {Editor} from '../modules/editor/Editor'
import {tsTranspiler} from '../modules/runner/TypescriptManager'
import {useEffect} from 'react'
import {jsRunner} from '../modules/runner/Evaluator'
import {LinkedListVisualizer} from '../modules/visualizer/LinkedListVisualizer'

const Title = tw.h1`text-4xl`

const codeAtom = atom('const a = 1')
const tsAtom = atom('')

const useDebounce = (fn: (...args: any[]) => void, time = 100) =>
  useMemo(() => debounce(fn, time), [])

export default function Home() {
  const [code, setCode] = useAtom(codeAtom)
  const [tsCode, setTsCode] = useAtom(tsAtom)
  const [vars, setVars] = useState({})

  const transpile = useDebounce((code: string) => {
    tsTranspiler.transpile(code).then(setTsCode)
  }, 100)

  const save = useDebounce((code: string) => {
    localStorage.setItem('code.content', code)
  }, 1000)

  useEffect(() => {
    transpile(code)
    save(code)
  }, [code, transpile, save])

  useEffect(() => {
    jsRunner.run(tsCode)

    setVars(jsRunner.getTracked())
  }, [tsCode])

  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <div tw="flex">
        <div tw="max-w-5xl mx-auto py-6 w-full">
          <Editor value={code} onChange={setCode} />
        </div>
        <div tw="w-full">
          <LinkedListVisualizer vars={vars} />

          <code tw="text-sm text-pink-50">
            <pre>{JSON.stringify(vars, null, 2)}</pre>
          </code>
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
