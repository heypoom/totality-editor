import 'twin.macro'

import {useStore} from '@totality/core'

export const HtmlView: React.FC = () => {
  const {code} = useStore('code')

  return <div tw="text-white" dangerouslySetInnerHTML={{__html: code}} />
}
