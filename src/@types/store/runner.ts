import {JSRunner} from 'modules/runner/Evaluator'

export type RunnerListener = (
  shared: Record<string, any>,
  runner: JSRunner
) => void | Promise<void>

export type TrackListener = RunnerListener
export type FrameListener = RunnerListener

export interface RunnerState {
  compiled: string
  shared: Record<string, any>
  error: Error | null

  listeners: TrackListener[]
}

export interface RunnerEvents {
  'runner/run': void
  'runner/setup': void
  'runner/compile': void

  // Listeners
  'runner/listen': TrackListener
  'runner/on-frame': FrameListener

  // Setters
  'runner/set': Partial<RunnerState>
  'runner/set-shared': Record<string, any>
}
