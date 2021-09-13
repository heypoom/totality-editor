import {StoreModule} from '../../@types/Store'

export const extensionModule: StoreModule = (store) => {
  store.on('@init', () => ({extensions: []}))

  store.on('extension/add', (state, extension) => ({
    extensions: [...state.extensions, {...extension}],
  }))

  store.on('extension/use', async (state, extension) => {
    await extension.setup({
      editor: {
        setup(handler) {
          store.dispatch('hooks/add', {
            handler,
            type: 'editor.setup',
            extensionId: extension.id,
          })
        },
      },

      options: state.options,
    })
  })
}
