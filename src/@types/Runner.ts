import {FrameListener, TrackListener} from '@types'

export interface Run {
  id: string | null

  error: Error | null

  isAsync: boolean
  isRunning: boolean
  isAborted: boolean

  latestCompleteRunId: string | null
}

export interface RunHandlers {
  /** Cleanup handlers are used for abort and when execution finishes. */
  cleanup: () => void | Promise<void>

  /** Frame handlers run when next animation frame is ready.
   * All frame handlers must run faster than 4ms. */
  frame: FrameListener

  /** Track handlers run when a variable is tracked. */
  track: TrackListener
}

export type RunHandlerMap = {
  [K in keyof RunHandlers]: RunHandlers[K][]
}

export interface RunnerGlobal {
  console: Console
  setTimeout: typeof setTimeout

  tick(): Promise<void>
  delay(ms: number): Promise<void>

  track<T>(id: string, val: T): T
  tracks(vars: Record<string, any>): void

  runId: string
}

export interface IRealm {
  global: RunnerGlobal
  evaluate(expr: string): unknown
}
