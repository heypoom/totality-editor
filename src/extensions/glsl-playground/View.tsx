import 'twin.macro'

import {useStore} from '@totality/core'

export const GLSLPlaygroundView: React.FC = () => {
  const {code} = useStore('code')

  return (
    <div tw="text-white">
      <code>{code}</code>
    </div>
  )
}
