import {UnionToIntersection} from 'type-fest'

import {Extension} from './Extension'

/** Construct the options object from the extensions. */
export type OptionsFromExtensions<E extends readonly Extension<any, any>[]> =
  UnionToIntersection<
    {
      [K in keyof E]: E[K] extends Extension<infer Config> ? Config : never
    }[number]
  >
