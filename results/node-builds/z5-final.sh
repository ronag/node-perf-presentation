#!/bin/sh
# Fire-and-forget: the -mno-gather Zen 5 chain, checks, SQLite on tv2k, and the final 10-arm A/B.
set -u
L=/root/node-ab-logs/z5
I=nxtedition/node:ab-26.10.0
log () { echo "$(date -u +%T) $*" >> $L/bench-status.log; }
log "final: start"
# 1. the Clang 23 -mno-gather image (already building)
for i in $(seq 1 120); do grep -q "done c23-lto-z5-nogather" $L/status.log && break; sleep 30; done
grep -q "done c23-lto-z5-nogather exit=0" $L/status.log || { log "final: nogather build failed"; exit 1; }
# 2. SQLite contention + maintenance on a real disk while the server is quiet
mkdir -p $L/sqlite
cd /root/nodeconf-bench2
for b in sqlite-contention sqlite-maintenance; do
  timeout 900 docker run --rm --cpuset-cpus=12-15,17-23,27 -e NO_COLOR=1 -e BENCH_DIR=/data -v nodeconf-sqlite:/data \
    -v "$PWD":/bench -w /bench node:26.10.0 node benchmarks/$b.mjs > $L/sqlite/$b.txt 2>&1
  log "final: $b exit=$?"
done
# 3. rebuild the rest of the znver5 chain with -mno-gather (4 builds in parallel)
log "final: ng builds start"
timeout 3h docker run --rm --name z5ngc20 --cpuset-cpus=0 -v /var/run/docker.sock:/var/run/docker.sock \
  -v /root/node-ab-z5-c20:/ctx:ro -v $L:/logs -v /root/node-ab-logs/build-c20ng.sh:/b.sh:ro docker:cli sh /b.sh > $L/runner-ngc20.log 2>&1 &
timeout 3h docker run --rm --name z5ngb --cpuset-cpus=0 -v /var/run/docker.sock:/var/run/docker.sock \
  -v /root/node-ab-z5:/ctx:ro -v $L:/logs -v /root/node-ab-logs/build-ng.sh:/b.sh:ro docker:cli sh /b.sh > $L/runner-ngb.log 2>&1 &
wait
for t in c20-lto-z5ng c23-lto-z5ng-pgo c23-lto-z5ng-pgo-pc c23-lto-z5ng-pgo-pc-v8; do
  grep -q "done $t exit=0" $L/status.log || { log "final: build $t failed, no A/B"; exit 1; }
done
# 4. check every znver5 binary: compiler, flags and AVX-512 gathers
{
  cat > /tmp/cfg.js <<'JS'
const v = process.config.variables
console.log(`llvm=${v.llvm_version} lto=${v.enable_lto} pc=${v.v8_enable_pointer_compression}`)
JS
  for t in c20-lto-z5 c20-lto-z5ng c23-lto-z5 c23-lto-z5-nogather c23-lto-z5ng-pgo c23-lto-z5ng-pgo-pc c23-lto-z5ng-pgo-pc-v8; do
    printf '%-26s %s ' $t "$(docker run --rm -v /tmp/cfg.js:/cfg.js:ro --entrypoint node $I-$t /cfg.js)"
    docker run --rm --entrypoint sh $I-$t -c 'b=$(command -v node); printf "zmm=%s vpgather=%s\n" "$(llvm-objdump-23 -d --no-show-raw-insn $b | grep -c zmm)" "$(llvm-objdump-23 -d --no-show-raw-insn $b | grep -c vpgather)"'
  done
  for t in c20-lto-z5ng c23-lto-z5 c23-lto-z5-nogather; do
    echo "== gzip probe $t"; timeout 120 docker run --rm --cpuset-cpus=20 --network none -e MIMALLOC_PURGE_DELAY=1000 -v /root/node-ab-logs/gzip-probe.mjs:/p.mjs:ro --entrypoint node $I-$t /p.mjs
  done
} > $L/final-check.txt 2>&1
# 5. the final A/B: the -mno-gather chain, plus Clang 23 with gathers for the note
log "final: ab start"
cd /root/node-ab
timeout 6h docker run --rm --name ab11 --cpuset-cpus=0 -v /usr/local/bin/docker:/usr/local/bin/docker:ro \
  -v /var/run/docker.sock:/var/run/docker.sock -v /root/node-ab/benchmark:/w -w /w node:26.10.0 \
  node run-ab.mjs --runs=8 --cpuset=5 --workerCpuset=4-7 \
    official=node:26.10.0-trixie-slim omimalloc=node:26.10.0-trixie-slim+mimalloc \
    c20=$I-c20+fast lto=$I-c20-lto+fast znver5=$I-c20-lto-z5ng+fast clang23=$I-c23-lto-z5-nogather+fast \
    pgo=$I-c23-lto-z5ng-pgo+fast pc=$I-c23-lto-z5ng-pgo-pc+fast v8=$I-c23-lto-z5ng-pgo-pc-v8+fast \
    gather=$I-c23-lto-z5+fast \
  > $L/ab11-results.md 2> $L/ab11-progress.log
log "final: ab done exit=$?"
