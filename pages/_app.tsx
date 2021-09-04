import type {AppProps} from 'next/app'
import {Provider} from 'jotai'
import React, {Suspense} from 'react'

import {useGlobalStyle} from 'modules/utils/globalStyles'

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
