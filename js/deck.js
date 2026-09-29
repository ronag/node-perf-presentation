/* global Reveal, RevealHighlight, RevealNotes */
'use strict'

// ── 1. Inline slides/*.html in document order ─────────────────
async function loadIncludes () {
  const includes = [...document.querySelectorAll('[data-include]')]
  await Promise.all(includes.map(async (el) => {
    const src = el.getAttribute('data-include')
    try {
      const resp = await fetch(src)
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
      el.outerHTML = await resp.text()
    } catch (err) {
      console.error(`Failed to load ${src}`, err)
      el.outerHTML = `<section><h2>Missing slide file</h2><p class="bad">${src}: ${err.message}</p>` +
        '<p class="muted">Serve the deck over HTTP: <code>npm start</code></p></section>'
    }
  }))
}

// ── 2. Chapter kickers + uncounted appendix ───────────────────
function decorateChapters () {
  for (const chapter of document.querySelectorAll('.slides > section[data-chapter]')) {
    const name = chapter.dataset.chapter
    const num = chapter.dataset.chapterNum
    const appendix = chapter.hasAttribute('data-appendix')
    const slides = chapter.querySelectorAll(':scope > section')
    for (const slide of slides) {
      if (appendix) slide.setAttribute('data-visibility', 'uncounted')
      if (slide.classList.contains('section-header')) {
        // chapter opener: big number, no kicker
        slide.classList.add('statement')
        const tag = document.createElement('div')
        tag.className = 'chapter-num'
        tag.textContent = appendix ? 'BACKUP' : (num ?? '')
        slide.prepend(tag)
        continue
      }
      if (slide.classList.contains('no-kicker')) continue
      const kicker = document.createElement('div')
      kicker.className = 'kicker'
      kicker.innerHTML = appendix
        ? `<b>Appendix</b>${name}`
        : `${num ? `<b>${num}</b>` : ''}${name}`
      slide.prepend(kicker)
    }
  }
}

// ── 2b. Core path: ?core hides everything not marked data-core ─
// Slides marked data-core make up the 30-minute talk; the rest is there for
// depth and Q&A. Toggle with the "C" key (reloads).
const CORE = new URLSearchParams(location.search).has('core')
function applyCorePath () {
  if (!CORE) return
  for (const top of document.querySelectorAll('.slides > section')) {
    const kids = top.querySelectorAll(':scope > section')
    if (kids.length === 0) {
      if (!top.hasAttribute('data-core')) top.setAttribute('data-visibility', 'hidden')
      continue
    }
    let visible = 0
    for (const slide of kids) {
      if (slide.hasAttribute('data-core')) visible++
      else slide.setAttribute('data-visibility', 'hidden')
    }
    if (visible === 0) top.setAttribute('data-visibility', 'hidden')
  }
}
function toggleCorePath () {
  const url = new URL(location.href)
  if (CORE) url.searchParams.delete('core'); else url.searchParams.set('core', '')
  url.hash = ''
  location.href = url.toString()
}

// ── 3. Bar charts ─────────────────────────────────────────────
// <div class="chart" data-unit="ns" data-title="…">
//   <div class="good" data-value="2" data-note="65× faster">Slice (reused)</div>
//   <div class="bad" data-value="132">Buffer.subarray()</div>
// </div>
// Optional per row: data-display="custom text" replaces the formatted value.
// Optional per chart: data-scale="log" for huge ratios.
const UNITS = ['ps', 'ns', 'µs', 'ms', 's']

function formatValue (value, unit) {
  let i = UNITS.indexOf(unit)
  if (i === -1) {
    const n = value >= 100 ? Math.round(value).toLocaleString('en-US') : String(+value.toPrecision(3))
    return unit ? `${n} ${unit}` : n
  }
  while (value >= 1000 && i < UNITS.length - 1) { value /= 1000; i++ }
  while (value < 1 && i > 0) { value *= 1000; i-- }
  return `${+value.toPrecision(3)} ${UNITS[i]}`
}

