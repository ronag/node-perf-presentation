// Benchmark: a V8 Map/Set cliff that silently broke an earlier version of the
// intrusive-containers benchmark.
//
// Deleting and re-inserting the SAME key over and over costs O(n) per
// operation, while churning through different keys stays O(1). The old
// benchmark removed and re-added items[0] every iteration and "proved" that a
// Map-backed linked list is 5,000× slower than an intrusive one.
import { run, bench, group, summary, do_not_optimize } from 'mitata'

for (const N of [1_000, 10_000, 100_000]) {
  const keys = Array.from({ length: N }, () => ({}))
  const map = new Map()
  for (const key of keys) map.set(key, 1)

  let i = 0
  summary(() => {
    group(`Map with ${N.toLocaleString('en-US')} entries: delete + set`, () => {
      bench('same key every time', () => {
        const key = keys[0]
        map.delete(key)
        map.set(key, 1)
        do_not_optimize(map.size)
      })

      bench('rotating keys', () => {
        const key = keys[i++ % N]
        map.delete(key)
        map.set(key, 1)
        do_not_optimize(map.size)
      })
    })
  })
}

await run()
