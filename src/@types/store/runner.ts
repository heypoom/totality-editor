import {JSRunner} from 'modules/runner'

export type TrackListener = (
  variable: {key: string; value: any},
  runner: JSRunner
) => void | Promise<void>

export type FrameListener = (
  shared: Record<string, any>,
  runner: JSRunner
) => void | Promise<void>

export interface RunnerState {
  compiled: string
  shared: Record<string, any>
  error: Error | null
}

export interface RunnerEvents {
  'runner/run': void
  'runner/compile': void

  // Listeners
  'runner/on-track': TrackListener
  'runner/on-frame': FrameListener

  // Setters
  'runner/set': Partial<RunnerState>
  'runner/set-shared': Record<string, any>
}
