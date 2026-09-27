// Render every slide in headless Chrome, screenshot it, and report layout
// problems (content outside the 1280×720 canvas, scrolling code blocks,
// unfilled chart values).
// Usage: npm start & node scripts/check-slides.mjs [outDir]
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = process.env.CHROME ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const URL_ = process.env.DECK_URL ?? 'http://localhost:8000/'
const out = path.resolve(process.argv[2] ?? path.join(os.tmpdir(), 'deck-shots'))
fs.mkdirSync(out, { recursive: true })

const port = Number(process.env.CDP_PORT ?? 9333)
const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${port}`, '--window-size=1280,720', '--hide-scrollbars',
  `--user-data-dir=${fs.mkdtempSync(path.join(os.tmpdir(), 'deck-chrome-'))}`, 'about:blank',
], { stdio: 'ignore' })

try {
  let target
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200)
    try {
      target = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page')
    } catch {}
  }
  if (!target) throw new Error('Chrome did not start')

  const ws = new WebSocket(target.webSocketDebuggerUrl)
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject })
  let id = 0
  const pending = new Map()
  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data)
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id) }
  }
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const n = ++id
    const timer = setTimeout(() => { pending.delete(n); reject(new Error(`CDP ${method} timed out`)) }, 20_000)
    pending.set(n, (msg) => { clearTimeout(timer); resolve(msg) })
    ws.send(JSON.stringify({ id: n, method, params }))
  })
  const evaluate = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails))
    return r.result?.result?.value
  }

  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 720, deviceScaleFactor: 1, mobile: false })
  // (Re)load the deck and wait until Reveal is ready
  const load = async () => {
    await send('Page.navigate', { url: URL_ })
    for (let i = 0; i < 100; i++) {
      await sleep(100)
      try { if (await evaluate('typeof Reveal !== "undefined" && Reveal.isReady()')) return } catch {}
    }
    throw new Error('deck did not load')
  }
  await load()

  // Reveal.getSlides() skips uncounted (appendix) slides, so walk the DOM
  const slides = await evaluate(`[...document.querySelectorAll('.slides > section')].flatMap((top, h) => {
    const kids = top.querySelectorAll(':scope > section')
    const list = kids.length ? [...kids] : [top]
    return list.map((s, v) => ({ h, v, title: (s.querySelector('h1,h2,h3')?.textContent ?? '').trim().slice(0, 60) }))
  })`)

  const problems = []
  for (const [n, s] of slides.entries()) {
   for (let attempt = 1; attempt <= 2; attempt++) {
    try {
    await evaluate(`Reveal.slide(${s.h}, ${s.v}, 99); fitCode(Reveal.getCurrentSlide())`)
    await sleep(1300)
    const issues = await evaluate(`(() => {
      const slide = Reveal.getCurrentSlide()
      const scale = Reveal.getScale()
      const box = slide.getBoundingClientRect()
      const issues = []
      for (const el of slide.querySelectorAll('*')) {
        if (el.closest('aside.notes')) continue
        const b = el.getBoundingClientRect()
        if (!b.width || !b.height) continue
        const bottom = (b.bottom - box.top) / scale
        const right = (b.right - box.left) / scale
        if (bottom > 721 || right > 1281) {
          issues.push('overflow ' + el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : '') +
            ' bottom=' + Math.round(bottom) + ' right=' + Math.round(right))
        }
      }
      for (const code of slide.querySelectorAll('pre code')) {
        if (code.scrollHeight > code.clientHeight + 2) issues.push('code scrolls vertically')
        if (code.scrollWidth > code.clientWidth + 2) issues.push('code scrolls horizontally: ' + code.textContent.split('\\n').reduce((a, l) => l.length > a.length ? l : a, '').slice(0, 70))
      }
      const PH = /\\b(?:MEM|B|T|TAKEAWAY|SQL|RING|SHARD|TIMER|URL|CACHE)_[A-Z0-9_]+/
      for (const v of slide.querySelectorAll('.chart-value')) if (/NaN|undefined|measuring/.test(v.textContent)) issues.push('chart value: ' + v.textContent)
      if (PH.test(slide.innerText)) issues.push('placeholder: ' + slide.innerText.match(PH)[0])
      for (const pre of slide.querySelectorAll('pre[data-fitted]')) if (Number(pre.dataset.fitted) < 14) issues.push('code shrunk to ' + pre.dataset.fitted + 'px')
      return [...new Set(issues)].slice(0, 6)
    })()`)
    const shot = await send('Page.captureScreenshot', { format: 'png' })
    const file = path.join(out, `${String(n + 1).padStart(3, '0')}-${s.h}-${s.v}.png`)
    fs.writeFileSync(file, Buffer.from(shot.result.data, 'base64'))
    const line = `${String(n + 1).padStart(3)} [${s.h}/${s.v}] ${s.title}`
    console.log(issues.length ? `${line}\n      ⚠ ${issues.join('\n      ⚠ ')}` : line)
    if (issues.length) problems.push(line)
    break
    } catch (err) {
      // headless Chrome occasionally stalls on a frame: retry once, then skip
      console.log(`${String(n + 1).padStart(3)} [${s.h}/${s.v}] ${attempt === 1 ? 'retrying' : 'SKIPPED'}: ${err.message}`)
      if (attempt === 2) problems.push(`${n + 1} skipped`)
      // a stalled renderer stays stalled: reload the deck before going on
      await load().catch((e) => console.log(`      reload failed: ${e.message}`))
    }
   }
  }
  console.log(`\n${slides.length} slides, ${problems.length} with issues. Screenshots: ${out}`)
  ws.close()
} finally {
  chrome.kill()
}
