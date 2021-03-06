import {nanoid} from 'nanoid'
import {debounce} from 'lodash'

import {createMerge} from './utils/merge'

import {compiler} from 'modules/runner'
import {runnerManager} from 'modules/core'
import {FrameListener, StoreModule, TrackListener} from '@types'

const set = createMerge('runner')

export const runnerModule: StoreModule = (store) => {
  const runnerId = nanoid()
  const run = debounce(() => store.dispatch('runner/run'), 50)

  const runner = runnerManager.of(runnerId)

  store.on('@init', () => ({
    runner: {
      id: runnerId,
      compiled: '',
      error: null,
      live: true,
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

  store.on('runner/toggle-live-evaluation', (s) => {
    return set(s, {live: !s.runner.live})
  })

  store.on('runner/set', (s, data) => set(s, data))
}
