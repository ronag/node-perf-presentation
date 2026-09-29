// Benchmark: Buffer.allocUnsafe(SIZE) churn (allocate, touch, drop) for a given Buffer.poolSize.
// Run one process per case: POOL=262144 SIZE=16384 node benchmarks/poolsize-churn.mjs
// Only allocations under poolSize / 2 come from the pool.
if (process.env.POOL) Buffer.poolSize = Number(process.env.POOL)
const size = Number(process.env.SIZE)
let checksum = 0, n = 0
const t0 = performance.now(), end = t0 + 2000
while (performance.now() < end) { for (let i = 0; i < 64; i++) { const c = Buffer.allocUnsafe(size); c[0] = i; checksum += c[0] } n += 64 }
console.log(`poolSize ${String(Buffer.poolSize >> 10).padStart(4)} KiB  allocUnsafe(${size >> 10} KiB)  ${(n / ((performance.now() - t0) / 1000) / 1e6).toFixed(2)} Mops/s`)
