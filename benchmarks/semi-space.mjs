// Benchmark: --max-semi-space-size on an allocation-heavy, medium-lived workload.
// Request-like object graphs stay alive for a while (a sliding window), which
// is exactly what gets promoted to the old generation when the young
// generation is small.
//
//   node --expose-gc benchmarks/semi-space.mjs
//   node --expose-gc --max-semi-space-size=64 benchmarks/semi-space.mjs
// With a much larger live window (WINDOW=100000) V8 may never grow the young
// generation by itself; add --min-semi-space-size=64 as well.
import v8 from 'node:v8'

const DURATION_MS = 5000
const WINDOW = Number(process.env.WINDOW ?? 20_000) // request graphs kept alive at any time

const window = new Array(WINDOW)
const profiler = new v8.GCProfiler()
profiler.start()
let n = 0
const start = performance.now()
while (performance.now() - start < DURATION_MS) {
  for (let i = 0; i < 10_000; i++) {
    window[n++ % WINDOW] = { id: n, headers: { host: 'x', path: '/a/b' }, body: [n, n + 1, n + 2] }
  }
}
const elapsed = performance.now() - start
const { statistics } = profiler.stop()

let scavenges = 0; let scavengeMs = 0; let marks = 0; let markMs = 0
for (const s of statistics) {
  const ms = s.cost / 1000 // µs → ms
  if (/Scavenge|MinorMarkSweep/.test(s.gcType)) { scavenges++; scavengeMs += ms } else if (/MarkSweepCompact/.test(s.gcType)) { marks++; markMs += ms } else { markMs += ms }
}
const semi = v8.getHeapSpaceStatistics().find((s) => s.space_name === 'new_space')
console.log(`execArgv: ${process.execArgv.join(' ') || '(defaults)'}  new_space: ${(semi.space_size / 1048576).toFixed(0)} MiB`)
console.log(`  throughput   ${((n / elapsed) * 1000 / 1e6).toFixed(2)} M objects/s`)
console.log(`  scavenges    ${scavenges} (${scavengeMs.toFixed(0)} ms)`)
console.log(`  mark-compact ${marks} (${markMs.toFixed(0)} ms)`)
console.log(`  GC share     ${(((scavengeMs + markMs) / elapsed) * 100).toFixed(1)}% of wall time`)
