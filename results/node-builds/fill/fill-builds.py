#!/usr/bin/env python3
# Usage: python3 fill-builds.py ../ab11-znver5-nogather.md ../abtune.md ../ab9-znver5.md   (writes slides/04-custom-builds.html)
# Usage: fill-builds-z5.py <ab-results.md>  → writes slides/04-custom-builds.html from 04-template.html
import json, sys, re, html, math, os

HERE = os.path.dirname(os.path.abspath(__file__))   # 04-template.html lives next to this script
SLIDE = os.environ.get('OUT', os.path.join(HERE, '..', '..', '..', 'slides', '04-custom-builds.html'))
text = open(sys.argv[1]).read()
data = json.loads(text[: text.index('\n\n| Benchmark')])
rows = {r['name']: r for r in data['rows']}
PUBLIC = [n for n in rows if 'deepstream' not in n.lower()]   # internal workload names stay off slides
PREV = None   # optional earlier chain with its own PGO trainings: PGO-trained steps must reproduce there
if len(sys.argv) > 3 and os.path.exists(sys.argv[3]):
    pt = open(sys.argv[3]).read()
    PREV = {r['name']: r for r in json.loads(pt[: pt.index('\n\n| Benchmark')])['rows']}
REPLICATE = {('clang23', 'pgo'), ('pgo', 'pc'), ('pc', 'v8')}   # each image had its own PGO training
TUNE = None   # optional second A/B: official vs official + Step 0 tuning
if len(sys.argv) > 2 and os.path.exists(sys.argv[2]):
    tt = open(sys.argv[2]).read()
    TUNE = {r['name']: r for r in json.loads(tt[: tt.index('\n\n| Benchmark')])['rows']}

def find(sub):
    hits = [n for n in rows if sub.lower() in n.lower()]
    if not hits:
        raise SystemExit(f'no metric matching {sub!r}')
    return rows[hits[0]]

def med(row, label):
    return row['values'].get(label, {}).get('median')

def delta(row, a, b):
    x, y = med(row, a), med(row, b)
    if not x or not y:
        return None
    return (1 - y / x) if row['better'] == 'lower' else (y / x - 1)

