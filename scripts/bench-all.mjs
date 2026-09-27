// Run every benchmark sequentially and save the raw output to
// results/<node version>/<name>.txt. Numbers in the slides come from running
// this inside Docker on an AMD EPYC 9355P, pinned to one core:
//   docker run --rm --cpuset-cpus=4 -v $PWD:/bench -w /bench node:26.10.0 node scripts/bench-all.mjs
// Threaded benchmarks (cross-thread, sqlite-cache-shards, sqlite-contention, res-write, uv-threadpool) need more cores.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const out = path.join(root, 'results', process.version)
fs.mkdirSync(out, { recursive: true })

const runs = [
  ['async-overhead'], ['async-return'], ['atomics'], ['bitmap'], ['cache'], ['closures'],
  ['cross-thread'], ['fast-time'], ['fs-sync-vs-async'], ['function-queue'], ['gc-pressure'],
  ['intrusive-containers'], ['map-same-key'], ['slice'], ['streams'], ['subarray-vs-slice'],
  ['timers'], ['url'], ['sqlite-pragmas'], ['sqlite-cache-shards', {}, 'sqlite-cache-shards', []],
  ['sqlite-contention', {}, 'sqlite-contention', []], ['sqlite-maintenance', {}, 'sqlite-maintenance', []],
  ['res-write', {}, 'res-write', []],
  ['poolsize', {}, 'poolsize-default'],
  ['poolsize', { BUFFER_POOL_SIZE: '1048576' }, 'poolsize-1mib'],
  ['semi-space', {}, 'semi-space-default'],
  ['semi-space', {}, 'semi-space-64', ['--expose-gc', '--max-semi-space-size=64']],
  ['uv-threadpool', { UV_THREADPOOL_SIZE: '4' }, 'uv-threadpool-4', []],
  ['uv-threadpool', { UV_THREADPOOL_SIZE: '16' }, 'uv-threadpool-16', []],
]

for (const [name, env = {}, label = name, flags = ['--expose-gc']] of runs) {
  process.stdout.write(`${label} … `)
  const start = Date.now()
  const result = spawnSync(process.execPath, [...flags, path.join(root, 'benchmarks', `${name}.mjs`)], {
    env: { ...process.env, NO_COLOR: '1', ...env },
    encoding: 'utf8',
    timeout: 15 * 60 * 1000,
  })
  fs.writeFileSync(path.join(out, `${label}.txt`), result.stdout + result.stderr)
  console.log(result.status === 0 ? `ok (${((Date.now() - start) / 1000).toFixed(0)} s)` : `FAILED (${result.status ?? result.signal})`)
}
console.log(`results in ${path.relative(root, out)}/`)
