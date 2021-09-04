import {CustomError} from 'ts-custom-error'

export class ExecutionAbortedError extends CustomError {
  message = 'execution aborted'
}

export class DelayAbortedError extends ExecutionAbortedError {
  message = 'delay aborted'

  static Promise() {
    return Promise.reject(new this())
  }
}
