import tw, {theme, globalStyles} from 'twin.macro'

import {globalCss} from 'stitches.config'

const customStyles = {
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    fontFamily: 'JetBrains Mono',
  },
  '.mosaic-blueprint-theme.mosaic.mosaic-drop-target': {
    background: '#21222d',
  },
}

const customStyle = globalCss(customStyles)
const globalStyle = globalCss(globalStyles as Record<string, any>)

export const useGlobalStyle = () => {
  customStyle()
  globalStyle()
}
