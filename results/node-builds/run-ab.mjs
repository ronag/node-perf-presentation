import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const benchmarkDirectory = dirname(fileURLToPath(import.meta.url))
const workload = readFileSync(join(benchmarkDirectory, 'workloads.mjs'))
const encodedWorkload = workload.toString('base64')
const allBenchmarkGroups = [
  'buffer',
  'native',
  'json-records',
  'json-record-values',
  'json-primitives',
  'json-escaped',
  'json-geo',
  'http',
  'http-workers',
  'startup',
  'allocator',
  'objects',
  'gc',
  'deepstream',
]

// A/B/C… comparison of arbitrary images (chain order), derived from run.mjs.
// usage: node run-ab.mjs --runs=5 --cpuset=5 --workerCpuset=5-8 label=image[+fast] …
const args = process.argv.slice(2)
const options = { cpuset: '5', workerCpuset: '5-8', durationMs: 1000, memory: '2g', runs: 5, groups: '', host: '' }
const images = []
for (const a of args) {
  const m = /^--([^=]+)=(.+)$/.exec(a)
  if (m) { options[m[1]] = ['runs', 'durationMs'].includes(m[1]) ? Number(m[2]) : m[2]; continue }
  // label=image[+fast|+glibc]: +fast = mimalloc with a 1 s purge delay, +glibc = no LD_PRELOAD
  const [label, ref] = a.split('=')
  // +mimalloc: preload a host copy of the image's mimalloc into any image (e.g. the official one)
  const m2 = /^(.*?)(\+fast|\+glibc|\+mimalloc)?$/.exec(ref)
  const env = m2[2] === '+fast' ? ['MIMALLOC_PURGE_DELAY=1000']
    : m2[2] === '+glibc' ? ['LD_PRELOAD=']
    : m2[2] === '+mimalloc' ? ['LD_PRELOAD=/opt/libmimalloc.so', 'MIMALLOC_PURGE_DELAY=1000'] : []
  const mounts = m2[2] === '+mimalloc' ? ['/root/node-ab-libs/libmimalloc.so:/opt/libmimalloc.so:ro'] : []
  images.push({ label, image: m2[1], allocator: 'image', environment: env, mounts })
}
const benchmarkGroups = options.groups ? options.groups.split(',') : allBenchmarkGroups
const dockerPrefix = options.host ? ['--host', options.host] : []

function median(values) {
  const sorted = values.toSorted((a, b) => a - b)
  const middle = Math.floor(sorted.length / 2)
  return sorted.length % 2 === 0 ? (sorted[middle - 1] + sorted[middle]) / 2 : sorted[middle]
}

function format(value) {
  if (value >= 1_000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }
  if (value >= 100) {
    return value.toFixed(1)
  }
  return value.toFixed(2)
}

function docker(arguments_, spawnOptions = {}) {
  const result = spawnSync('docker', [...dockerPrefix, ...arguments_], {
    encoding: 'utf8',
    ...spawnOptions,
  })
  if (result.status !== 0) {
    throw new Error(
      [
        `docker ${arguments_.join(' ')} failed with status ${result.status}`,
        result.stdout?.trim(),
        result.stderr?.trim(),
      ]
        .filter(Boolean)
        .join('\n')
    )
  }
  return result.stdout.trim()
}

const MULTI_CPU_GROUPS = new Set(['http-workers'])

function runGroup(image, benchmarkGroup) {
  const environment = [
    ...(image.allocator === 'system' ? ['LD_PRELOAD='] : []),
    ...(image.environment ?? []),
  ]
  const environmentArguments = environment.flatMap((value) => ['--env', value])
  const mountArguments = (image.mounts ?? []).flatMap((value) => ['--volume', value])
  const output = docker(
    [
      'run',
      '--rm',
      '--pull=never',
      '--cpuset-cpus',
      MULTI_CPU_GROUPS.has(benchmarkGroup) ? options.workerCpuset : options.cpuset,
      '--memory',
      options.memory,
      '--memory-swap',
      options.memory,
      '--network',
      'none',
      '--pids-limit',
      '256',
      '--security-opt',
      'no-new-privileges=true',
      // High priority, so an unrelated runnable task on the pinned CPU cannot
      // silently take a time slice from the measurement.
      '--cap-add',
      'SYS_NICE',
      '--env',
      `BENCH_DURATION_MS=${options.durationMs}`,
      '--env',
      `BENCHMARK_GROUP=${benchmarkGroup}`,
      '--env',
      'BENCHMARK_SOURCE',
      ...environmentArguments,
      ...mountArguments,
      '--entrypoint',
      'nice',
      image.image,
      '-n',
      '-19',
      'node',
      '--expose-gc',
      '--input-type=module',
      '--eval',
      'await import(`data:text/javascript;base64,${process.env.BENCHMARK_SOURCE}`)',
    ],
    {
      encoding: 'utf8',
      env: {
        ...process.env,
        BENCHMARK_SOURCE: encodedWorkload,
      },
      maxBuffer: 10 * 1024 * 1024,
    }
  )
  return JSON.parse(output)
}

function runImage(image) {
  const reports = benchmarkGroups.map((benchmarkGroup) => runGroup(image, benchmarkGroup))
  return {
    metadata: reports[0].metadata,
    metrics: reports.flatMap(({ metrics }) => metrics),
  }
}


const results = new Map(images.map(({ label }) => [label, []]))
process.stderr.write('Warming image page caches...\n')
for (const image of images) runImage(image)
for (let run = 0; run < options.runs; run += 1) {
  const ordered = images.map((_, i) => images[(i + run) % images.length])
  for (const image of ordered) {
    process.stderr.write(`Run ${run + 1}/${options.runs}: ${image.label} (${image.image})\n`)
    results.get(image.label).push(runImage(image))
  }
}

const first = results.get(images[0].label)
const rows = first[0].metrics.map((metric, k) => {
  const row = { name: metric.name, unit: metric.unit, better: metric.better, values: {} }
  for (const { label } of images) {
    const vals = results.get(label).map((r) => r.metrics[k].value)
    const med = median(vals)
    // keep the raw per-run samples, so noise can be judged later (bootstrap CIs)
    row.values[label] = { median: med, mad: median(vals.map((v) => Math.abs(v - med))), samples: vals }
  }
  return row
})
const meta = Object.fromEntries(images.map(({ label, image }) => [label, { image, ...results.get(label)[0].metadata }]))
process.stdout.write(`${JSON.stringify({ options, images: meta, rows }, null, 2)}\n\n`)
const delta = (row, a, b) => {
  const x = row.values[a].median, y = row.values[b].median
  if (!x || !y) return 'n/a'
  const d = row.better === 'lower' ? 1 - y / x : y / x - 1
  return `${d >= 0 ? '+' : ''}${(d * 100).toFixed(1)}%`
}
const labels = images.map((i) => i.label)
process.stdout.write(`| Benchmark | Unit | ${labels.join(' | ')} | ${labels.slice(1).map((l, i) => `${labels[i]}→${l}`).join(' | ')} | ${labels[0]}→${labels.at(-1)} |\n`)
process.stdout.write(`|---|---:|${labels.map(() => '---:').join('|')}|${labels.slice(1).map(() => '---:').join('|')}|---:|\n`)
for (const row of rows) {
  process.stdout.write(`| ${row.name} | ${row.unit} | ${labels.map((l) => `${format(row.values[l].median)} ± ${format(row.values[l].mad)}`).join(' | ')} | ${labels.slice(1).map((l, i) => delta(row, labels[i], l)).join(' | ')} | ${delta(row, labels[0], labels.at(-1))} |\n`)
}
