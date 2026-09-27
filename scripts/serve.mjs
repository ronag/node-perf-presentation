// Zero-dependency static server for the deck (works offline at the venue).
// Usage: node scripts/serve.mjs [port]   (default 8000)
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = Number(process.argv[2] ?? process.env.PORT ?? 8000)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.map': 'application/json',
}

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  let file = path.join(root, decodeURIComponent(url.pathname))
  if (!file.startsWith(root)) {
    res.writeHead(403).end()
    return
  }
  if (file.endsWith(path.sep)) file = path.join(file, 'index.html')
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404, { 'content-type': 'text/plain' }).end('not found')
      return
    }
    res.writeHead(200, {
      'content-type': types[path.extname(file)] ?? 'application/octet-stream',
      'cache-control': 'no-cache',
    })
    res.end(data)
  })
}).listen(port, () => {
  console.log(`Slides: http://localhost:${port}/   (S = speaker view, ESC = overview)`)
})
