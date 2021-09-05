import {createStitches} from '@stitches/react'
import type * as Stitches from '@stitches/react'

export const stitches = createStitches({})

export const {config, css, styled, globalCss, theme, keyframes, getCssText} =
  stitches

export type CSS = Stitches.CSS<typeof config>
