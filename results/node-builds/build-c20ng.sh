#!/bin/sh
# Clang 20 + LTO + znver5 rebuilt with -mno-gather, so every znver5 step uses the same flags
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
b c20-lto-z5ng --build-arg LLVM_VERSION=20 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 --build-arg "$NG"
echo "$(date -u +%T) c20 ng lane done" >> /logs/status.log
