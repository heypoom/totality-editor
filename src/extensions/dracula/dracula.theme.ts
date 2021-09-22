import type {editor as EditorAPI} from 'monaco-editor/esm/vs/editor/editor.api'

export const Palette = {
  BLACK: '#21222d',
  COMMENT: '#7970A9',
  YELLOW: '#ffff80',
  PURPLE: '#bd93f9',
  ORANGE: '#FFCA80',
  PINK: '#FF80BF',
  CYAN: '#80FFEA',
  GREEN: '#8AFF80',
  CYAN_A: '#80FFEA',
  CYAN_B: '#80FFEA',
  WHITE: '#f8f8f2',
  YELLOW_A: '#FFFF80',
  RED: '#ff9580',
  GREY: '#eeeeee',
  DARK_GREY: '#f8f8f2',
  FG: '#f8f8f2',
  BG: '#21222d',
  HL: '#454158',
  CURSOR: '#f8f8f0',
}

export const DraculaTheme: EditorAPI.IStandaloneThemeData = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    {
      background: Palette.BLACK,
      token: '',
    },
    {
      foreground: Palette.COMMENT,
      token: 'comment',
    },
    {
      foreground: Palette.YELLOW,
      token: 'string',
    },
    {
      foreground: Palette.PURPLE,
      token: 'constant.numeric',
    },
    {
      foreground: Palette.PURPLE,
      token: 'constant.language',
    },
    {
      foreground: Palette.PURPLE,
      token: 'constant.character',
    },
    {
      foreground: Palette.PURPLE,
      token: 'constant.other',
    },
    {
      foreground: Palette.ORANGE,
      token: 'variable.other.readwrite.instance',
    },
    {
      foreground: Palette.PINK,
      token: 'constant.character.escaped',
    },
    {
      foreground: Palette.PINK,
      token: 'constant.character.escape',
    },
    {
      foreground: Palette.PINK,
      token: 'string source',
    },
    {
      foreground: Palette.PINK,
      token: 'string source.ruby',
    },
    {
      foreground: Palette.PINK,
      token: 'keyword',
    },
    {
      foreground: Palette.PINK,
      token: 'storage',
    },
    {
      foreground: Palette.PURPLE,
      token: 'number',
    },
    {
      foreground: Palette.CYAN,
      fontStyle: 'italic',
      token: 'storage.type',
    },
    {
      foreground: Palette.GREEN,
      fontStyle: 'underline',
      token: 'entity.name.class',
    },
    {
      foreground: Palette.CYAN,
      token: 'type.identifier',
    },
    {
      foreground: Palette.GREEN,
      fontStyle: 'underline',
      token: 'entity.name.type.class',
    },
    {
      foreground: Palette.GREEN,
      fontStyle: 'italic underline',
      token: 'entity.other.inherited-class',
    },
    {
      foreground: Palette.GREEN,
      token: 'entity.name.function',
    },
    {
      foreground: Palette.ORANGE,
      fontStyle: 'italic',
      token: 'variable.parameter',
    },
    {
      foreground: Palette.PINK,
      token: 'entity.name.tag',
    },
    {
      foreground: Palette.PINK,
      token: 'tag',
    },
    {
      foreground: Palette.GREEN,
      token: 'attribute.name',
    },
    {
      foreground: Palette.PINK,
      token: 'delimiter.html',
    },
    {
      foreground: Palette.YELLOW,
      token: 'attribute.value',
    },
    {
      foreground: Palette.GREEN,
      token: 'entity.other.attribute-name',
    },
    {
      foreground: Palette.CYAN,
      token: 'support.function',
    },
    {
      foreground: Palette.CYAN_A,
      token: 'support.constant',
    },
    {
      foreground: Palette.CYAN_B,
      fontStyle: ' italic',
      token: 'support.type',
    },
    {
      foreground: Palette.CYAN_B,
      fontStyle: ' italic',
      token: 'support.class',
    },
    {
      foreground: Palette.WHITE,
      background: Palette.PINK,
      token: 'invalid',
    },
    {
      foreground: Palette.WHITE,
      background: Palette.PURPLE,
      token: 'invalid.deprecated',
    },
    {
      foreground: Palette.DARK_GREY,
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: Palette.COMMENT,
      token: 'meta.diff',
    },
    {
      foreground: Palette.COMMENT,
      token: 'meta.diff.header',
    },
    {
      foreground: Palette.PINK,
      token: 'markup.deleted',
    },
    {
      foreground: Palette.GREEN,
      token: 'markup.inserted',
    },
    {
      foreground: Palette.YELLOW_A,
      token: 'markup.changed',
    },
    {
      foreground: Palette.PURPLE,
      token: 'constant.numeric.line-number.find-in-files - match',
    },
    {
      foreground: Palette.YELLOW_A,
      token: 'entity.name.filename',
    },
    {
      foreground: Palette.RED,
      token: 'message.error',
    },
    {
      foreground: Palette.GREY,
      token:
        'punctuation.definition.string.begin.json - meta.structure.dictionary.value.json',
    },
    {
      foreground: Palette.GREY,
      token:
        'punctuation.definition.string.end.json - meta.structure.dictionary.value.json',
    },
    {
      foreground: Palette.CYAN,
      token: 'meta.structure.dictionary.json string.quoted.double.json',
    },
    {
      foreground: Palette.YELLOW,
      token: 'meta.structure.dictionary.value.json string.quoted.double.json',
    },
    {
      foreground: Palette.GREEN,
      token:
        'meta meta meta meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: Palette.ORANGE,
      token: 'meta meta meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: Palette.PINK,
      token: 'meta meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: Palette.PURPLE,
      token: 'meta meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: Palette.GREEN,
      token: 'meta meta meta.structure.dictionary.value string',
    },
    {
      foreground: Palette.ORANGE,
      token: 'meta meta.structure.dictionary.value string',
    },
  ],
  colors: {
    'editor.foreground': Palette.FG,
    'editor.background': Palette.BG,
    'editor.selectionBackground': Palette.HL,
    'editor.lineHighlightBackground': Palette.HL,
    'editorCursor.foreground': Palette.CURSOR,
    'editorWhitespace.foreground': Palette.HL,
    'editorIndentGuide.activeBackground': Palette.HL,
    'editor.selectionHighlightBorder': Palette.HL,
  },
}
