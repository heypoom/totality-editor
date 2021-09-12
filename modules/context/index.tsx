import {atom, useAtom} from 'jotai'
import {atomWithImmer} from 'jotai/immer'

import {Extension} from '../../@types/Extension'
import {
  App,
  AppContext as IAppContext,
  ExtensionEventHandlers,
  SetupOptions,
} from '../../@types/AppContext'

const defaultContext: IAppContext = {
  extensions: [],

  handlers: {
    'editor.setup': [],
  },

  options: {},
}

export const contextAtom = atomWithImmer(defaultContext)

export const useApp = (): App => {
  const [context, setContext] = useAtom(contextAtom)

  function addHandler<T extends keyof ExtensionEventHandlers>(
    type: T,
    handler: ExtensionEventHandlers[T],
    ext: string
  ) {
    setContext((c) => {
      c.handlers[type].push({handler, ext})
      return c
    })
  }

  async function register(extension: Extension) {
    console.time(`register extension ${extension.id}`)

    console.log('Register > Context:', JSON.stringify(context))

    await extension.setup({
      editor: {
        setup(handler) {
          addHandler('editor.setup', handler, extension.id)
        },
      },

      options: context.options,
    })

    console.timeEnd(`register extension ${extension.id}`)
  }

  async function setup({options}: SetupOptions) {
    console.log('Options set:', options)

    setContext((c) => ({...c, options}))
  }

  return {setup, register}
}
