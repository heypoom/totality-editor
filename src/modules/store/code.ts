import {debounce} from 'lodash'

import {StoreModule} from '@types'

const saveKeyOf = (key = 'default') => `totality.persist.${key}`

export const codeModule: StoreModule = (store) => {
  const save = debounce(() => store.dispatch('code/save'), 1000)
  const compile = debounce(() => store.dispatch('runner/compile'), 50)

  store.on('@init', () => ({code: ''}))

  store.on('code/save', (s) => {
    if (!s.options['persist.enabled']) return
    const persistKey = saveKeyOf(s.options['file.path'])

    localStorage.setItem(persistKey, s.code)
  })

  store.on('code/load', (s) => {
    if (!s.options['persist.enabled']) return
    const persistKey = saveKeyOf(s.options['file.path'])

    const code = localStorage.getItem(persistKey)
    if (code) store.dispatch('code/set', code)
  })

  store.on('code/set', (s, code) => {
    save()

    // Compile if editor language is in typescript.
    const lang = s.options['editor.language']
    if (!lang || lang === 'typescript') compile()

    return {code}
  })
}
