import 'twin.macro'
import React from 'react'

import {ITotalityProps, Totality} from './Totality'

import {Extension} from '@types'

interface Props {
  width: string
  height: string
}

export const TotalityWindow = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E> & Props
) => {
  const {width, height, options, ...totalityProps} = props

  if (options) options['layout.height'] = height

  return (
    <div
      tw="p-2 bg-gray-900 rounded-lg shadow-carbon overflow-hidden"
      css={{background: '#21222d', width: props.width}}
    >
      <div tw="flex p-1 pb-2">
        <div tw="w-3 h-3 bg-red-400 rounded-lg shadow-2xl mr-2" />
        <div tw="w-3 h-3 bg-yellow-400 rounded-lg shadow-2xl mr-2" />
        <div tw="w-3 h-3 bg-green-400 rounded-lg shadow-2xl" />
      </div>

      <Totality {...totalityProps} options={options} />
    </div>
  )
}