function renderCharts () {
  for (const chart of document.querySelectorAll('.reveal .chart')) {
    const rows = [...chart.children].filter((el) => el.dataset.value !== undefined)
    const values = rows.map((row) => Number(row.dataset.value))
    const known = values.filter((v) => Number.isFinite(v))
    const max = Math.max(...known)
    const min = Math.min(...known)
    const log = chart.dataset.scale === 'log'
    const unit = chart.dataset.unit ?? ''
    if (chart.dataset.title) {
      const title = document.createElement('div')
      title.className = 'chart-title'
      title.textContent = chart.dataset.title
      chart.prepend(title)
    }
    const signed = chart.hasAttribute('data-signed')
    if (signed) {
      rows.forEach((row, i) => {
        const v = values[i]
        row.classList.add(v >= 0 ? 'good' : 'bad')
        row.dataset.display ??= `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)}%`
        values[i] = Math.abs(v)
      })
      known.length = 0
      known.push(...values.filter((v) => Number.isFinite(v)))
    }
    const maxAbs = Math.max(...known)
    rows.forEach((row, i) => {
      const value = values[i]
      if (!Number.isFinite(value)) { // not measured yet
        row.classList.add('chart-row', 'pending')
        row.innerHTML = `<span class="chart-label">${row.innerHTML}</span><span class="chart-track"></span><span class="chart-value">measuring…</span>`
        return
      }
      let pct = (value / (signed ? maxAbs : max)) * 100
      if (log) {
        const lo = Math.log10(min) - 0.5
        pct = ((Math.log10(value) - lo) / (Math.log10(max) - lo)) * 100
      }
      const label = row.innerHTML
      const display = row.dataset.display ?? formatValue(value, unit)
      const note = row.dataset.note ? `<span class="note">${row.dataset.note}</span>` : ''
      row.classList.add('chart-row')
      row.innerHTML =
        `<span class="chart-label">${label}</span>` +
        `<span class="chart-track"><span class="chart-bar" style="--w:${Math.max(pct, 0.4).toFixed(2)}%"></span></span>` +
        `<span class="chart-value">${display}${note}</span>`
    })
  }
}

// ── 4. Shrink code blocks that would scroll horizontally ─────
const MIN_CODE_PX = 12
function fitCode (slide) {
  if (!slide) return
  for (const pre of slide.querySelectorAll('pre')) {
    const code = pre.querySelector('code')
    if (!code || !code.clientWidth || pre.dataset.fitted) continue
    let px = parseFloat(getComputedStyle(pre).fontSize)
    while (code.scrollWidth > code.clientWidth + 1 && px > MIN_CODE_PX) {
      px -= 0.5
      pre.style.fontSize = `${px}px`
    }
    pre.dataset.fitted = String(px)
  }
}
function fitAround () {
  const { h, v } = Reveal.getIndices()
  for (const [dh, dv] of [[0, 0], [0, 1], [0, 2], [1, 0], [-1, 0], [0, -1]]) fitCode(Reveal.getSlide(h + dh, v + dv))
}

loadIncludes().then(() => {
  decorateChapters()
  applyCorePath()
  renderCharts()
  Reveal.initialize({
    navigationMode: 'linear',   // → and Space both step through every slide, chapter by chapter
    hash: true,
    history: false,
    slideNumber: 'c/t',
    showSlideNumber: 'all',
    transition: 'fade',
    transitionSpeed: 'fast',
    backgroundTransition: 'none',
    width: 1280,
    height: 720,
    margin: 0.02,
    center: false,
    display: 'flex',
    controls: false,
    progress: true,
    pdfSeparateFragments: false,
    keyboard: { 67: toggleCorePath }, // C: core path on/off
    plugins: [RevealHighlight, RevealNotes],
  })
  Reveal.on('ready', fitAround)
  Reveal.on('slidechanged', fitAround)
  Reveal.on('overviewshown', () => document.querySelectorAll('.slides section').forEach(fitCode))
})
