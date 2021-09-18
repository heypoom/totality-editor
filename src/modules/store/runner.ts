import {debounce} from 'lodash'
import {StoreonModule} from 'storeon'

import {createMerge} from './utils/merge'

import {FrameListener, RunnerEvents, State, TrackListener} from '@types'

import {JSRunner} from 'modules/runner/Evaluator'
import {TypeScriptCompiler} from 'modules/runner/TypescriptCompiler'

const set = createMerge('runner')

type Module = StoreonModule<State, RunnerEvents>

export const runnerModule: Module = (store) => {
  const runner = new JSRunner()
  const compiler = new TypeScriptCompiler()

  const run = debounce(() => store.dispatch('runner/run'), 50)

  store.on('@init', () => ({
    runner: {
      compiled: '',
      shared: {},
      error: null,
      listeners: [],
    },
  }))

  store.on('runner/setup', () => {
    runner.on('track', async () => {
      const state = store.get()
      const {listeners} = state.runner

      const variables = runner.getTracked()

      for (const listener of listeners) {
        await listener(variables, runner)
      }
    })
  })

  store.on('runner/compile', async (state) => {
    const compiled = await compiler.transpile(state.code)
    await store.dispatch('runner/set', {compiled})

    run()
  })

  store.on('runner/run', async (state) => {
    const {compiled} = state.runner

    try {
      await runner.run(compiled)
    } catch (error) {
      if (error instanceof Error) {
        store.dispatch('runner/set', {error})
      }
    }
  })

  store.on('runner/listen', (s, listener: TrackListener) => {
    return set(s, {
      listeners: [...s.runner.listeners, listener],
    })
  })

  store.on('runner/on-frame', (s, listener: FrameListener) => {
    runner.state.frameHandlers.push(listener)
  })

  store.on('runner/set', (s, data) => set(s, data))
}
