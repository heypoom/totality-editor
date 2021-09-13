import {createMerge} from './utils/merge'

import {StoreModule} from '../../@types/Store'

import {jsRunner} from 'modules/runner/Evaluator'
import {tsTranspiler} from 'modules/runner/TypescriptManager'

const set = createMerge('runner')

export const runnerModule: StoreModule = (store) => {
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
        console.warn('[runner::error]', error.message)

        store.dispatch('runner/set', {error})
      }
    }
  })

  store.on('runner/set', (s, data) => set(s, data))
}
