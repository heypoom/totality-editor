import type {AppProps} from 'next/app'
import React, {Suspense} from 'react'

import {useGlobalStyle} from 'utils/globalStyles'

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  useGlobalStyle()

  return (
    <Suspense fallback={() => <div>loading...</div>}>
      <Component {...pageProps} />
    </Suspense>
  )
}

export default App
