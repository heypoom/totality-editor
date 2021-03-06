import 'twin.macro'

import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

export const TotalityErrorBoundary: React.FC = ({children}) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <div>
          <h1 tw="text-xl text-white">
            {props.error.name} - {props.error.message}
          </h1>
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
