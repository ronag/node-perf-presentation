#!/bin/sh
# Clang 23 + LTO + znver5 with -mno-gather: does avoiding AVX-512 gathers fix zlib's CRC32?
set -u
cd /ctx
tag=c23-lto-z5-nogather
echo "$(date -u +%T) start $tag" >> /logs/status.log
docker buildx build --progress=plain --build-arg NODE_VERSION=v26.10.0 --build-arg RUN_TESTS=0 --build-arg BUILD_JOBS=40 \
  --build-arg LLVM_VERSION=23 --build-arg PGO=0 --build-arg LTO=1 --build-arg V8_PATCH=0 \
  --build-arg 'NODE_TARGET_FLAGS=-march=znver5 -mtune=znver5 -mno-gather' -t "nxtedition/node:ab-26.10.0-$tag" . > "/logs/build-$tag.log" 2>&1
echo "$(date -u +%T) done $tag exit=$?" >> /logs/status.log
