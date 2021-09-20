import {JSRunner} from './Evaluator'
import {TypeScriptCompiler} from './TypescriptCompiler'

export const runner = new JSRunner()
export const compiler = new TypeScriptCompiler()

export {JSRunner} from './Evaluator'
export {TypeScriptCompiler} from './TypescriptCompiler'
