import 'twin.macro'

import React from 'react'

interface Props {
  reset: () => void
}

export class RendererErrorBoundary extends React.Component<Props> {
  state: {error: Error | null} = {error: null}

  componentDidCatch(error: Error, info: any) {
    this.setState({error})
  }

  componentDidUpdate() {
    const {error} = this.state
    if (!error) return

    // Keep auto-clearing the error every second.
    setTimeout(() => {
      this.clear()
    }, 900)
  }

  clear = () => {
    this.setState({error: null})
  }

  render() {
    const {error} = this.state
    if (!error) return this.props.children

    return (
      <div tw="text-white shadow-lg m-2 overflow-scroll" onClick={this.clear}>
        <h1 tw="text-base text-red-300 font-semibold">
          {error.name}: {error.message}
        </h1>

        <pre tw="overflow-scroll text-xs mt-2">
          <code>{error.stack}</code>
        </pre>
      </div>
    )
  }
}
