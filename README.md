# Node.js Performance Tips & Tricks

Slides and benchmarks for Robert Nagy's talk at **NodeConf EU 2026** (Bologna, Tue 29 Sep, 10:15–10:45).

## Run the deck

```sh
npm install      # @nxtedition/* are optional (private); the deck works without them
npm start        # http://localhost:8000
```

`npm start` runs a zero-dependency static server (`scripts/serve.mjs`). After `npm install`, nothing needs the network: reveal.js comes from `node_modules`, and the fonts are system fonts.
The deck has to be served over HTTP, because the slides are loaded with `fetch`. Opening `index.html` from disk shows a "Missing slide file" slide.

## Presenting

| Key | Action |
|---|---|
| `→` / `Space` | next (goes through fragments, then down each chapter, then on to the next chapter) |
| `←` | previous |
| `S` | **speaker view**: notes, a timer, and the next slide. Each note starts with a `⏱ mm:ss` target |
| `F` | fullscreen |
| `Esc` / `O` | overview: chapters are columns, and the appendix sits to the right of "Thank you" |
| `G` | jump to a slide number |
| `B` or `.` | black screen |
| `C` | core path on/off (reloads) |
| `?` | all shortcuts |

Open the speaker view on the laptop and drag the main window to the projector.

### Core path vs full deck

The deck has ~140 slides, far more than 30 minutes allow.
- **Core path (`?core`).** 38 slides marked `data-core` make up the 30-minute talk. Open **`http://localhost:8000/?core`** (or press **`C`**) to show only those.
- **Full deck.** Without `?core` everything is shown, for depth and Q&A. Backup chapters are uncounted.

| Part | Core slides | ⏱ target |
|---|---|---|
| Title | 1 | 0:00–1:00 |
| Build your own Node: official → 0 tune → 1 mimalloc → 2 LTO → 3 -march=znver5 → 4 Clang 23 → 5 PGO (+ "you get what you train") → 6 pointer compression → 7 patch V8 → all together | 11 | 1:00–10:00 |
| GC semi-space; HTTP: `res.write()` vs cork vs slab, own buffer, custom ServerResponse | 4 | 10:00–12:30 |
| async/await cost, async return pattern, sync I/O (12× / 190×) | 3 | 12:30–14:30 |
| SQLite: prepare once, durability, contending writers, sharding | 4 | 14:30–17:00 |
| Workers + reusePort (measured: +15% on churn, −43% RSS), thread pool, ring buffer | 4 | 17:00–19:00 |
| Bitmaps, Slice, `Buffer.poolSize` | 3 | 19:00–21:00 |
| URL parsing, pooled timers, promise chains starve, maybeYield, priorities | 5 | 21:00–25:00 |
| Flat queue, intrusive containers (last on purpose: cut first if late) | 2 | 25:00–26:30 |
| Thank you | 1 | 27:00 |

### PDF

Open `http://localhost:8000/?print-pdf` in Chrome, then Print → Save as PDF: landscape, margins **None**, **Background graphics** on.

## Editing

```
index.html                 chapter order (data-include)
slides/NN-*.html           one chapter per file, in index.html order
css/theme.css              design tokens (dark theme) and components
js/deck.js                 include loader, chapter kickers, bar charts, Reveal config
```

A chapter is a top-level `<section data-chapter="Name" data-chapter-num="02">` containing one `<section>` per slide:

- The kicker ("02 · Name") is added to each slide automatically; `class="no-kicker"` suppresses it.
- A `class="section-header"` slide becomes the chapter opener.
- `data-core` puts a slide on the 30-minute core path.
- `data-appendix` makes a chapter uncounted backup material.

Components:

```html
<!-- animated bar chart (bars grow when the slide appears; data-scale="log" for huge ratios) -->
<div class="chart" data-unit="ns" data-title="what was measured">
  <div class="bad" data-value="34.9">Buffer.subarray()</div>
  <div class="good" data-value="1.24" data-note="28×">Slice</div>
</div>

<div class="stats"><div class="stat good"><span class="stat-value">−50%</span><span class="stat-label">heap</span></div></div>
<div class="card good"><span class="card-title">Title</span>body</div>   <!-- good | bad | info | warn -->
<p class="callout">key point</p>                                    <!-- also .callout.bad / .good / .info -->
<p class="source">benchmarks/x.mjs · hardware</p>                   <!-- pinned to the bottom -->
<aside class="notes">⏱ 12:00. speaker notes</aside>
```

A `data-unit` of `ps`, `ns`, `µs`, `ms` or `s` auto-scales the value (for example, 1250 ns is shown as 1.25 µs). Any other unit is shown as given.

## Benchmarks

Every number in the main track comes from `benchmarks/`, run inside Docker on **tv2k-srv4**: an AMD EPYC 9355P (Zen 5) with Node.js 26.10.0, pinned to one core (`--cpuset-cpus=4`, or 2–7 for the threaded ones). Raw output is in `results/`.

```sh
npm run bench                 # everything, sequentially → results/<node version>/
npm run bench:timers          # one benchmark
docker run --rm --cpuset-cpus=4 -v $PWD:/bench -w /bench node:26.10.0 node scripts/bench-all.mjs
```

- Most scripts need `--expose-gc` (the npm scripts pass it). mitata's `.gc('inner')` collects between samples, so GC time is **not** included in the reported numbers.
- `sqlite-*.mjs` should run on a real disk: `BENCH_DIR=/data` with a Docker volume, not tmpfs.
- `timers`, `cross-thread` and `slice` need the private `@nxtedition/*` packages, and `url.mjs` optionally uses `request-target`.

### Custom Node builds (the "Build your own Node" chapter)

Every step was built from the same Node 26.10.0 source and measured on tv2k-srv4 with the nxt benchmark workloads (`benchmark/workloads.mjs` in `docker/swarm/base/node` of nxtedition/nxt). That's 14 groups: Buffer, JSON, HTTP, Workers + reusePort, startup, allocation and GC. Images were run in interleaved order, 4 runs plus a warm-up, on pinned cores. Raw output is in `results/node-builds/`.

| Step | Image | What changes |
|---|---|---|
| official | `node:26.10.0-trixie-slim` | Clang 20.1, no LTO, glibc malloc |
| 1 · allocator | the same + `LD_PRELOAD=libmimalloc.so`, `MIMALLOC_PURGE_DELAY=1000` | allocator only |
| (control) | our own build with Clang 20, no LTO | should match the official binary |
| 2 · LTO | + `--enable-lto` | link-time optimization |
| 3 · `-march` | + `-march=znver5 -mtune=znver5` via a compiler wrapper | ISA target: Zen 5, AVX-512 |
| 4 · Clang 23 | the same with Clang 23 | compiler |
| 5 · PGO | + two-pass Clang IR-PGO, 12 weighted training workloads | profile |
| 6 · pointer compression | + `--experimental-enable-pointer-compression` | heap pointer width |
| 7 · V8 patch | + `ArrayBufferView::CopyArrayBufferViewBytes` (nodejs/node#63892) | the runtime itself |

Each image adds one step to the previous one, so each delta is that step's effect. The A/B variants come from the production Dockerfile with five build args added: `LLVM_VERSION`, `NODE_TARGET_FLAGS`, `PGO`, `LTO` and `V8_PATCH` (see `results/node-builds/`).
