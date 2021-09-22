import 'twin.macro'

import React, {useEffect} from 'react'
import loadable from '@loadable/component'

import {AppContext, store, useStore} from 'modules/store'

import {useCombinedConfig} from 'modules/core/TotalityProvider'
import {TotalityErrorBoundary} from 'modules/common/ErrorBoundary'

import {OptionsOf, Extension} from '@types'

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  extensions?: E
  options?: OptionsOf<E>
  code?: string
  path?: string
  scope?: Record<string, unknown>
}

const WindowManagerView = loadable(
  async () => (await import('./WindowManagerView')).WindowManagerView,
  {fallback: <div />}
)

export const Totality = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
) => {
  const {extensions, options, scope, code, path} = useCombinedConfig(props)
  console.log('Combined Config:', {extensions, options, scope, code})

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

  // Inject global variables into the runner.
  useEffect(() => dispatch('runner/inject-global', scope), [scope, dispatch])

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
