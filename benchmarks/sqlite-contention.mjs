// Benchmark: node:sqlite writers contending for one database file.
// N Worker threads, each with its own connection to the same file, insert
// 256 B rows (one autocommit statement per row) for DURATION_MS. SQLite allows
// one writer at a time, so the others wait in the busy handler (timeout below).
// Reports total rows/s, per-insert latency and SQLITE_BUSY failures for each
// journal_mode / synchronous combination.
//
// Run it on a real disk (not tmpfs), e.g. BENCH_DIR=/data with a docker volume.
import { DatabaseSync } from 'node:sqlite'
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const DURATION_MS = Number(process.env.DURATION_MS ?? 3000)
const BUSY_TIMEOUT_MS = 5000

if (!isMainThread) {
  const { file, id, sync } = workerData
  const db = new DatabaseSync(file, { timeout: BUSY_TIMEOUT_MS })
  db.exec(`PRAGMA synchronous = ${sync}`)
  const insert = db.prepare('INSERT INTO kv (k, v) VALUES (?, ?)')
  const value = Buffer.alloc(256, id)
  const lat = new Float64Array(1 << 20)
  let n = 0
  let busy = 0
  let k = id * 1e9
  parentPort.postMessage('ready')
  await new Promise((resolve) => parentPort.once('message', resolve))
  const end = performance.now() + DURATION_MS
  for (let t = performance.now(); t < end;) {
    try {
      insert.run(k++, value)
    } catch (err) {
      if (!/busy|locked/i.test(err.message)) throw err
      busy++
    }
    const t2 = performance.now()
    lat[n++ & (lat.length - 1)] = t2 - t
    t = t2
  }
  db.close()
  parentPort.postMessage({ n, busy, lat: lat.subarray(0, Math.min(n, lat.length)) })
} else {
  const DIR = fs.mkdtempSync(path.join(process.env.BENCH_DIR ?? os.tmpdir(), 'sqlite-contention-'))
  const configs = [
    ['DELETE', 'FULL', 'default: rollback journal, synchronous=FULL'],
    ['WAL', 'FULL', 'WAL, synchronous=FULL'],
    ['WAL', 'NORMAL', 'WAL, synchronous=NORMAL'],
    ['WAL', 'OFF', 'WAL, synchronous=OFF'],
  ]
  const WORKERS = (process.env.WORKERS ?? '1,8').split(',').map(Number)
  const q = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))]

  console.log(`sqlite ${process.versions.sqlite}, dir ${DIR}, ${DURATION_MS / 1000} s per case, busy timeout ${BUSY_TIMEOUT_MS} ms`)
  console.log('INSERT one 256 B row per autocommit statement, every Worker on its own connection to one file\n')
  let fileNo = 0
  for (const [journal, sync, label] of configs) {
    for (const workers of WORKERS) {
      const file = path.join(DIR, `db-${fileNo++}.sqlite`)
      const setup = new DatabaseSync(file)
      setup.exec(`PRAGMA journal_mode = ${journal}; CREATE TABLE kv (k INTEGER PRIMARY KEY, v BLOB) WITHOUT ROWID`)
      setup.close()

      const ws = Array.from({ length: workers }, (_, id) => new Worker(new URL(import.meta.url), { workerData: { file, id, sync } }))
      await Promise.all(ws.map((w) => new Promise((resolve, reject) => { w.once('message', resolve); w.once('error', reject) })))
      const results = ws.map((w) => new Promise((resolve, reject) => { w.once('message', resolve); w.once('error', reject) }))
      const start = performance.now()
      for (const w of ws) w.postMessage('go')
      const rs = await Promise.all(results)
      const secs = (performance.now() - start) / 1000

      const rows = rs.reduce((a, r) => a + r.n - r.busy, 0)
      const busy = rs.reduce((a, r) => a + r.busy, 0)
      const lat = Float64Array.from(rs.flatMap((r) => Array.from(r.lat))).sort()
      console.log(`  ${label.padEnd(44)} ${String(workers).padStart(2)} worker(s)  ${(rows / secs).toFixed(0).padStart(8)} rows/s` +
        `  p50 ${(q(lat, 0.5) * 1000).toFixed(1).padStart(8)} µs  p99 ${(q(lat, 0.99) * 1000).toFixed(1).padStart(9)} µs` +
        `  max ${lat[lat.length - 1].toFixed(1).padStart(7)} ms  busy errors ${busy}`)
      for (const suffix of ['', '-wal', '-shm', '-journal']) fs.rmSync(file + suffix, { force: true })
    }
  }
  fs.rmSync(DIR, { recursive: true, force: true })
}
