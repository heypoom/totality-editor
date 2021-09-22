import {IMonacoOption} from '@types'

export const defaultMonacoOptions: IMonacoOption = {
  detectIndentation: false,
  fontFamily: '"JetBrains Mono", monospace',
  fontSize: 16,
  fontWeight: '500',
  fontLigatures: true,
  insertSpaces: true,
  language: 'typescript',
  minimap: {enabled: false},
  selectOnLineNumbers: true,
  tabSize: 2,
  theme: 'vs-dark',
}
