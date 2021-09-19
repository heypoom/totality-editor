import 'twin.macro'

import React, {useEffect} from 'react'
import loadable from '@loadable/component'

import {AppContext, store, useStore} from 'modules/store'

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

const WindowManagerView = loadable(
  async () => (await import('./WindowManagerView')).WindowManagerView,
  {fallback: <div>loading</div>}
)

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
