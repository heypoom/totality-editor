import {debounce} from 'lodash'

import {StoreModule} from '@types'

const SAVE_KEY = 'totality.code'

export const codeModule: StoreModule = (store) => {
  const save = debounce(() => store.dispatch('code/save'), 1000)
  const compile = debounce(() => store.dispatch('runner/compile'), 100)

  store.on('@init', () => ({code: ''}))

  store.on('code/save', (s) => {
    localStorage.setItem(SAVE_KEY, s.code)
  })

  store.on('code/load', () => {
    const code = localStorage.getItem(SAVE_KEY) || ''

    store.dispatch('code/set', code)
  })

  store.on('code/set', (s, code) => {
    save()
    compile()

    return {code}
  })
}
