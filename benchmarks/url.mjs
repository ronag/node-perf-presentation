// Benchmark: parsing an HTTP request target the way a server sees it.
// Every request brings a FRESH string (from the socket), so each iteration
// gets a new string, created outside the timed region (mitata computed
// parameters). With one constant string V8 reuses work across iterations and
// regex-based parsers look much faster than they are.
// The base URL is built from the Host header per request, as a server must.
import { run, bench, group, summary, do_not_optimize } from 'mitata'
import url from 'node:url'

let parseTarget = null
try {
  parseTarget = (await import('request-target')).default
} catch {
  console.log('(request-target not installed; skipping it)')
}

const host = 'example.com:8080'
const shapes = {
  '20 chars': (i) => `/api/v1/items/${i % 100000}`,
  '60 chars': (i) => `/api/v1/assets/${i}/renditions?fields=title,duration&limit=50`,
  '200 chars': (i) => `/media/2026/09/29/${i}/clip.mp4?token=${'a1b2c3d4'.repeat(12)}&range=0-1048575&sig=${'Zx9'.repeat(10)}`,
}

// Hand-rolled: split path and query, which is all most handlers need
function splitTarget (target) {
  const q = target.indexOf('?')
  return q === -1
    ? { pathname: target, search: '' }
    : { pathname: target.slice(0, q), search: target.slice(q) }
}

let n = 0
const fresh = (make) => () => make(n++) // new string every iteration

for (const [label, make] of Object.entries(shapes)) {
  summary(() => {
    group(`parse a ${label} request target (fresh string per request)`, () => {
      bench('new URL(target, `http://${host}`)', function * () {
        yield { [0]: fresh(make), bench: (t) => do_not_optimize(new URL(t, `http://${host}`)) }
      })
      bench('URL.parse(target, `http://${host}`)', function * () {
        yield { [0]: fresh(make), bench: (t) => do_not_optimize(URL.parse(t, `http://${host}`)) }
      })
      bench('url.parse(target) (legacy)', function * () {
        yield { [0]: fresh(make), bench: (t) => do_not_optimize(url.parse(t)) }
      })
      if (parseTarget) {
        bench('request-target', function * () {
          yield { [0]: fresh(make), bench: (t) => do_not_optimize(parseTarget({ url: t, headers: { host } })) }
        })
      }
      bench('indexOf("?") + slice', function * () {
        yield { [0]: fresh(make), bench: (t) => do_not_optimize(splitTarget(t)) }
      })
    })
  })
}

await run()
