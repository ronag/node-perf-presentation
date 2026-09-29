#!/bin/sh
# Clang 20 lane of the Zen 5 A/B (bookworm LLVM 20 packages, see Dockerfile)
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
b c20        --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=0 --build-arg V8_PATCH=0 --build-arg NODE_TARGET_FLAGS=
b c20-lto    --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg NODE_TARGET_FLAGS=
b c20-lto-z5 --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg "$Z5"
echo "$(date -u +%T) c20 lane done" >> /logs/status.log
