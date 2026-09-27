// Benchmark: building a large streamed HTTP response.
// 4,096 rows × 5 fragments, written as
//   plain: one res.write() per fragment
//   cork:  the same writes between res.cork() and res.uncork()
//   slab:  fragments copied into a 256 KiB Buffer, one res.write() per slab
// with string fragments and with Buffer fragments. A client in a Worker
// thread (its own event loop) requests the response over keep-alive and
// reads it fully; we report responses per second.
import http from 'node:http'
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads'

const ROWS = 4096
const DURATION_MS = 3000

if (!isMainThread) {
  const { port, path } = workerData
  const agent = new http.Agent({ keepAlive: true, maxSockets: 1 })
  const get = () => new Promise((resolve, reject) => {
    http.get({ port, path, agent }, (res) => {
      let bytes = 0
      res.on('data', (chunk) => { bytes += chunk.length })
      res.on('end', () => resolve(bytes))
    }).on('error', reject)
  })
  await get() // warm up
  let count = 0
  let bytes = 0
  const start = performance.now()
  while (performance.now() - start < DURATION_MS) {
    bytes += await get()
    count++
  }
  parentPort.postMessage({ rps: count / ((performance.now() - start) / 1000), bytes: bytes / count })
  agent.destroy()
} else {
  const ids = Array.from({ length: ROWS }, (_, i) => `doc-${i.toString().padStart(8, '0')}`)
  const revs = Array.from({ length: ROWS }, (_, i) => `${i}-${'abcdef0123456789'.repeat(2)}`)
  const S = { a: '{"id":"', b: '","rev":"', c: '"}\n' }
  const B = { a: Buffer.from(S.a), b: Buffer.from(S.b), c: Buffer.from(S.c) }
  const idBufs = ids.map((s) => Buffer.from(s))
  const revBufs = revs.map((s) => Buffer.from(s))

  function writeRows (res, type) {
    if (type === 'string') {
      for (let i = 0; i < ROWS; i++) {
        res.write(S.a); res.write(ids[i]); res.write(S.b); res.write(revs[i]); res.write(S.c)
      }
    } else {
      for (let i = 0; i < ROWS; i++) {
        res.write(B.a); res.write(idBufs[i]); res.write(B.b); res.write(revBufs[i]); res.write(B.c)
      }
    }
  }

  function slabRows (res, type) {
    let slab = Buffer.allocUnsafeSlow(256 * 1024)
    let n = 0
    const flush = () => {
      if (n) res.write(slab.subarray(0, n))
      slab = Buffer.allocUnsafeSlow(slab.length)
      n = 0
    }
    const putS = (s) => { if (n + s.length * 3 > slab.length) flush(); n += slab.write(s, n) }
    const putB = (b) => { if (n + b.length > slab.length) flush(); n += b.copy(slab, n) }
    for (let i = 0; i < ROWS; i++) {
      if (type === 'string') { putS(S.a); putS(ids[i]); putS(S.b); putS(revs[i]); putS(S.c) } else { putB(B.a); putB(idBufs[i]); putB(B.b); putB(revBufs[i]); putB(B.c) }
    }
    flush()
  }

  const server = http.createServer((req, res) => {
    const [, mode, type] = req.url.split('/')
    res.setHeader('content-type', 'application/x-ndjson')
    if (mode === 'plain') writeRows(res, type)
    else if (mode === 'cork') { res.cork(); writeRows(res, type); res.uncork() }
    else slabRows(res, type)
    res.end()
  })
  await new Promise((resolve) => server.listen(0, resolve))
  const { port } = server.address()

  const run = (path) => new Promise((resolve, reject) => {
    const w = new Worker(new URL(import.meta.url), { workerData: { port, path } })
    w.once('message', resolve)
    w.once('error', reject)
  })

  console.log(`${ROWS} rows × 5 fragments per response, ${DURATION_MS / 1000} s per case, median of 3`)
  for (const type of ['string', 'buffer']) {
    const results = {}
    for (const mode of ['plain', 'cork', 'slab']) {
      const rs = []
      for (let r = 0; r < 3; r++) rs.push((await run(`/${mode}/${type}`)).rps)
      results[mode] = rs.sort((a, b) => a - b)[1]
    }
    console.log(`${type} fragments`)
    for (const mode of ['plain', 'cork', 'slab']) {
      console.log(`  ${mode.padEnd(6)} ${results[mode].toFixed(1).padStart(8)} responses/s  (${(results[mode] / results.plain).toFixed(2)}× plain)`)
    }
  }
  server.close()
}
