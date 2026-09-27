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
- **Core path (`?core`).** About 40 slides marked `data-core` make up the 30-minute talk. Open **`http://localhost:8000/?core`** (or press **`C`**) to show only those.
- **Full deck.** Without `?core` everything is shown, for depth and Q&A. Backup chapters are uncounted.

| Part | Core slides | ⏱ target |
|---|---|---|
| Title, where time goes, memory, benchmarks lie | 4 | 0:00–2:30 |
| Build your own Node: official → Clang+LTO → -march → PGO → pointer compression → tuning | 9 | 2:30–9:00 |
| GC semi-space, callbacks, intrusive containers, bitmaps, Slice, `Buffer.poolSize` | 7 | 9:00–14:00 |
| HTTP: slab responses, custom ServerResponse, object shapes | 4 | 14:00–17:00 |
| async/await cost, sync fast path, sync I/O (12× / 190×) | 3 | 17:00–19:30 |
| SQLite: prepare once, durability, sharding | 3 | 19:30–22:00 |
| URL parsing, timers, yielding, priorities | 5 | 22:00–25:30 |
| Workers + reusePort, thread pool, ring buffer | 3 | 25:30–27:30 |
| Takeaways, thank you | 2 | 27:30–28:30 |

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

### Custom Node builds (chapter 01)

The builds come from `docker/swarm/base/node` in nxtedition/nxt: Clang 23, full LTO, `-march=x86-64-v3 -mtune=znver3`, two-pass IR PGO trained on 12 service workloads, optional `--experimental-enable-pointer-compression`, and mimalloc.
The A/B variants in the slides (`baseline`, `+march`) are that same Dockerfile with PGO disabled and the target flags overridden. Everything was built and measured on tv2k-srv4 with the nxt benchmark workloads (`benchmark/workloads.mjs`); raw output is in `results/node-builds/`.
