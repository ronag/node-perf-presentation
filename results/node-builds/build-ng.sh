#!/bin/sh
# The PGO steps of the Zen 5 chain rebuilt with -mno-gather (Clang 23 turns zlib's CRC32 loop into slow AVX-512 gathers)
set -u
cd /ctx
NG='NODE_TARGET_FLAGS=-march=znver5 -mtune=znver5 -mno-gather'
b () {
  tag=$1; shift
  echo "$(date -u +%T) start $tag" >> /logs/status.log
  docker buildx build --progress=plain --build-arg NODE_VERSION=v26.10.0 --build-arg RUN_TESTS=0 \
    --build-arg BUILD_JOBS=14 "$@" -t "nxtedition/node:ab-26.10.0-$tag" . > "/logs/build-$tag.log" 2>&1
  echo "$(date -u +%T) done $tag exit=$?" >> /logs/status.log
}
( b c23-lto-z5ng-pgo       --build-arg LLVM_VERSION=23 --build-arg PGO=1 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg "$NG" ) &
( b c23-lto-z5ng-pgo-pc    --build-arg LLVM_VERSION=23 --build-arg PGO=1 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg POINTER_COMPRESSION=1 --build-arg "$NG" ) &
( b c23-lto-z5ng-pgo-pc-v8 --build-arg LLVM_VERSION=23 --build-arg PGO=1 --build-arg LTO=1 --build-arg V8_PATCH=1 --build-arg POINTER_COMPRESSION=1 --build-arg "$NG" ) &
wait
echo "$(date -u +%T) ng lanes done" >> /logs/status.log
