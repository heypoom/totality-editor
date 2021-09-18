import 'twin.macro'

import React, {useEffect} from 'react'

import {Editor} from 'modules/editor'
import {RendererPanel} from 'modules/panel/RendererPanel'
import {AppContext, store, useStore} from 'modules/store'

import {EditorOptions, Extension, OptionsFromExtensions} from '@types'
import {WindowManagerView} from './WindowManagerView'

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  extensions?: E
  options?: Partial<OptionsFromExtensions<E>> & EditorOptions
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
