import {IMonacoOption} from '@types'

export const defaultMonacoOptions: IMonacoOption = {
  cursorStyle: 'block',
  detectIndentation: false,
  fontFamily: '"JetBrains Mono", monospace',
  fontLigatures: true,
  fontSize: 21,
  insertSpaces: true,
  language: 'typescript',
  minimap: {enabled: false},
  selectOnLineNumbers: true,
  tabSize: 2,
  theme: 'vs-dark',
}
