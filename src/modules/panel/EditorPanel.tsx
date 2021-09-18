import React from 'react'

import {Editor} from 'modules/editor'
import {PanelProps} from '@types'

export const EditorPanel: React.FC<PanelProps> = () => {
  return (
    <div tw="">
      <Editor />
    </div>
  )
}
