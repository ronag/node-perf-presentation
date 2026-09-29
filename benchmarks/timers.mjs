// Benchmark: native setTimeout vs pooled @nxtedition/timers
// Both use a static callback (no closure per timer), so we measure the timer
// machinery itself: native Timeout objects (async ids, per-duration linked
// lists, libuv now) vs one shared 500 ms tick over a flat array.
import { run, bench, group, summary, do_not_optimize } from 'mitata'
import { setTimeout as pooledSetTimeout, clearTimeout as pooledClearTimeout } from '@nxtedition/timers'

function noop() {}

summary(() => {
  group('schedule + cancel one 5 s timer', () => {
    bench('native setTimeout', () => {
      const t = globalThis.setTimeout(noop, 5000)
      globalThis.clearTimeout(t)
    }).gc('inner')

    bench('pooled setTimeout', () => {
      const t = pooledSetTimeout(noop, 5000)
      pooledClearTimeout(t)
    }).gc('inner')
  })
})

const handles = new Array(100)

summary(() => {
  group('schedule 100 × 5 s timers, then cancel them', () => {
    bench('native setTimeout', () => {
      for (let i = 0; i < 100; i++) handles[i] = globalThis.setTimeout(noop, 5000)
      for (let i = 0; i < 100; i++) globalThis.clearTimeout(handles[i])
    }).gc('inner')

    bench('pooled setTimeout', () => {
      for (let i = 0; i < 100; i++) handles[i] = pooledSetTimeout(noop, 5000)
      for (let i = 0; i < 100; i++) pooledClearTimeout(handles[i])
    }).gc('inner')
  })
})

await run()

// Retained heap per live timer (e.g. one idle timeout per connection)
function heapPerTimer(schedule, cancel, n = 100_000) {
  const live = new Array(n)
  globalThis.gc()
  const before = process.memoryUsage().heapUsed
  for (let i = 0; i < n; i++) live[i] = schedule(noop, 60_000)
  globalThis.gc()
  const bytes = (process.memoryUsage().heapUsed - before) / n
  for (let i = 0; i < n; i++) cancel(live[i])
  do_not_optimize(live)
  return bytes
}

// Warm up both paths once so lazily created lists don't count
heapPerTimer(globalThis.setTimeout, globalThis.clearTimeout, 1000)
heapPerTimer(pooledSetTimeout, pooledClearTimeout, 1000)

console.log('\nretained heap per live timer (100k timers)')
console.log(`  native setTimeout   ${heapPerTimer(globalThis.setTimeout, globalThis.clearTimeout).toFixed(1)} B`)
console.log(`  pooled setTimeout   ${heapPerTimer(pooledSetTimeout, pooledClearTimeout).toFixed(1)} B`)
