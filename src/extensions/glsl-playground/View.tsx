import {useStore} from '@totality/core'

export const GLSLPlaygroundView: React.FC = () => {
  const {code} = useStore('code')

  return (
    <div>
      <code>{code}</code>
    </div>
  )
}
