import {UnionToIntersection} from 'type-fest'

import {Extension} from './Extension'

import {EditorOptions, TotalityOptions} from '@types'

/** Construct the options object from the extensions. */
export type OptionsFromExtensions<E extends readonly Extension<any, any>[]> =
  UnionToIntersection<
    {
      [K in keyof E]: E[K] extends Extension<infer Config> ? Config : {}
    }[number]
  >

/** Construct the full options for the editor. */
export type OptionsOf<E extends readonly Extension<any, any>[]> = Partial<
  OptionsFromExtensions<E>
> &
  EditorOptions &
  Partial<TotalityOptions>
