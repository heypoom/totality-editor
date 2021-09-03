import {debounce} from 'lodash'
import {useMemo} from 'react'

export const useDebounce = (fn: (...args: any[]) => void, time = 100) =>
  useMemo(() => debounce(fn, time), [])
