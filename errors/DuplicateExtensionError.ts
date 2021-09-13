import {CustomError} from 'ts-custom-error'

import {Extension} from '@types'

export class DuplicateExtensionError extends CustomError {
  constructor(extension: Extension) {
    const title = extension.meta?.title ?? 'Untitled'
    const message = `Extension ${extension.id} (${title}) is already loaded.`

    super(message)
  }
}
