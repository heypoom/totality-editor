import 'twin.macro'

import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

export const RendererErrorBoundary: React.FC = ({children}) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <div tw="text-white shadow-lg m-2 overflow-scroll">
          <h1 tw="text-lg">
            {props.error.name} - {props.error.message}
          </h1>

          <pre>
            <code>{props.error.stack}</code>
          </pre>

          <button onClick={props.resetErrorBoundary}>Reset</button>
        </div>
      )}
      onError={(error, info) => {
        console.warn('Component Error:', error, info.componentStack)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
