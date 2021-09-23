import 'twin.macro'

import {useStore} from '@totality/core'

export const HtmlView: React.FC = () => {
  const {code, options} = useStore('code', 'options')

  const height = options['layout.height']

  return (
    <iframe style={{height}} title="Live Editor" srcDoc={code} tw="w-full" />
  )
}
