import {OptionsFromExtensions, Extension} from '@types'

export const createExtension = <C = {}, I = void>(
  extension: Extension<C, I>
): Extension<C, I> => extension

export const exts = <E extends readonly Extension[]>(...extensions: E) =>
  extensions

export const optionsOf = <E extends readonly Extension[]>(
  options: OptionsFromExtensions<E>
) => options
