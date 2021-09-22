import {createExtension} from 'utils'

export const TypeScriptExtension = createExtension({
  id: 'language.typescript',

  async setup(app) {
    const source = `
			declare function track<T>(id: string, val: T): T
			declare function tracks(vars: Record<string, any>): void

			declare function tick(): Promise<void>
			declare function delay(ms: number): Promise<void>
		`

    app.editor.addTypeDefinition('totality-runtime', source)
  },
})
