import {OptionsFromExtensions} from 'modules/view/Totality'

import {Extension} from '../../@types/Extension'

export const createExtension = <C, I>(
  extension: Extension<C, I>
): Extension<C, I> => extension

export const exts = <E extends readonly Extension[]>(...extensions: E) =>
  extensions

export const optionsOf = <E extends readonly Extension[]>(
  options: OptionsFromExtensions<E>
) => options
