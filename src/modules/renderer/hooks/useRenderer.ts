import {useStore} from 'modules/store'

export function useRenderer() {
  const {dispatch} = useStore()

  return {dispatch}
}
