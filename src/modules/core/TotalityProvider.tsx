import React, {useContext} from 'react'

import {ITotalityProps} from 'modules/view/Totality'

import {Extension, OptionsOf} from '@types'

/** Configuration that can be shared across multiple editors. */
export type SharedTotalityProps<E extends readonly Extension<any, any>[]> =
  Omit<ITotalityProps<E>, 'code' | 'path'>

export const SharedConfigContext = React.createContext<
  SharedTotalityProps<any>
>({})

export const TotalityProvider = <E extends readonly Extension<any>[]>(
  props: SharedTotalityProps<E> & {children: React.ReactNode}
) => {
  const {children, ...config} = props

  return (
    <SharedConfigContext.Provider value={config}>
      {children}
    </SharedConfigContext.Provider>
  )
}

/** Use the totality configuration, combined from the provider and local level. */
export function useCombinedConfig<E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
): ITotalityProps<E> {
  const shared = useContext(SharedConfigContext) ?? {}

  const extensions = Array.from(
    new Set([...shared?.extensions, ...(props?.extensions ?? [])])
  ) as unknown as E

  const options = {...shared?.options, ...props?.options} as OptionsOf<E>

  // Override the file path.
  if (props.path) options['file.path'] = props.path

  return {
    ...props,
    scope: {...shared?.scope, ...props.scope},
    extensions,
    options,
  }
}
