import 'twin.macro'
import {TwStyle} from 'twin.macro'

import {stitches} from '../stitches.config'

declare module 'react' {
  type CSSProp = any

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }

  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }
}
