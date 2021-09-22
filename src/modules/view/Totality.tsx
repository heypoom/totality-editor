import 'twin.macro'

import React, {useEffect, useMemo} from 'react'
import loadable from '@loadable/component'

import {AppContext, createStore} from 'modules/store'

import {useCombinedConfig} from 'modules/core'
import {TotalityErrorBoundary} from 'modules/common/ErrorBoundary'

import {OptionsOf, Extension, LayoutPreset} from '@types'

export interface ITotalityProps<E extends readonly Extension<any, any>[]> {
  /** Extensions to add functionality to the editor. */
  extensions?: E

  /** Options to customize the editor. */
  options?: OptionsOf<E>

  /** Code displayed in the current editor. */
  code?: string

  /** File name of the current editor. */
  path?: string

  /** Persists the editor's content in the local storage. */
  persist?: boolean

  /** Injects these variables into the global runner scope. */
  scope?: Record<string, unknown>

  /** Height of the current window */
  height?: string

  /** Layout preset to use. */
  layout?: LayoutPreset
}

const WindowManagerView = loadable(
  async () => (await import('./WindowManagerView')).WindowManagerView,
  {fallback: <div />}
)

export const Totality = <E extends readonly Extension<any>[]>(
  props: ITotalityProps<E>
) => {
  const {extensions, options, scope, code, layout} = useCombinedConfig(props)

  // Creates a separate store for each totality editor instance.
  const store = useMemo(() => createStore(), [])
  const {dispatch} = store

  // Sync editor configuration.
  useEffect(() => dispatch('config/set', options), [options, dispatch])

  // Sync editor layout preset.
  useEffect(() => dispatch('layout/set', {preset: layout}), [layout, dispatch])

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
