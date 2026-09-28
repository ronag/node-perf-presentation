// Benchmark: node:sqlite write cost by journal mode / synchronous level,
// batching, and prepared-statement reuse.
//
// Run it on a real disk (not tmpfs), e.g. BENCH_DIR=/data with a docker volume:
// fsync cost is the whole point of this benchmark.
import * as sqlite from 'node:sqlite'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { run, bench, group, summary, do_not_optimize } from 'mitata'

// node:sqlite renamed DatabaseSync to Database; Node 26.10 still has the old name
const Database = sqlite.Database ?? sqlite.DatabaseSync

const DIR = fs.mkdtempSync(path.join(process.env.BENCH_DIR ?? os.tmpdir(), 'sqlite-bench-'))
const VALUE = Buffer.alloc(256, 7)
const TIME_MS = 2000

let fileNo = 0
function open(journal, sync) {
  const file = path.join(DIR, `db-${fileNo++}.sqlite`)
  const db = new Database(file)
  db.exec(`PRAGMA journal_mode = ${journal}; PRAGMA synchronous = ${sync};`)
  db.exec('CREATE TABLE kv (k INTEGER PRIMARY KEY, v BLOB) WITHOUT ROWID')
  return db
}

// Time-bounded loop: inserts per second for autocommit or batched transactions
let k = 0 // global, so a second pass on the same table never reuses a key
function measureInserts(db, batch) {
  const insert = db.prepare('INSERT INTO kv (k, v) VALUES (?, ?)')
  const first = k
  const start = performance.now()
  while (performance.now() - start < TIME_MS) {
    if (batch > 1) db.exec('BEGIN')
    for (let i = 0; i < batch; i++) insert.run(k++, VALUE)
    if (batch > 1) db.exec('COMMIT')
  }
  return ((performance.now() - start) * 1000) / (k - first)
}

console.log(`sqlite ${process.versions.sqlite}, dir ${DIR}`)
console.log('\nINSERT one row (256 B) per statement, µs per row')
const configs = [
  ['DELETE', 'FULL', 'default: rollback journal, synchronous=FULL'],
  ['WAL', 'FULL', 'WAL, synchronous=FULL'],
  ['WAL', 'NORMAL', 'WAL, synchronous=NORMAL'],
  ['WAL', 'OFF', 'WAL, synchronous=OFF'],
]
for (const [journal, sync, label] of configs) {
  const db = open(journal, sync)
  const autocommit = measureInserts(db, 1)
  const batched = measureInserts(db, 1000)
  db.close()
  console.log(`  ${label.padEnd(46)} autocommit ${autocommit.toFixed(2).padStart(9)} µs   1000/txn ${batched.toFixed(2).padStart(7)} µs`)
}

// Reads: prepare per call vs reuse vs tag store vs arrays
const db = open('WAL', 'NORMAL')
db.exec('CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, created INTEGER, flags INTEGER)')
{
  const ins = db.prepare('INSERT INTO users VALUES (?, ?, ?, ?, ?)')
  db.exec('BEGIN')
  for (let i = 0; i < 10_000; i++) ins.run(i, `user ${i}`, `user${i}@example.com`, Date.now(), i & 7)
  db.exec('COMMIT')
}
const SQL = 'SELECT * FROM users WHERE id = ?'
const stmt = db.prepare(SQL)
const arrays = db.prepare(SQL)
arrays.setReturnArrays(true)
const sql = db.createTagStore()

summary(() => {
  group('SELECT one row by primary key', () => {
    let i = 0
    bench('db.prepare(sql).get() every call', () => do_not_optimize(db.prepare(SQL).get(i++ % 10_000)))
    let j = 0
    bench('reused statement .get()', () => do_not_optimize(stmt.get(j++ % 10_000)))
    let k = 0
    bench('createTagStore() sql.get`…`', () => do_not_optimize(sql.get`SELECT * FROM users WHERE id = ${k++ % 10_000}`))
    let l = 0
    bench('reused statement, setReturnArrays(true)', () => do_not_optimize(arrays.get(l++ % 10_000)))
  })
})

await run()
db.close()
fs.rmSync(DIR, { recursive: true, force: true })
