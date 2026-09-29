#!/bin/sh
# Hardware counters per JSON.parse: c20 vs c20-lto, interleaved, pinned to core 21
L=/root/node-ab-logs
cat > $L/jcount.mjs <<'JS'
const mode = process.argv[2]
const general = JSON.stringify({ value: { created: '2026-08-04T08:00:00.000Z', description: 'A short synopsis of the item, roughly one line of text.', modified: '2026-08-04T09:12:33.000Z', tags: ['breaking', 'news', 'video'], title: 'News Report' } })
const escaped = JSON.stringify(Array.from({ length: 12_288 }, (_, i) => ({ ascii: `quote:" slash:\\ control:\\n index:${i}`, multilingual: `Göteborg—東京—مرحبا—${i}`, surrogatePairs: `😀🚀🧪-${i.toString(16)}` })))
const text = mode === 'general' ? general : escaped
const reps = mode === 'general' ? 20_000_000 : 3_000
let sum = 0
for (let i = 0; i < 2000; i++) sum += JSON.parse(text) ? 1 : 0   // warm up
const start = performance.now()
for (let i = 0; i < reps; i++) sum += JSON.parse(text) ? 1 : 0
console.error(`OPS ${reps} ${((performance.now() - start) / reps * 1e3).toFixed(3)}us/op`)
JS
for mode in general escaped; do
  for round in 1 2 3; do
    for t in c20 c20-lto; do
      out=$(timeout 300 docker run --rm --privileged --cpuset-cpus=21 --network none -e MIMALLOC_PURGE_DELAY=1000 -v $L/jcount.mjs:/j.mjs:ro --entrypoint sh nxtedition/node:ab-26.10.0-$t -c \
        "perf stat -x, -e cycles,instructions,branch-misses,stalled-cycles-frontend,L1-icache-load-misses,iTLB-load-misses node /j.mjs $mode 2>&1")
      echo "$mode $round $t $(echo "$out" | tr '\n' ' ')"
    done
  done
done
