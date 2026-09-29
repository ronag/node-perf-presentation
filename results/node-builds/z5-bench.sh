#!/bin/sh
# Quiet-window benchmarks after the Zen 5 builds: cluster vs Workers (3 runs), then the 9-way build A/B.
set -u
L=/root/node-ab-logs/z5
cd /root/nodeconf-bench2
for r in 1 2 3; do
  echo "$(date -u +%T) cluster run $r" >> $L/bench-status.log
  timeout 600 docker run --rm --cpuset-cpus=16-19,24-31 -e NO_COLOR=1 -v "$PWD":/bench -w /bench node:26.10.0 \
    node benchmarks/cluster-vs-workers.mjs > $L/cluster-$r.txt 2>&1
  echo "$(date -u +%T) cluster run $r exit=$?" >> $L/bench-status.log
done
I=nxtedition/node:ab-26.10.0
echo "$(date -u +%T) ab start" >> $L/bench-status.log
cd /root/node-ab
timeout 5h docker run --rm --name ab9 --cpuset-cpus=0 -v /usr/local/bin/docker:/usr/local/bin/docker:ro \
  -v /var/run/docker.sock:/var/run/docker.sock -v /root/node-ab/benchmark:/w -w /w node:26.10.0 \
  node run-ab.mjs --runs=4 --cpuset=5 --workerCpuset=4-7 \
    official=node:26.10.0-trixie-slim omimalloc=node:26.10.0-trixie-slim+mimalloc \
    c20=$I-c20+fast lto=$I-c20-lto+fast znver5=$I-c20-lto-z5+fast clang23=$I-c23-lto-z5+fast \
    pgo=$I-c23-lto-z5-pgo+fast pc=$I-c23-lto-z5-pgo-pc+fast v8=$I-c23-lto-z5-pgo-pc-v8+fast \
  > $L/ab9-results.md 2> $L/ab9-progress.log
echo "$(date -u +%T) ab done exit=$?" >> $L/bench-status.log
