import React from 'react'
import tw from 'twin.macro'

import {Editor} from '../modules/editor/Editor'

const Title = tw.h1`text-4xl`

export default function Home() {
  return (
    <div tw="min-h-screen bg-gray-900 text-white">
      <div tw="max-w-5xl mx-auto py-6">
        <div tw="bg-red-500 px-4 py-2 text-center mb-6">
          <Title>Hello</Title>
        </div>

        <Editor />
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
