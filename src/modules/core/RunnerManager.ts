import {JSRunner} from '../runner'

class RunnerManager {
  instances: Map<string, JSRunner> = new Map()

  create(id: string) {
    const runner = new JSRunner()
    this.instances.set(id, runner)
  }

  of(id: string): JSRunner {
    if (!this.instances.has(id)) this.create(id)

    return this.instances.get(id)!
  }
}

export const runnerManager = new RunnerManager()

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.runnerManager = runnerManager
}
