import {debounce} from 'lodash'
import {StoreonModule} from 'storeon'

import {createMerge} from './utils/merge'

import {RunnerEvents, State} from '@types'

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
      variables: {},
      error: null,
    },
  }))

  store.on('runner/setup', () => {
    runner.on('track', () => {
      store.dispatch('runner/set', {variables: runner.getTracked()})
    })
  })

  store.on('runner/compile', async (state) => {
    const compiled = await compiler.transpile(state.code)
    await store.dispatch('runner/set', {compiled})

    run()
  })

  store.on('runner/run', async (state) => {
    try {
      await runner.run(state.runner.compiled)

      store.dispatch('runner/set', {
        error: null,
        variables: runner.getTracked(),
      })
    } catch (error) {
      if (error instanceof Error) {
        store.dispatch('runner/set', {error})
      }
    }
  })

  store.on('runner/set', (s, data) => set(s, data))
}
