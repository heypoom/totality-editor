import tw, {theme, globalStyles} from 'twin.macro'

import {globalCss} from 'stitches.config'

const customStyles = {
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    fontFamily: 'JetBrains Mono',
  },
}

const customStyle = globalCss(customStyles)
const globalStyle = globalCss(globalStyles as Record<string, any>)

export const useGlobalStyle = () => {
  customStyle()
  globalStyle()
}
