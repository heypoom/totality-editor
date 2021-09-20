import React from 'react'
import {ErrorBoundary} from 'react-error-boundary'

export const TotalityErrorBoundary: React.FC = ({children}) => {
  return (
    <ErrorBoundary
      fallback={<div>error occurred.</div>}
      onError={(error, info) => {
        console.warn('Component Error:', error, info.componentStack)
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
