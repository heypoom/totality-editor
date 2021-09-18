import {EditorContext} from '@types'

export type EditorSetupHook = (context: EditorContext) => Promise<void> | void

export interface ExtensionEventHooks {
  'editor.setup': EditorSetupHook
}

export type ExtensionHooksMap = {
  [K in keyof ExtensionEventHooks]: {
    ext: string
    handler: ExtensionEventHooks[K]
  }[]
}

export type HookPayload<T extends keyof ExtensionEventHooks> = {
  type: T
  handler: ExtensionEventHooks[T]
  extensionId: string
}

export interface HooksEvents {
  'hooks/add': HookPayload<keyof ExtensionEventHooks>
}
