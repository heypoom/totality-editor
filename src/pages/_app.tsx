import type {AppProps} from 'next/app'
import React, {Suspense} from 'react'

import {useGlobalStyle} from 'utils'

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  useGlobalStyle()

  return (
    <Suspense fallback={() => <div>suspense fallback</div>}>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default App
