// Benchmark: cross-thread message throughput between two threads.
// MessagePort (structured clone) vs @nxtedition/shared ring buffer.
// The main thread produces N fixed-size messages, a worker consumes them;
// we time from the first send until the worker has seen the last message.
import { Worker, isMainThread, workerData, parentPort } from 'node:worker_threads'
import { once } from 'node:events'
import { Writer, Reader } from '@nxtedition/shared'

const N = 1_000_000
const RUNS = 5

if (!isMainThread) {
  const { mode, handle, n } = workerData
  if (mode === 'ring') {
    const reader = new Reader(handle)
    let received = 0
    let checksum = 0
    const onData = (data) => { checksum += data.buffer[data.byteOffset] }
    parentPort.postMessage('ready')
    while (received < n) {
      const count = reader.readSome(onData)
      received += count
      if (count > 0) reader.flushSync() // hand the space back to the writer
    }
    parentPort.postMessage({ received, checksum })
  } else {
    let received = 0
    parentPort.on('message', () => {
      if (++received === n) parentPort.postMessage({ received })
    })
    parentPort.postMessage('ready')
  }
} else {
  const median = (xs) => xs.toSorted((a, b) => a - b)[xs.length >> 1]
  const write = (data, payload) => data.byteOffset + payload.copy(data.buffer, data.byteOffset)

  async function runRing(size) {
    const writer = new Writer(8 * 1024 * 1024)
    const worker = new Worker(new URL(import.meta.url), { workerData: { mode: 'ring', handle: writer.handle, n: N } })
    await once(worker, 'message')
    const payload = Buffer.alloc(size, 1)
    const start = performance.now()
    for (let i = 0; i < N; i++) writer.writeSync(size, write, payload)
    writer.flushSync()
    await once(worker, 'message')
    const ms = performance.now() - start
    await worker.terminate()
    return N / (ms / 1000)
  }

  async function runPort(size) {
    const worker = new Worker(new URL(import.meta.url), { workerData: { mode: 'port', n: N } })
    await once(worker, 'message')
    const payload = new Uint8Array(size).fill(1)
    const start = performance.now()
    for (let i = 0; i < N; i++) worker.postMessage(payload)
    await once(worker, 'message')
    const ms = performance.now() - start
    await worker.terminate()
    return N / (ms / 1000)
  }

  const fmt = (x) => `${(x / 1e6).toFixed(2)} M msg/s`
  for (const size of [64, 1024]) {
    const port = []
    const ring = []
    for (let r = 0; r < RUNS; r++) {
      port.push(await runPort(size))
      ring.push(await runRing(size))
    }
    const p = median(port)
    const q = median(ring)
    console.log(`${size} B messages, ${N.toLocaleString('en-US')} per run, median of ${RUNS}`)
    console.log(`  MessagePort.postMessage  ${fmt(p)}`)
    console.log(`  shared ring buffer       ${fmt(q)}  (${(q / p).toFixed(1)}×)`)
  }
}
