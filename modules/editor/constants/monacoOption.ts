import {IMonacoOption} from '@types'

export const defaultMonacoOptions: IMonacoOption = {
  selectOnLineNumbers: true,
  fontSize: 21,
  fontFamily: '"JetBrains Mono", monospace',
  fontLigatures: true,
  tabSize: 2,
  detectIndentation: false,
  insertSpaces: true,
  minimap: {enabled: false},
  cursorStyle: 'block',
  language: 'typescript',
  theme: 'vs-dark',
}
