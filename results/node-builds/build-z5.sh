#!/bin/sh
# Build the Zen 5 A/B chain: each image adds one step to the previous one.
set -u
cd /ctx
Z5='NODE_TARGET_FLAGS=-march=znver5 -mtune=znver5'
b () {
  tag=$1; shift
  echo "$(date -u +%T) start $tag" >> /logs/status.log
  docker buildx build --progress=plain --build-arg NODE_VERSION=v26.10.0 --build-arg RUN_TESTS=0 \
    --build-arg BUILD_JOBS=16 "$@" -t "nxtedition/node:ab-26.10.0-$tag" . > "/logs/build-$tag.log" 2>&1
  echo "$(date -u +%T) done $tag exit=$?" >> /logs/status.log
}
# Lane 1: Clang 20 (the official binaries' compiler) → LTO → znver5 → Clang 23
( b c20          --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=0 --build-arg V8_PATCH=0 --build-arg NODE_TARGET_FLAGS=
  b c20-lto      --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg NODE_TARGET_FLAGS=
  b c20-lto-z5   --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg "$Z5"
  b c23-lto-z5   --build-arg LLVM_VERSION=23 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg "$Z5" ) &
# Lane 2: + PGO, then + pointer compression + the V8 patch
( b c23-lto-z5-pgo       --build-arg LLVM_VERSION=23 --build-arg PGO=1 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg "$Z5"
  b c23-lto-z5-pgo-pc-v8 --build-arg LLVM_VERSION=23 --build-arg PGO=1 --build-arg LTO=1 --build-arg V8_PATCH=1 --build-arg POINTER_COMPRESSION=1 --build-arg "$Z5" ) &
# Lane 3: + pointer compression
( b c23-lto-z5-pgo-pc    --build-arg LLVM_VERSION=23 --build-arg PGO=1 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg POINTER_COMPRESSION=1 --build-arg "$Z5" ) &
wait
echo "$(date -u +%T) all done" >> /logs/status.log
