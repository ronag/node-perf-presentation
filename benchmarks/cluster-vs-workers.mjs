// Benchmark: scaling an HTTP server across cores, driven by autocannon.
//   single            one process, one thread (baseline)
//   cluster           node:cluster, the primary accepts and hands connections over IPC (round-robin)
//   cluster+reusePort node:cluster, every worker binds the port itself with reusePort
//   workers+reusePort worker_threads in one process, every Worker binds the port with reusePort
// Two scenarios: keep-alive, and a new connection per request (Connection: close).
// The server gets THREADS cores (SERVER_CPUS), autocannon gets its own (CLIENT_CPUS).
// Linux only: reusePort throws on macOS and Windows.
import { spawn, spawnSync } from 'node:child_process'
import cluster from 'node:cluster'
import http from 'node:http'
import readline from 'node:readline'
import { Worker, isMainThread, parentPort } from 'node:worker_threads'

const PORT = Number(process.env.PORT ?? 3100)
const THREADS = Number(process.env.THREADS ?? 4)
const SERVER_CPUS = process.env.SERVER_CPUS ?? '16-19'
const CLIENT_CPUS = process.env.CLIENT_CPUS ?? '24-31'
const DURATION = Number(process.env.DURATION ?? 10)
const CONNECTIONS = Number(process.env.CONNECTIONS ?? 128)

// A small JSON API response, serialized per request
const payload = { id: 'doc-00000042', rev: '3-abcdef0123456789', tags: ['a', 'b', 'c'], count: 42, items: Array.from({ length: 16 }, (_, i) => ({ i, name: `item ${i}` })) }
function handler (req, res) {
  const body = JSON.stringify(payload)
  res.writeHead(200, { 'content-type': 'application/json', 'content-length': Buffer.byteLength(body) })
  res.end(body)
}

function listen (reusePort, onListening) {
  http.createServer(handler).listen({ port: PORT, reusePort }, onListening)
}

// The server reports ready and total RSS (all processes) over stdout
function serve (mode) {
  const rl = readline.createInterface({ input: process.stdin })
  if (mode === 'single') {
    listen(false, () => console.log('ready'))
    rl.on('line', () => console.log(`rss ${process.memoryUsage().rss}`))
  } else if (mode === 'workers') {
    let up = 0
    for (let i = 0; i < THREADS; i++) {
      new Worker(new URL(import.meta.url), { argv: ['server-worker'] }).on('message', () => { if (++up === THREADS) console.log('ready') })
    }
    rl.on('line', () => console.log(`rss ${process.memoryUsage().rss}`))
  } else {
    let up = 0
    const workers = Array.from({ length: THREADS }, () => cluster.fork({ CLUSTER_REUSEPORT: mode === 'cluster-reuseport' ? '1' : '' }))
    for (const w of workers) w.on('message', (m) => { if (m === 'listening' && ++up === THREADS) console.log('ready') })
    rl.on('line', async () => {
      const rss = await Promise.all(workers.map((w) => new Promise((resolve) => {
        w.on('message', function onRss (m) { if (typeof m === 'number') { w.off('message', onRss); resolve(m) } })
        w.send('rss')
      })))
      console.log(`rss ${rss.reduce((a, b) => a + b, process.memoryUsage().rss)}`)
    })
  }
}

if (!isMainThread) {
  listen(true, () => parentPort.postMessage('listening'))
} else if (cluster.isWorker) {
  listen(process.env.CLUSTER_REUSEPORT === '1', () => process.send('listening'))
  process.on('message', () => process.send(process.memoryUsage().rss))
} else if (process.argv[2] === 'server') {
  serve(process.argv[3])
} else {
  const { default: autocannon } = await import('autocannon')
  spawnSync('taskset', ['-a', '-p', '-c', CLIENT_CPUS, String(process.pid)], { stdio: 'ignore' })
  // autocannon's reconnectRate drops the reconnecting response from its stats, so
  // churn connections with Connection: close instead (the server closes, autocannon reconnects)
  const load = (duration, headers) => autocannon({ url: `http://127.0.0.1:${PORT}/`, connections: CONNECTIONS, duration, workers: 4, headers })
  const SCENARIOS = [['keep-alive', {}], ['a new connection per request', { connection: 'close' }]]
  const results = []

  console.log(`node ${process.version}, ${THREADS} server threads on cpus ${SERVER_CPUS}, autocannon on ${CLIENT_CPUS}: ${CONNECTIONS} connections, ${DURATION} s after a 3 s warm-up\n`)
  for (const mode of ['single', 'cluster', 'cluster-reuseport', 'workers']) {
    // its own process group, so killing it also takes the cluster workers
    const server = spawn('taskset', ['-c', SERVER_CPUS, process.execPath, import.meta.filename, 'server', mode], { stdio: ['pipe', 'pipe', 'inherit'], detached: true })
    const lines = readline.createInterface({ input: server.stdout })
    const next = () => new Promise((resolve) => lines.once('line', resolve))
    const ready = await Promise.race([next(), new Promise((resolve, reject) => setTimeout(() => reject(new Error(`${mode}: no ready`)), 20_000))])
    if (ready !== 'ready') throw new Error(`${mode}: ${ready}`)

    const byScenario = []
    for (const [, headers] of SCENARIOS) {
      await load(3, headers)
      byScenario.push(await load(DURATION, headers))
    }
    server.stdin.write('rss\n')
    const rss = Number((await next()).split(' ')[1])
    const exited = new Promise((resolve) => server.once('exit', resolve))
    process.kill(-server.pid, 'SIGKILL')
    await exited
    await new Promise((resolve) => setTimeout(resolve, 500))

    const label = { single: 'one process, one thread', cluster: 'cluster (primary round-robin)', 'cluster-reuseport': 'cluster + reusePort', workers: 'Workers + reusePort, one process' }[mode]
    results.push({ label, byScenario, rss })
  }
  for (const [i, [scenario]] of SCENARIOS.entries()) {
    console.log(scenario)
    for (const { label, byScenario, rss } of results) {
      const r = byScenario[i]
      console.log(`  ${label.padEnd(34)} ${r.requests.average.toFixed(0).padStart(8)} req/s  p50 ${String(r.latency.p50).padStart(4)} ms  p99 ${String(r.latency.p99).padStart(4)} ms  errors ${r.errors + r.non2xx}  RSS ${(rss / 2 ** 20).toFixed(0).padStart(5)} MiB`)
    }
  }
}
