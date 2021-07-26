import {globalStyles} from 'twin.macro'
import type {AppProps} from 'next/app'

import {global} from '../stitches.config'

function useGlobalStyle() {
  global(globalStyles)()

  global({
    body: {
      fontFamily: 'JetBrains Mono, sans-serif',
    },
  })()
}

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  useGlobalStyle()

  return <Component {...pageProps} />
}

export default App
