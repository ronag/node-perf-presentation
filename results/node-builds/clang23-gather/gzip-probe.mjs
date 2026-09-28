// gzip/gunzip throughput on three 1 MiB inputs: the A/B workload's constant fill,
// realistic JSON, and random bytes. Median of 7 x 300 ms windows, MiB/s.
import { gzipSync, gunzipSync } from 'node:zlib'
import { randomBytes } from 'node:crypto'

const MiB = 1024 * 1024
const constant = Buffer.allocUnsafe(MiB).fill(0x5a)
let json = ''
for (let i = 0; json.length < MiB; i++) {
  json += JSON.stringify({ id: `doc-${i.toString().padStart(8, '0')}`, rev: `${i % 97}-${(i * 2654435761 >>> 0).toString(16)}`, title: `Item number ${i}`, tags: ['news', i % 3 ? 'sport' : 'weather'], score: (i * 37) % 1000 / 10 }) + '\n'
}
const text = Buffer.from(json).subarray(0, MiB)
const random = randomBytes(MiB)

function rate (fn) {
  const rs = []
  for (let r = 0; r < 7; r++) {
    let n = 0
    const start = performance.now()
    while (performance.now() - start < 300) { fn(); n++ }
    rs.push(n / ((performance.now() - start) / 1000))
  }
  return rs.sort((a, b) => a - b)[3]
}

const only = process.argv[2]
for (const [name, input] of [['constant 0x5a', constant], ['JSON text', text], ['random', random]]) {
  if (only && !name.startsWith(only)) continue
  const z = gzipSync(input, { level: 1 })
  const g = rate(() => gzipSync(input, { level: 1 }))
  const u = rate(() => gunzipSync(z))
  console.log(`${name.padEnd(14)} ratio ${(input.length / z.length).toFixed(1).padStart(6)}  gzip -1 ${g.toFixed(0).padStart(5)} MiB/s  gunzip ${u.toFixed(0).padStart(5)} MiB/s`)
}
