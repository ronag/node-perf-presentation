// Benchmark: an SQLite maintenance job (delete expired rows, then checkpoint)
// and what it does to the event loop, three ways:
//   main thread, one statement
//   main thread, batches of BATCH rows with a yield (setImmediate) in between
//   a Worker with its own connection
// A 1 ms interval on the main thread records the longest gap between ticks.
//
// Run it on a real disk (not tmpfs), e.g. BENCH_DIR=/data with a docker volume.
import { DatabaseSync } from 'node:sqlite'
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads'
import { setImmediate as yieldToLoop } from 'node:timers/promises'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROWS = 200_000
const EXPIRED = 20_000
const BATCH = 500
const NOW = 1_000_000

function openDb (file) {
  const db = new DatabaseSync(file, { timeout: 5000 })
  db.exec('PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL')
  return db
}

function oneShot (db) {
  db.prepare('DELETE FROM cache WHERE expires < ?').run(NOW)
  db.exec('PRAGMA wal_checkpoint(TRUNCATE)')
}

if (!isMainThread) {
  const db = openDb(workerData.file)
  oneShot(db)
  db.close()
  parentPort.postMessage('done')
} else {
  const DIR = fs.mkdtempSync(path.join(process.env.BENCH_DIR ?? os.tmpdir(), 'sqlite-maint-'))

  function makeDb (name) {
    const file = path.join(DIR, `${name}.sqlite`)
    const db = openDb(file)
    db.exec('CREATE TABLE cache (k INTEGER PRIMARY KEY, v BLOB, expires INTEGER); CREATE INDEX cache_expires ON cache (expires)')
    const ins = db.prepare('INSERT INTO cache (k, v, expires) VALUES (?, ?, ?)')
    const value = Buffer.alloc(256, 1)
    // every 10th row is expired, spread over the whole table
    db.exec('BEGIN')
    for (let i = 0; i < ROWS; i++) ins.run(i, value, i % (ROWS / EXPIRED) === 0 ? NOW - 1 : NOW + i)
    db.exec('COMMIT')
    db.exec('PRAGMA wal_checkpoint(TRUNCATE)')
    return { file, db }
  }

  // Longest gap between 1 ms interval ticks while `work` runs
  async function measure (work) {
    let last = performance.now()
    let maxGap = 0
    const timer = setInterval(() => {
      const t = performance.now()
      maxGap = Math.max(maxGap, t - last)
      last = t
    }, 1)
    await new Promise((resolve) => setTimeout(resolve, 50)) // settle
    const start = performance.now()
    await work()
    const total = performance.now() - start
    await new Promise((resolve) => setTimeout(resolve, 20))
    clearInterval(timer)
    return { maxGap, total }
  }

  const cases = {
    'main thread, one statement': async ({ db }) => oneShot(db),
    [`main thread, batches of ${BATCH} + yield`]: async ({ db }) => {
      const del = db.prepare('DELETE FROM cache WHERE k IN (SELECT k FROM cache WHERE expires < ? LIMIT ?)')
      while (del.run(NOW, BATCH).changes > 0) await yieldToLoop()
      db.exec('PRAGMA wal_checkpoint(PASSIVE)')
    },
    'Worker, own connection': async ({ file }) => {
      const w = new Worker(new URL(import.meta.url), { workerData: { file } })
      await new Promise((resolve, reject) => { w.once('message', resolve); w.once('error', reject) })
    },
  }

  console.log(`sqlite ${process.versions.sqlite}, dir ${DIR}: delete ${EXPIRED.toLocaleString()} expired of ${ROWS.toLocaleString()} rows (256 B), then checkpoint. Median of 5.\n`)
  for (const [label, work] of Object.entries(cases)) {
    const runs = []
    for (let r = 0; r < 5; r++) {
      const ctx = makeDb(`${r}`)
      runs.push(await measure(() => work(ctx)))
      const left = ctx.db.prepare('SELECT count(*) AS n FROM cache WHERE expires < ?').get(NOW).n
      if (left !== 0) throw new Error(`${label}: ${left} expired rows left`)
      ctx.db.close()
      for (const suffix of ['', '-wal', '-shm']) fs.rmSync(ctx.file + suffix, { force: true })
    }
    const mid = (key) => runs.map((x) => x[key]).sort((a, b) => a - b)[2]
    console.log(`  ${label.padEnd(36)} max event-loop gap ${mid('maxGap').toFixed(1).padStart(7)} ms   total ${mid('total').toFixed(1).padStart(7)} ms`)
  }
  fs.rmSync(DIR, { recursive: true, force: true })
}
