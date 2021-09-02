import {globalStyles} from 'twin.macro'
import type {AppProps} from 'next/app'
import {Provider} from 'jotai'

import {global} from '../stitches.config'
import React, {Suspense} from 'react'

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

  return (
    <Provider>
      <Suspense fallback={() => <div>ok</div>}>
        <Component {...pageProps} />
      </Suspense>
    </Provider>
  )
}

export default App
