import 'twin.macro'

import React, {useEffect} from 'react'

import {Editor} from 'modules/editor'
import {PreviewPanel} from 'modules/panel/PreviewPanel'
import {AppContext, store, useStore} from 'modules/store'

import {EditorOptions, Extension, OptionsFromExtensions} from '@types'

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  extensions?: E
  options?: Partial<OptionsFromExtensions<E>> & EditorOptions
}

export const Totality = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
) => {
  const {extensions, options} = props

  const {dispatch} = useStore('code', 'runner')

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
      <div tw="flex">
        <div tw="max-w-5xl mx-auto py-6 w-full">
          <Editor />
        </div>

        <div tw="w-full">
          <PreviewPanel />
        </div>
      </div>
    </AppContext.Provider>
  )
}
