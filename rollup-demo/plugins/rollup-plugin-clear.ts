import path from 'path'
import fs from 'fs'
import { Plugin } from 'rollup'

interface Opts {
  targets: string[]
  watch?: boolean
}
export default function clear(opts: Opts): Plugin {
  const cwd = process.cwd()
  const watch = opts.watch === true ? true : false
  const clear = (targets: string[]) => {
    for (const target of targets) {
      const dir = path.resolve(cwd, target) 
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true })
        console.log(`clear ${target} success`);
      }
    }
  }
  clear(opts.targets)
  return {
    name: 'clear',
    load() {
      if (watch) {
        clear(opts.targets)
      }
      return null
    },
  }
}
