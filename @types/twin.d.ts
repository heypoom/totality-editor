import 'twin.macro'

import {styled as baseStyled} from '@stitches/react'

import type {
  StyledComponent,
  StyledComponentProps,
} from '@stitches/react/types/styled-component'

import {styled, stitches} from 'stitches.config'
import type {CSS} from 'stitches.config'

type CSSProp<T = AnyIfEmpty<DefaultTheme>> = string | CSSObject

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
    tw?: string
  }

  // The inline svg css prop
  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
    tw?: string
  }
}

type OmitFirstArg<F> = F extends (x: any, ...args: infer P) => infer R
  ? (...args: P) => R
  : never

type ST = typeof styled
type BST = typeof baseStyled
type STIT = typeof stitches
type KL = STIT['styled']

type K2 = BST<'div'>

// const aa = {
// 	()
// }

type K3 = STIT extends {
  styled: infer B
}
  ? B extends (type: infer T, ...composers: infer C) => infer R
		? [T, C, R]
		: never
  : never

// StyledComponent<
//     Tag,
//     JSX.IntrinsicElements[Tag],
//     {},
//     CSS
//   >

type StyledSyntax = {
  [Tag in keyof JSX.IntrinsicElements]: typeof k
}

declare const ss: StyledSyntax
const at = ss.div
const el = at()

declare module 'twin.macro' {
  // The styled and css imports
  const styled: StyledFn & StyledSyntax
  const css: Stitches['css']
}
