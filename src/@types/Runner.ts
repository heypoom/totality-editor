export interface Run {
  id: string | null

  error: Error | null
  isRunning: boolean
  isAborted: boolean

  // Cleanup handlers: used for abort and when execution finishes.
  cleanupHandlers: (() => void | Promise<void>)[]

  latestCompleteRunId: string | null
}

export interface RunnerGlobal {
  console: Console
  setTimeout: typeof setTimeout

  delay(ms: number): Promise<void>

  track<T>(id: string, val: T): T
  tracks(vars: Record<string, any>): void

  runId: string
}

export interface IRealm {
  global: RunnerGlobal
  evaluate(expr: string): unknown
}
