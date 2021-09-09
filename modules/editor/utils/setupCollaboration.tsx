// import {MonacoBinding} from 'y-monaco'

import {syncManager} from 'modules/sync/SyncController'

import {IEditorContext} from '../../../@types/IMonaco'

export async function setupCollaboration({monaco, editor}: IEditorContext) {
  console.log('> Setting up live collaboration...')

  const {doc, rtc} = syncManager

  const syncedText = doc?.getText('editor')
  const model = editor.getModel()
  const editors = new Set([editor])

  if (!model) return

  const {MonacoBinding} = await import('y-monaco')

  if (typeof window === 'undefined') return

  const binding = new MonacoBinding(syncedText, model, editors, rtc?.awareness)

  // @ts-ignore
  window.monacoYBinding = binding
}
