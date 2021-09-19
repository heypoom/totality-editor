export function createTypeScriptWorker(): Worker | null {
  if (typeof Worker === 'undefined') return null
  if (typeof Blob === 'undefined') return null

  const source = `
		importScripts('${window.location.origin}/ts/typescript.js')

		onmessage = ({data: source}) => {
			const transpiled = ts.transpile(source)

			postMessage(transpiled)
		}
	`

  const sourceBlob = new Blob([source], {type: 'text/javascript'})
  const sourceUrl = window.URL.createObjectURL(sourceBlob)
  const worker = new Worker(sourceUrl)

  return worker
}

export class TypeScriptCompiler {
  worker = createTypeScriptWorker()

  transpile(source: string): Promise<string> {
    return new Promise((resolve) => {
      if (!this.worker) return resolve('')

      this.worker.postMessage(source)
      this.worker.onmessage = ({data}) => resolve(data)
    })
  }

  cleanup() {
    this.worker?.terminate()
  }
}
