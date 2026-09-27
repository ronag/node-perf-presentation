# Custom Node build A/B

Raw results behind the "Build your own Node" chapter.

- `ab8.md`: JSON with every metric's median ± MAD per image, followed by a Markdown table. Produced by `run-ab.mjs`.
- `run-ab.mjs`: the interleaved A/B runner. It takes any number of `label=image[+fast|+glibc|+mimalloc]` arguments and runs the nxt `workloads.mjs` suite in each image on pinned cores.
- `ab-build-args.patch`: adds `NODE_TARGET_FLAGS`, `PGO`, `LTO` and `V8_PATCH` build args to the nxt node Dockerfile (`docker/swarm/base/node`) so each step can be built in isolation.

Images (all Node v26.10.0, built on tv2k-srv4, an AMD EPYC 9355P):

| label | image | build args |
|---|---|---|
| official | node:26.10.0-trixie-slim | — |
| omimalloc | node:26.10.0-trixie-slim + LD_PRELOAD mimalloc | — |
| clang23 | ab-26.10.0-nolto-nopatch | `PGO=0 LTO=0 V8_PATCH=0 NODE_TARGET_FLAGS=` |
| v8patch | ab-26.10.0-nolto | `PGO=0 LTO=0 NODE_TARGET_FLAGS=` |
| lto | ab-26.10.0-base | `PGO=0 NODE_TARGET_FLAGS=` |
| march | ab-26.10.0-march | `PGO=0` |
| pgo | nxtedition/node:26.10.0 | production recipe |
| pc | nxtedition/node:26.10.0-pc | production recipe + `POINTER_COMPRESSION=1` |

Every custom image runs mimalloc with `MIMALLOC_PURGE_DELAY=1000`.
