// Benchmark: node:sqlite writers contending for one database file.
// N Worker threads, each with its own connection to the same file, insert
// 256 B rows (one autocommit statement per row) for DURATION_MS. SQLite allows
// one writer at a time, so the others wait in the busy handler (timeout below).
// Reports total rows/s (median and range over REPEAT interleaved runs), per-insert
// latency and SQLITE_BUSY failures for each journal_mode / synchronous combination
// and writer count. The "no auto-checkpoint" variant shows how much of WAL + NORMAL
// is checkpointing: its fsyncs stall a lone writer, while other writers keep going.
//
// Run it on a real disk (not tmpfs), e.g. BENCH_DIR=/data with a docker volume.
import * as sqlite from 'node:sqlite'
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

// node:sqlite renamed DatabaseSync to Database; Node 26.10 still has the old name
const Database = sqlite.Database ?? sqlite.DatabaseSync

const DURATION_MS = Number(process.env.DURATION_MS ?? 3000)
const BUSY_TIMEOUT_MS = 5000

if (!isMainThread) {
  const { file, id, sync, noCheckpoint } = workerData
  const db = new Database(file, { timeout: BUSY_TIMEOUT_MS })
  db.exec(`PRAGMA synchronous = ${sync}`)
  if (noCheckpoint) db.exec('PRAGMA wal_autocheckpoint = 0')
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
    ['WAL', 'NORMAL', 'WAL, synchronous=NORMAL, no auto-checkpoint', true],
    ['WAL', 'OFF', 'WAL, synchronous=OFF'],
  ]
  const WORKERS = (process.env.WORKERS ?? '1,2,4,8').split(',').map(Number)
  const REPEAT = Number(process.env.REPEAT ?? 3)
  const q = (sorted, p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))]
  const med = (v) => v.toSorted((a, b) => a - b)[Math.floor(v.length / 2)]

  console.log(`sqlite ${process.versions.sqlite}, dir ${DIR}, ${DURATION_MS / 1000} s per case, ${REPEAT} interleaved runs, busy timeout ${BUSY_TIMEOUT_MS} ms`)
  console.log('INSERT one 256 B row per autocommit statement, every Worker on its own connection to one file\n')
  const summary = new Map()   // label/workers → [{ rate, p99, max, busy }]
  let fileNo = 0
  for (let run = 0; run < REPEAT; run++) {
  for (const [journal, sync, label, noCheckpoint = false] of configs) {
    for (const workers of WORKERS) {
      const file = path.join(DIR, `db-${fileNo++}.sqlite`)
      const setup = new Database(file)
      setup.exec(`PRAGMA journal_mode = ${journal}; CREATE TABLE kv (k INTEGER PRIMARY KEY, v BLOB) WITHOUT ROWID`)
      setup.close()

      const ws = Array.from({ length: workers }, (_, id) => new Worker(new URL(import.meta.url), { workerData: { file, id, sync, noCheckpoint } }))
      await Promise.all(ws.map((w) => new Promise((resolve, reject) => { w.once('message', resolve); w.once('error', reject) })))
      const results = ws.map((w) => new Promise((resolve, reject) => { w.once('message', resolve); w.once('error', reject) }))
      const start = performance.now()
      for (const w of ws) w.postMessage('go')
      const rs = await Promise.all(results)
      const secs = (performance.now() - start) / 1000

      const rows = rs.reduce((a, r) => a + r.n - r.busy, 0)
      const busy = rs.reduce((a, r) => a + r.busy, 0)
      const lat = Float64Array.from(rs.flatMap((r) => Array.from(r.lat))).sort()
      const key = `${label}|${workers}`
      if (!summary.has(key)) summary.set(key, [])
      summary.get(key).push({ rate: rows / secs, p99: q(lat, 0.99), max: lat[lat.length - 1], busy })
      for (const suffix of ['', '-wal', '-shm', '-journal']) fs.rmSync(file + suffix, { force: true })
    }
  }
  }
  for (const [, , label] of configs) {
    for (const workers of WORKERS) {
      const rs = summary.get(`${label}|${workers}`)
      const rates = rs.map((r) => r.rate)
      console.log(`  ${label.padEnd(46)} ${String(workers).padStart(2)} worker(s)  ${med(rates).toFixed(0).padStart(8)} rows/s` +
        ` [${Math.min(...rates).toFixed(0)}–${Math.max(...rates).toFixed(0)}]  p99 ${(med(rs.map((r) => r.p99)) * 1000).toFixed(1).padStart(8)} µs` +
        `  max ${Math.max(...rs.map((r) => r.max)).toFixed(1).padStart(7)} ms  busy errors ${rs.reduce((a, r) => a + r.busy, 0)}`)
    }
  }
  fs.rmSync(DIR, { recursive: true, force: true })
}
