import {createCss, StitchesCss} from '@stitches/react'

export type {StitchesVariants} from '@stitches/react'

export const stitches = createCss({
  prefix: '',
  theme: {},
  themeMap: {},
  utils: {
    m: () => (v) => ({
      marginTop: v,
      marginBottom: v,
      marginLeft: v,
      marginRight: v,
    }),

    mt: () => (v) => ({marginTop: v}),
    mr: () => (v) => ({marginRight: v}),
    mb: () => (v) => ({marginBottom: v}),
    ml: () => (v) => ({marginLeft: v}),
    mx: () => (v) => ({marginLeft: v, marginRight: v}),
    my: () => (v) => ({marginTop: v, marginBottom: v}),

    p: () => (v) => ({
      paddingTop: v,
      paddingBottom: v,
      paddingLeft: v,
      paddingRight: v,
    }),

    pt: () => (v) => ({paddingTop: v}),
    pr: () => (v) => ({paddingRight: v}),
    pb: () => (v) => ({paddingBottom: v}),
    pl: () => (v) => ({paddingLeft: v}),
    px: () => (v) => ({paddingLeft: v, paddingRight: v}),
    py: () => (v) => ({paddingTop: v, paddingBottom: v}),

    size: () => (v) => ({width: v, height: v}),
  },
})

export type CSS = StitchesCss<typeof stitches>

export const {css, styled, global, theme, keyframes, getCssString} = stitches
