import 'twin.macro'

import React, {useEffect} from 'react'

import {AppContext, store, useStore} from 'modules/store'

import {WindowManagerView} from './WindowManagerView'

import {
  EditorOptions,
  Extension,
  OptionsFromExtensions,
  TotalityOptions,
} from '@types'

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  extensions?: E
  options?: Partial<OptionsFromExtensions<E>> &
    EditorOptions &
    Partial<TotalityOptions>
}

export const Totality = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
) => {
  const {extensions, options} = props

  const {dispatch} = useStore()

  useEffect(() => {
    dispatch('config/set', options)
  }, [options, dispatch])

  useEffect(() => {
    dispatch('extension/use-all', (extensions ?? []) as Extension[])
  }, [extensions, dispatch])

  useEffect(() => {
    dispatch('core/setup')
  }, [dispatch])

  return (
    <AppContext.Provider value={store}>
      <WindowManagerView />
    </AppContext.Provider>
  )
}
