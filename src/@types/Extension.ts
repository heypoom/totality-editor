import {ExtensionContext, CoreOptions} from '@types'

export interface Extension<Config = Record<string, any>, Instance = unknown> {
  id: string
  meta?: ExtensionMeta
  enabled?: boolean
  options?: CoreOptions
  defaultConfig?: Config

  setup(
    context: ExtensionContext<Config>
  ): Promise<void> | void | Promise<Instance>

  cleanup?(context: ExtensionContext<Config>): Promise<void> | void
}

export type ExtensionTag = 'mode' | 'theme' | string

interface ExtensionMeta {
  title: string
  description?: string
  tags: ExtensionTag[]
}
