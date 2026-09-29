/* eslint-disable */
// Compare cache throughput at different shard counts (1, 2, 4).
// From @nxtedition/cache (scripts/bench-shards.mjs), importing the published package.
// Run with:
//   node scripts/bench-shards.mjs

import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { performance } from 'node:perf_hooks'
import { Worker, isMainThread, parentPort, workerData } from 'node:worker_threads'
import { fileURLToPath } from 'node:url'

const { Cache } = await import('@nxtedition/cache')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function tmpDb(label) {
  return path.join(os.tmpdir(), `cache-shards-${label}-${process.pid}-${Date.now()}.db`)
}

function cleanup(loc, count = 4) {
  // Shard files are named `${loc}.${n}_${count}` for count > 1 and bare
  // `${loc}` for count === 1. Unlink both naming schemes plus -wal/-shm
  // siblings.
  for (const suffix of ['', '-wal', '-shm']) {
    try {
      fs.unlinkSync(loc + suffix)
    } catch {}
    for (let n = 0; n < count; n++) {
      try {
        fs.unlinkSync(`${loc}.${n}_${count}${suffix}`)
      } catch {}
    }
  }
}

function formatOps(ops) {
  if (ops >= 1e6) return (ops / 1e6).toFixed(2) + 'M ops/s'
  if (ops >= 1e3) return (ops / 1e3).toFixed(0) + 'K ops/s'
  return ops.toFixed(0) + ' ops/s'
}

const DURATION_MS = Number(process.env.DURATION_MS ?? 3000)
const MT_THREADS = Number(process.env.MT_THREADS ?? 12)
const SHARD_COUNTS = [1, 2, 4, 8]

// ── Worker: runs one scenario against one cache ─────────────────────

if (!isMainThread) {
  const { dbPath, shards, mode, workerId, durationMs } = workerData

  const cache = new Cache(
    dbPath,
    async (key) => {
      // Simulate a light async fetch. In production the valueSelector is
      // usually the cache-fill source, so keep it cheap.
      return `v-${key}-from-${workerId}`
    },
    (key) => key,
    {
      ttl: 60_000,
      stale: 60_000,
      database: { shards },
    },
  )

  const keepalive = setInterval(() => {}, 60_000)

  try {
    let ops = 0
    const start = performance.now()
    const deadline = start + durationMs

    if (mode === 'shared-keys') {
      // Hot-hit: 64 shared keys, mostly memory-hit once populated.
      while (performance.now() < deadline) {
        for (let i = 0; i < 2000; i++) {
          const key = `shared-${(ops + i) & 63}`
          const r = cache.get(key)
          if (r.async) await r.value
        }
        ops += 2000
      }
    } else if (mode === 'partitioned') {
      // Cold-write-heavy: each worker writes unique keys forever.
      while (performance.now() < deadline) {
        for (let i = 0; i < 500; i++) {
          const r = cache.get(`w${workerId}-${ops + i}`)
          if (r.async) await r.value
        }
        ops += 500
      }
    }

    const elapsed = performance.now() - start
    parentPort.postMessage({ workerId, ops, elapsed })
  } finally {
    cache.close()
    clearInterval(keepalive)
  }
}

// ── Main: orchestrate runs ──────────────────────────────────────────

