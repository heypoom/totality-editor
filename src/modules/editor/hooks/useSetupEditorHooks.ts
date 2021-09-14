import {useEffect, useState} from 'react'

import {useStore} from 'modules/store'

import {EditorContext} from '@types'

type SetupHookConfig = {onSetup?: () => void}

export function useSetupEditorHooks({onSetup}: SetupHookConfig = {}) {
  const {hooks} = useStore('hooks')

  const [monacoContext, setMonacoContext] = useState<EditorContext | null>(null)

  const register = (context: EditorContext) => setMonacoContext(context)

  const setupHooks = hooks['editor.setup']

  useEffect(() => {
    async function setup() {
      if (!monacoContext) return

      // Setup the editor.
      for (const hook of setupHooks) {
        console.time(`editor hook ${hook.ext}`)
        await hook.handler(monacoContext)
        console.timeEnd(`editor hook ${hook.ext}`)
      }

      onSetup?.()
    }

    setup()
  }, [monacoContext, setupHooks])

  return {register}
}
