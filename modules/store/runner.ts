import {StoreonModule} from 'storeon'

import {createMerge} from './utils/merge'

import {RunnerEvents, State} from '../../@types/Store'

import {JSRunner} from 'modules/runner/Evaluator'
import {TypeScriptTranspiler} from 'modules/runner/TypescriptManager'

const set = createMerge('runner')

type Module = StoreonModule<State, RunnerEvents>

export const runnerModule: Module = (store) => {
  const jsRunner = new JSRunner()
  const tsTranspiler = new TypeScriptTranspiler()

  store.on('@init', () => ({
    runner: {
      compiled: '',
      variables: {},
      error: null,
    },
  }))

  store.on('runner/setup', () => {
    jsRunner.on('track', () => {
      store.dispatch('runner/set', {variables: jsRunner.getTracked()})
    })
  })

  store.on('runner/compile', async (state) => {
    const compiled = await tsTranspiler.transpile(state.code)

    store.dispatch('runner/set', {compiled})
  })

  store.on('runner/run', async (state) => {
    try {
      await jsRunner.run(state.runner.compiled)

      store.dispatch('runner/set', {
        error: null,
        variables: jsRunner.getTracked(),
      })
    } catch (error) {
      if (error instanceof Error) {
        store.dispatch('runner/set', {error})
      }
    }
  })

  store.on('runner/set', (s, data) => set(s, data))
}
