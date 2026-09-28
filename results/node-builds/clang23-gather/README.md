# Clang 23 + znver5: zlib CRC32 turns into AVX-512 gathers

In the Zen 5 build A/B, switching Clang 20.1.8 → 23.1.2 (both `-march=znver5 -mtune=znver5`, LTO) made
`gzip -1` 34% and `gunzip` 32% slower. `perf` puts the extra time in zlib's `crc32_z`. Clang 23
vectorizes its table-driven ("braided") CRC loop into `vpgatherqd`, which is microcoded and slow on Zen:
over 60% of the `crc32_z` samples sit on gathers. Clang 20 keeps the loop scalar.

## Reproducer: Node 26.10's `deps/zlib/crc32.c`, `-O3`

`vpgather` instructions in the object file:

| flags | Clang 20.1.8 | Clang 23.1.2 |
|---|---|---|
| `-march=x86-64-v3` | 0 | 0 |
| `-march=x86-64-v4` | 0 | 10 |
| `-march=x86-64-v4 -mtune=znver5` | 0 | 27 |
| `-march=znver5 -mtune=znver5` | 0 | 27 |
| `-march=znver5 -mno-gather` | 0 | 0 |
| `-march=sapphirerapids` | 0 | 10 |

CRC32 throughput (`crc-harness.c` + `crc32.c`, 1 MiB, EPYC 9355P):

| flags | Clang 20.1.8 | Clang 23.1.2 |
|---|---|---|
| `-march=znver5` | 5.63 GB/s | 2.28 GB/s (27 gathers) |
| `-march=znver5 -mno-gather` | 5.68 GB/s | 5.02 GB/s |
| `-march=znver5 -fno-slp-vectorize` | 5.62 GB/s | 5.07 GB/s |
| `-march=znver5 -mprefer-vector-width=256` | 5.62 GB/s | 2.62 GB/s (10 gathers) |
| `-march=znver5 -mtune=znver4` | 5.40 GB/s | 2.48 GB/s |
| `-march=x86-64-v3` | 5.51 GB/s | 4.91 GB/s |

- `-mtune` doesn't help, and znver5 tuning emits *more* (512-bit) gathers than generic `x86-64-v4`.
- The SLP vectorizer creates them (`-fno-slp-vectorize` avoids them); `-mno-gather` is the targeted fix.
- Even without gathers, Clang 23 runs this loop about 10% slower than Clang 20 (timed while builds ran on other cores).
- Upstream: LLVM's x86 cost model treats "has AVX-512" as "has fast gathers" in `getGatherOverhead()`.
  PR #206506 (decouple the two) was closed unmerged; PR #212997 (Zen 4 gather/scatter sched costs) is open.
  Nothing on release/23.x after 23.1.2 touches it.

Our znver5 builds now use `-march=znver5 -mtune=znver5 -mno-gather`.
