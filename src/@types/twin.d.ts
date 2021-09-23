import 'twin.macro'

import {stitches} from '../stitches.config'

type K = typeof stitches

declare module 'react' {
  type CSSProp = Partial<CSSProperties> & Record<string, Partial<CSSProperties>>

  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp
  }

  interface SVGProps<T> extends SVGProps<SVGSVGElement> {
    css?: CSSProp
  }
}
