import 'twin.macro'
import React from 'react'

import {ITotalityProps, Totality} from './Totality'

import {Extension} from '@types'
import {useCombinedConfig} from 'modules/core'

interface Props {
  width: string
  height: string
}

export const TotalityWindow = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E> & Props
) => {
  const {width, ...totalityProps} = props

  // Get the combined configuration.
  const {options, height} = useCombinedConfig(totalityProps)

  // Override the background color of the window decoration.
  const background = options?.['theme.background'] ?? '#1e1e1e'

  return (
    <div
      css={{background, width, minHeight: height}}
      tw="p-2 bg-gray-900 rounded-lg shadow-carbon"
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
