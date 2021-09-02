export function createTypeScriptWorker(): string {
  if (typeof Blob === 'undefined') return ''

  const workerSource = `
			importScripts('https://unpkg.com/typescript@latest')

			const load = sourceUrl => {
				const xhr = new XMLHttpRequest()
				if (!xhr) return ''
				xhr.open('GET', sourceUrl, false)
				xhr.overrideMimeType && xhr.overrideMimeType('text/plain')
				xhr.send(null)
				return xhr.status == 200 ? xhr.responseText : ''
			}

			onmessage = ({data: [sourceUrl, sourceCode]}) => {
				const raw = sourceCode ? sourceCode : load(sourceUrl)
				const transpiled = ts.transpile(raw)
				postMessage(transpiled)
			}
		`

  const blob = new Blob([workerSource], {type: 'text/javascript'})

  return window.URL.createObjectURL(blob)
}

export class TypeScriptTranspiler {
  workerUrl = createTypeScriptWorker()
  worker: Worker | null = null

  transpile(source: string): Promise<string> {
    // console.log('[TS] Transpiling:', source?.slice(0, 20))

    return new Promise((resolve) => {
      if (typeof Worker === 'undefined') return resolve('')

      if (!this.worker) this.worker = new Worker(this.workerUrl)

      this.worker.postMessage([null, source])

      this.worker.onmessage = ({data}) => {
        // console.log('[TS] Transpiled:', data)

        resolve(data)
      }
    })
  }
}

export const tsTranspiler = new TypeScriptTranspiler()
