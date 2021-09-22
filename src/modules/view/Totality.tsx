import 'twin.macro'

import React, {useEffect, useMemo} from 'react'
import loadable from '@loadable/component'

import {AppContext, createStore} from 'modules/store'

import {useCombinedConfig} from 'modules/core'
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
  const {extensions, options, scope, code} = useCombinedConfig(props)

  // Creates a separate store for each totality editor instance.
  const store = useMemo(() => createStore(), [])
  const {dispatch} = store

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