import random
_rng = random.Random(42)
_sig_cache = {}
def significant(row, a, b, floor=0.01):
    """True when the 95% bootstrap CI of the step's delta excludes 0 and |delta| >= floor."""
    d = delta(row, a, b)
    if d is None or abs(d) < floor:
        return False
    if PREV is not None and (a, b) in REPLICATE and row['name'] in PREV:
        pd = delta(PREV[row['name']], a, b)
        if pd is None or pd * d <= 0 or abs(pd) < floor:
            return False   # not reproduced by the independently trained chain: training variance
    xa = row['values'].get(a, {}).get('samples'); xb = row['values'].get(b, {}).get('samples')
    if not xa or not xb:
        return True   # no samples recorded: fall back to the floor alone
    key = (row['name'], a, b)
    if key not in _sig_cache:
        lower = row['better'] == 'lower'
        def med(v):
            v = sorted(v); n = len(v)
            return v[n // 2] if n % 2 else (v[n // 2 - 1] + v[n // 2]) / 2
        ds = []
        for _ in range(2000):
            ma = med([_rng.choice(xa) for _ in xa]); mb = med([_rng.choice(xb) for _ in xb])
            if ma and mb:
                ds.append((1 - mb / ma) if lower else (mb / ma - 1))
        ds.sort()
        lo, hi = ds[int(0.025 * len(ds))], ds[int(0.975 * len(ds)) - 1]
        _sig_cache[key] = lo > 0 or hi < 0
    return _sig_cache[key]

def geo(a, b):
    ds = [delta(r, a, b) for r in data['rows']]
    ds = [d for d in ds if d is not None and d > -0.99]
    return math.exp(sum(math.log(1 + d) for d in ds) / len(ds)) - 1, len(ds)

def pct(d, digits=0):
    return f'{"+" if d >= 0 else "−"}{abs(d) * 100:.{digits}f}%'

SHOW = [
    ('HTTP/1.1 loopback', 'HTTP/1.1 req/s'),
    ('Workers', 'HTTP, 4 Workers + reusePort'),
    ('JSON.parse 0.5', 'JSON.parse'),
    ('JSON.stringify 0.5', 'JSON.stringify'),
    ('Allocate 2M', 'allocate 2M objects'),
    ('Record churn under GC', 'record churn under GC'),
    ('Process startup', 'process startup'),
    ('Event loop delay p99.9', 'event-loop p99.9 under GC'),
]
SHOW_NAMES = {find(s)['name'] for s, _ in SHOW}

def movers(a, b, k=2, skip=()):
    """The k biggest throughput changes not already on the chart."""
    cands = [(delta(rows[n], a, b), n) for n in PUBLIC
             if rows[n]['better'] == 'higher' and n not in SHOW_NAMES and n not in skip]
    cands = [(d, n) for d, n in cands if d is not None and abs(d) < 5 and significant(rows[n], a, b)]
    return [n for d, n in sorted(cands, key=lambda t: -abs(t[0]))[:k]]

def chart(a, b, extra=(), drop=(), min_abs=0.0):
    items = [(find(s), label) for s, label in SHOW if s not in drop] + [(rows[n], n) for n in extra if n in rows]
    out = []
    for row, label in items:
        d = delta(row, a, b)
        if d is None or abs(d) > 5 or not significant(row, a, b):
            continue   # within noise of 0%: not shown
        out.append((d, label))
    out.sort(key=lambda t: -t[0])
    return '\n      '.join(f'<div data-value="{d * 100:.1f}">{html.escape(label)}</div>' for d, label in out)

STEPS = {   # placeholder: (from, to)
    'MIMALLOC': ('official', 'omimalloc'), 'C20': ('omimalloc', 'c20'), 'LTO': ('c20', 'lto'),
    'Z5': ('lto', 'znver5'), 'C23': ('znver5', 'clang23'), 'PGO': ('clang23', 'pgo'),
    'PC': ('pgo', 'pc'), 'V8': ('pc', 'v8'), 'TOTAL': ('official', 'v8'),
}
s = open(os.path.join(HERE, '04-template.html')).read()
counts = []
for key, (a, b) in STEPS.items():
    g, n = geo(a, b)
    if key != 'TOTAL':
        counts.append(n)
    s = s.replace(f'B_GEO_{key}', pct(g, 1))
    print(f'geomean {key:8} {a}→{b}: {pct(g, 1)} ({n} metrics)')
lo, hi = min(counts), max(counts)
s = s.replace('B_NMETRICS', f'{lo}' if lo == hi else f'{lo}–{hi}')

s = s.replace('B_STEP_MIMALLOC_ROWS', chart('official', 'omimalloc', ['JSON.stringify escaped strings 1.8 MiB', 'Buffer.allocUnsafe 256 KiB chunk churn']))
s = s.replace('B_STEP_LTO_ROWS', chart('c20', 'lto', movers('c20', 'lto')))
s = s.replace('B_STEP_Z5_ROWS', chart('lto', 'znver5', ['Buffer.swap16 8 KiB holdout'] + movers('lto', 'znver5', skip=['Buffer.swap16 8 KiB holdout'])))
s = s.replace('B_STEP_C23_ROWS', chart('znver5', 'clang23', movers('znver5', 'clang23')))
s = s.replace('B_STEP_PGO_ROWS', chart('clang23', 'pgo'))
s = s.replace('B_STEP_PC_ROWS', chart('pgo', 'pc', drop=['Allocate 2M']))
V8_EXTRA = [n for n in rows if n.startswith('Buffer.copy') and '1 MiB' not in n] + ['Buffer frame encode/decode 256 B']
s = s.replace('B_STEP_V8_ROWS', chart('pc', 'v8', V8_EXTRA))

LESSON = [('JSON.parse RPC message', 'JSON.parse RPC message · heavily trained'),
          ('JSON.parse 0.5 MiB', 'JSON.parse 0.5 MiB · trained'),
          ('JSON.stringify RPC message', 'JSON.stringify RPC message · lightly trained'),
          ('JSON.stringify 0.5 MiB', 'JSON.stringify 0.5 MiB · lightly trained'),
          ('gzip level 1', 'gzip level 1 · not in the corpus')]
lesson = sorted(((delta(find(k), 'clang23', 'pgo'), label) for k, label in LESSON if significant(find(k), 'clang23', 'pgo')), key=lambda t: -t[0])
s = s.replace('B_PGO_LESSON_ROWS', '\n      '.join(f'<div data-value="{d * 100:.1f}">{html.escape(l)}</div>' for d, l in lesson))

def within(g):
    return 'On its own: <strong>within noise</strong> on these workloads.' if abs(g) < 0.01 else f'On its own: <strong>{pct(g, 1)}</strong> geomean.'
s = s.replace('B_LTO_TEXT', within(geo('c20', 'lto')[0]))
gz = find('gzip level 1')
gather_text = ''
if med(gz, 'gather'):   # the Clang 23 build without -mno-gather, measured for this note
    gather_text = (f"<strong>We build with <code>-mno-gather</code>.</strong> Without it, Clang 23 turns zlib's CRC32 loop into AVX-512 gathers, slow on Zen: "
                   f"gzip {med(gz, 'clang23') / 1024:.2f} → {med(gz, 'gather') / 1024:.2f} GiB/s. Compiler upgrades can regress: benchmark every step.")
s = s.replace('B_GATHER_TEXT', gather_text)
s = s.replace('B_C23_TEXT', f"On its own: <strong>{pct(geo('znver5', 'clang23')[0], 1)}</strong> geomean. A newer compiler isn't automatically faster: measure it (see the gather note in step 3).")

http, jp, rss = find('HTTP/1.1 loopback'), find('JSON.parse 0.5'), find('RSS for 2M')
heap, alloc = find('Live heap at full GC'), find('Allocate 2M')
s = s.replace('B_TOTAL_HTTP', pct(delta(http, 'official', 'v8')))
s = s.replace('B_TOTAL_JSON', pct(delta(jp, 'official', 'v8')))
s = s.replace('B_TOTAL_RSS', f'−{(1 - med(rss, "v8") / med(rss, "official")) * 100:.0f}%')
s = s.replace('B_PC_HEAP', f'−{(1 - med(heap, "pc") / med(heap, "pgo")) * 100:.0f}%')
s = s.replace('B_PC_RSS', f'−{(1 - med(rss, "pc") / med(rss, "pgo")) * 100:.0f}%')
s = s.replace('B_PC_ALLOC', pct(delta(alloc, 'pgo', 'pc')))
losses = sorted(((delta(rows[n], 'pgo', 'pc'), n) for n in PUBLIC if rows[n]['better'] == 'higher' and delta(rows[n], 'pgo', 'pc') is not None and significant(rows[n], 'pgo', 'pc')), key=lambda t: t[0])[:2]
s = s.replace('B_PC_COST', ', '.join(f'{html.escape(n)} {pct(d)}' for d, n in losses) + '.')
churn = find('RSS after 512 MiB Buffer churn')
s = s.replace('B_MIMALLOC_RSS', f'after 512 MiB of Buffer churn it keeps {med(churn, "omimalloc"):.0f} MiB resident vs {med(churn, "official"):.0f} MiB with glibc')

COLS = [('+mimalloc', 'official', 'omimalloc'), ('+LTO', 'c20', 'lto'),
        ('+znver5', 'lto', 'znver5'), ('Clang 23', 'znver5', 'clang23'), ('+PGO', 'clang23', 'pgo'),
        ('+ptr comp.', 'pgo', 'pc'), ('+V8 patch', 'pc', 'v8')]
def cell(row, a, b):
    d = delta(row, a, b)
    if d is None or abs(d) > 5:
        return '<td class="num">n/a</td>'
    if not significant(row, a, b):
        return '<td class="num noise">≈0</td>'
    return f'<td class="num {"win" if d > 0 else "loss"}">{pct(d)}</td>'
TABLE_ROWS = SHOW + [('Buffer.swap16', 'Buffer.swap16 8 KiB'), ('Buffer.copy 64 B', 'Buffer.copy 64 B'), ('RSS for 2M', 'RSS saved, 2M-object graph'),
                     ('Live heap at full GC', 'live heap saved, 1M records'), ('Full GC pause', 'full GC pause, 1M records')]
def tune_cell(sub):
    if TUNE is None:
        return ''
    hits = [r for n, r in TUNE.items() if sub.lower() in n.lower()]
    return cell(hits[0], 'official', 'tune') if hits else '<td class="num">n/a</td>'
trs = [f'<tr><td>{html.escape(label)}</td>' + tune_cell(sub) + ''.join(cell(find(sub), a, b) for _, a, b in COLS) + cell(find(sub), 'official', 'v8') + '</tr>'
       for sub, label in TABLE_ROWS]
table = ('<table class="data dense-table"><thead><tr><th></th>' + ('<th class="num">+tune</th>' if TUNE else '') + ''.join(f'<th class="num">{h}</th>' for h, _, _ in COLS) +
         '<th class="num">total</th></tr></thead><tbody>\n      ' + '\n      '.join(trs) + '\n    </tbody></table>')
s = s.replace('B_TABLE', table)
s = s.replace('B_TUNE_NOTE', ' · +tune: Step 0 flags on the official binary, a separate A/B; the build columns run untuned' if TUNE else '')

left = re.findall(r'\bB_[A-Z0-9_]+', s)
print('left placeholders:', left)
open(SLIDE, 'w').write(s)
print('wrote', SLIDE)
