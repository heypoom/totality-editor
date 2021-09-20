import {useStore} from 'modules/store'
import {isActiveRendererPanel} from 'modules/panel'

export function useRenderer() {
  const store = useStore('renderer', 'options', 'layout')
  const {options, layout, dispatch} = store

  const panelId = layout.panels.find(isActiveRendererPanel)?.id ?? ''
  const renderer = store.renderer.renderers[panelId] ?? {}
  const {state} = renderer

  return {options, state, dispatch}
}
