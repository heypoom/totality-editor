import {debounce} from 'lodash'

import {createMerge} from './utils/merge'

import {runner, compiler} from 'modules/runner'
import {FrameListener, StoreModule, TrackListener} from '@types'

const set = createMerge('runner')

export const runnerModule: StoreModule = (store) => {
  const run = debounce(() => store.dispatch('runner/run'), 50)

  store.on('@init', () => ({
    runner: {
      compiled: '',
      error: null,
    },
  }))

  store.on('runner/compile', async (state) => {
    const compiled = await compiler.transpile(state.code)
    await store.dispatch('runner/set', {compiled})

    run()
  })

  store.on('runner/run', async (state) => {
    const {compiled} = state.runner

    try {
      await runner.run(compiled)

      store.dispatch('runner/set', {error: null})
    } catch (error) {
      if (error instanceof Error) {
        console.warn('[runner error]', error)

        store.dispatch('runner/set', {error})
      }
    }
  })

  store.on('runner/on-track', (s, listener: TrackListener) => {
    runner.on('track', listener)
  })

  store.on('runner/on-frame', (s, listener: FrameListener) => {
    runner.on('frame', listener)
  })

  store.on('runner/inject-global', (s, globals) => {
    runner.injectGlobal(globals)
  })

  store.on('runner/set', (s, data) => set(s, data))
}
