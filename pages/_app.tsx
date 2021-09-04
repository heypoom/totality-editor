import type {AppProps} from 'next/app'
import {Provider} from 'jotai'
import React, {Suspense} from 'react'
import {setup, tw} from '@twind/preact'
import {css} from 'twind/css'

import {theme, darkMode} from '../tailwind.config'

setup({
  props: {
    tw: true,
    css: true,
    className: true,
  },
  darkMode: darkMode,
  theme: {
    colors: {...theme.colors},
  },
  variants: {},
})

const globalStyles = css({
  ':global': {
    body: {
      fontFamily: 'JetBrains Mono, sans-serif',
    },
  },
})

const App: React.FC<AppProps> = ({Component, pageProps}) => {
  return (
    <Provider>
      <Suspense fallback={() => <div>ok</div>}>
        <div className={tw(globalStyles)}>
          <Component {...pageProps} />
        </div>
      </Suspense>
    </Provider>
  )
}

export default App
