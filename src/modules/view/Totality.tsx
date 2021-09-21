import 'twin.macro'

import React, {useEffect} from 'react'
import loadable from '@loadable/component'

import {AppContext, store, useStore} from 'modules/store'
import {TotalityErrorBoundary} from 'modules/common/ErrorBoundary'

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
  code?: string
}

const WindowManagerView = loadable(
  async () => (await import('./WindowManagerView')).WindowManagerView,
  {fallback: <div>loading</div>}
)

export const Totality = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
) => {
  const {extensions, options, code} = props

  const {dispatch} = useStore()

  // Sync editor configuration.
  useEffect(() => dispatch('config/set', options), [options, dispatch])

  // Sync initial code.
  useEffect(() => {
    if (code) dispatch('code/set', code)
  }, [code, dispatch])

  // Sync active extensions.
  useEffect(() => {
    dispatch('extension/use-all', (extensions ?? []) as Extension[])
  }, [extensions, dispatch])

  // Setup the editor.
  useEffect(() => dispatch('core/setup'), [dispatch])

  return (
    <TotalityErrorBoundary>
      <AppContext.Provider value={store}>
        <WindowManagerView />
      </AppContext.Provider>
    </TotalityErrorBoundary>
  )
}
