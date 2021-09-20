import {createExtension} from 'utils'

export const TypeScriptExtension = createExtension({
  id: 'language.typescript',

  async setup(app) {
    // Add TypeScript type definitions for the totality runtime.
    app.editor.setup(async (context) => {
      const {monaco} = context
      const tsd = monaco.languages.typescript.typescriptDefaults

      const source = `
				declare function track<T>(id: string, val: T): T
				declare function tracks(vars: Record<string, any>): void

				declare function tick(): Promise<void>
				declare function delay(ms: number): Promise<void>
			`

      tsd.addExtraLib(source, 'totality-runtime.d.ts')
    })
  },
})
