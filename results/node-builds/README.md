# Custom Node build A/B

Raw results behind the "Build your own Node" chapter.

- `ab11-znver5-nogather.md`: the final run, 8 interleaved runs per image. JSON with every metric's median, MAD and raw samples, then a Markdown table. Produced by `run-ab.mjs`.
- `ab9-znver5.md`: the first Zen 5 run (4 runs, no `-mno-gather`), where the Clang 23 zlib regression showed up.
- `run-ab.mjs`: the interleaved A/B runner. It takes any number of `label=image[+fast|+glibc|+mimalloc]` arguments and runs the nxt `workloads.mjs` suite in each image on pinned cores.
- `ab-build-args.patch`: adds `LLVM_VERSION`, `NODE_TARGET_FLAGS`, `PGO`, `LTO` and `V8_PATCH` build args to the nxt node Dockerfile (`docker/swarm/base/node`), so each step can be built on its own.
- `build-z5.sh`, `build-c20.sh`, `build-nogather.sh`, `build-ng.sh`, `build-c20ng.sh`: the builds, run in a `docker:cli` container on the host. `z5-bench.sh`, `z5-final.sh`: the benchmark runs after them.
- `previous/`: the earlier 8-way run (x86-64-v3, Clang 23 before LTO), superseded.

Images (all Node v26.10.0, built on tv2k-srv4, an AMD EPYC 9355P, Zen 5). Each adds one step to the previous one:

| label | image | build args |
|---|---|---|
| official | node:26.10.0-trixie-slim | Clang 20.1, no LTO, glibc malloc |
| omimalloc | the same + LD_PRELOAD mimalloc | — |
| c20 | ab-26.10.0-c20 | `LLVM_VERSION=20 PGO=0 LTO=0 V8_PATCH=0 NODE_TARGET_FLAGS=` (the control: our build with the official compiler) |
| lto | ab-26.10.0-c20-lto | + `LTO=1` |
| znver5 | ab-26.10.0-c20-lto-z5ng | + `NODE_TARGET_FLAGS="-march=znver5 -mtune=znver5 -mno-gather"` |
| clang23 | ab-26.10.0-c23-lto-z5-nogather | + `LLVM_VERSION=23` (23.1.2) |
| pgo | ab-26.10.0-c23-lto-z5ng-pgo | + `PGO=1` |
| pc | ab-26.10.0-c23-lto-z5ng-pgo-pc | + `POINTER_COMPRESSION=1` |
| v8 | ab-26.10.0-c23-lto-z5ng-pgo-pc-v8 | + `V8_PATCH=1` |
| gather | ab-26.10.0-c23-lto-z5 | clang23 without `-mno-gather`, for the note on the Clang 23 slide |

`-mno-gather`: Clang 23 turns zlib's CRC32 loop into AVX-512 gathers that are slow on Zen (see `clang23-gather/`).
Every custom image runs mimalloc with `MIMALLOC_PURGE_DELAY=1000`.

Checked before benchmarking: `process.config` reports the compiler, LTO and pointer compression each image should have, and the znver5 images carry about twice as many AVX-512 (`zmm`) instructions (171K vs 81K from runtime-dispatched code).

apt.llvm.org's trixie LLVM 20 packages ship no `LLVMgold.so`, so an LTO link with bfd fails. The Clang 20 images use the bookworm build of the same 20.1.8 release, which has it.
