import 'twin.macro'

import {useStore} from '@totality/core'

export const HtmlView: React.FC = () => {
  const {code} = useStore('code')

  return <iframe srcDoc={code} tw="text-white" />
}