if (isMainThread) {
  console.log('='.repeat(78))
  console.log(` @nxtedition/cache — shard-count comparison (${DURATION_MS}ms per cell)`)
  console.log(`  Node ${process.version}  —  ${os.cpus().length} CPUs (${os.cpus()[0]?.model})`)
  console.log('='.repeat(78))

  async function runCell({ mode, shards, threads }) {
    const dbPath = tmpDb(`${mode}-s${shards}-t${threads}`)
    const start = performance.now()
    const workers = Array.from(
      { length: threads },
      (_, id) =>
        new Promise((resolve, reject) => {
          const w = new Worker(__filename, {
            workerData: { dbPath, shards, mode, workerId: id, durationMs: DURATION_MS },
          })
          w.on('message', resolve)
          w.on('error', reject)
          w.on('exit', (code) => {
            if (code !== 0) reject(new Error(`worker ${id} exit ${code}`))
          })
        }),
    )
    const results = await Promise.all(workers)
    const wall = performance.now() - start
    const totalOps = results.reduce((s, r) => s + r.ops, 0)
    const opsPerSec = (totalOps / wall) * 1000
    cleanup(dbPath, shards)
    return { opsPerSec, wall, totalOps }
  }

  // ── Single-thread (baseline cost of sharding machinery) ─────────

  console.log('\n── Single-thread, partitioned cold writes (each run = fresh DB)')
  console.log('  shards  throughput        vs 1-shard')
  console.log('  ' + '─'.repeat(44))
  const st_partitioned = {}
  for (const shards of SHARD_COUNTS) {
    const { opsPerSec } = await runCell({ mode: 'partitioned', shards, threads: 1 })
    st_partitioned[shards] = opsPerSec
    const delta = ((opsPerSec / st_partitioned[1] - 1) * 100).toFixed(1)
    console.log(
      `  ${String(shards).padStart(6)}  ${formatOps(opsPerSec).padStart(14)}  ${shards === 1 ? '—' : (delta > 0 ? '+' : '') + delta + '%'}`,
    )
  }

  console.log('\n── Single-thread, shared-keys hot-hit (mostly memory-hit)')
  console.log('  shards  throughput        vs 1-shard')
  console.log('  ' + '─'.repeat(44))
  const st_shared = {}
  for (const shards of SHARD_COUNTS) {
    const { opsPerSec } = await runCell({ mode: 'shared-keys', shards, threads: 1 })
    st_shared[shards] = opsPerSec
    const delta = ((opsPerSec / st_shared[1] - 1) * 100).toFixed(1)
    console.log(
      `  ${String(shards).padStart(6)}  ${formatOps(opsPerSec).padStart(14)}  ${shards === 1 ? '—' : (delta > 0 ? '+' : '') + delta + '%'}`,
    )
  }

  // ── Multi-thread ─────────────────────────────────────────────────

  console.log(`\n── ${MT_THREADS} threads, partitioned cold writes (writer contention)`)
  console.log('  shards  throughput        scaling vs 1-thread  vs 1-shard')
  console.log('  ' + '─'.repeat(62))
  const mt_partitioned = {}
  for (const shards of SHARD_COUNTS) {
    const { opsPerSec } = await runCell({ mode: 'partitioned', shards, threads: MT_THREADS })
    mt_partitioned[shards] = opsPerSec
    const scaling = (opsPerSec / st_partitioned[shards]).toFixed(2) + '×'
    const delta = ((opsPerSec / mt_partitioned[1] - 1) * 100).toFixed(1)
    console.log(
      `  ${String(shards).padStart(6)}  ${formatOps(opsPerSec).padStart(14)}  ${scaling.padStart(17)}  ${shards === 1 ? '—' : (delta > 0 ? '+' : '') + delta + '%'}`,
    )
  }

  console.log(`\n── ${MT_THREADS} threads, shared-keys hot-hit`)
  console.log('  shards  throughput        scaling vs 1-thread  vs 1-shard')
  console.log('  ' + '─'.repeat(62))
  const mt_shared = {}
  for (const shards of SHARD_COUNTS) {
    const { opsPerSec } = await runCell({ mode: 'shared-keys', shards, threads: MT_THREADS })
    mt_shared[shards] = opsPerSec
    const scaling = (opsPerSec / st_shared[shards]).toFixed(2) + '×'
    const delta = ((opsPerSec / mt_shared[1] - 1) * 100).toFixed(1)
    console.log(
      `  ${String(shards).padStart(6)}  ${formatOps(opsPerSec).padStart(14)}  ${scaling.padStart(17)}  ${shards === 1 ? '—' : (delta > 0 ? '+' : '') + delta + '%'}`,
    )
  }

  console.log('\n' + '='.repeat(78))
}
