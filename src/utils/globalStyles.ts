import tw, {theme, globalStyles} from 'twin.macro'

import {globalCss} from 'stitches.config'
import {Palette} from 'extensions/dracula/dracula.theme'

const customStyles = {
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    fontFamily: 'JetBrains Mono',
  },
  '.JSXBracket.JSXBracket.JSXBracket': {
    color: Palette.WHITE,
  },
  '.JSXElement.JSXIdentifier.JSXIdentifier': {
    color: Palette.PINK,
  },
  '.JSXElement.JSXText.JSXText': {
    color: Palette.WHITE,
  },
  '.JSXAttribute.JSXIdentifier.JSXIdentifier': {
    color: Palette.GREEN,
  },
}

const customStyle = globalCss(customStyles)
const globalStyle = globalCss(globalStyles as Record<string, any>)

export const useGlobalStyle = () => {
  customStyle()
  globalStyle()
}
