import {JSRunner} from 'modules/runner'

export type TrackListener = (
  variable: {key: string; value: any},
  runner: JSRunner
) => void | Promise<void>

export type FrameListener = (runner: JSRunner) => void | Promise<void>

export interface RunnerState {
  id: string
  compiled: string
  error: Error | null
  live: boolean
}

export interface RunnerEvents {
  'runner/run': void
  'runner/compile': void

  // Listeners
  'runner/on-track': TrackListener
  'runner/on-frame': FrameListener

  // Setters
  'runner/inject-global': Record<string, unknown>
  'runner/toggle-live-evaluation': void
  'runner/set': Partial<RunnerState>
}
