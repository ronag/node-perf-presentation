// Benchmark: Buffer.poolSize tuning.
// Buffer.allocUnsafe(n) is carved from a shared slab when n < Buffer.poolSize / 2;
// larger requests get their own ArrayBuffer (slow path).
// Node >= 26.3 defaults to a 64 KiB pool (8 KiB before), so < 32 KiB is pooled.
//
// Each pool size runs in its own process so the slab is sized correctly from
// the first allocation:
//   node --expose-gc benchmarks/poolsize.mjs            # default pool
//   BUFFER_POOL_SIZE=1048576 node --expose-gc benchmarks/poolsize.mjs
import { run, bench, group, summary, do_not_optimize } from 'mitata'

if (process.env.BUFFER_POOL_SIZE) Buffer.poolSize = Number(process.env.BUFFER_POOL_SIZE)
console.log(`Buffer.poolSize = ${Buffer.poolSize} (pooled below ${Buffer.poolSize >>> 1} B)`)

for (const size of [1024, 16 * 1024, 48 * 1024, 128 * 1024]) {
  summary(() => {
    group(`allocUnsafe(${size / 1024} KiB)`, () => {
      bench(`poolSize ${Buffer.poolSize / 1024} KiB`, () => {
        do_not_optimize(Buffer.allocUnsafe(size))
      }).gc('inner')
    })
  })
}

await run()
