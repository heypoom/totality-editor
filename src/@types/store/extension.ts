import {Extension} from '../Extension'

export interface ExtensionEvents {
  'extension/add': Extension
  'extension/use': Extension
  'extension/setup': Extension
  'extension/use-all': Extension[] | null
}
