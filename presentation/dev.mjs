import { readdirSync } from 'node:fs'

const PORT = 4173
const base = '/OutOfHypersleep/'
const decks = ['slides.md', ...readdirSync('.').filter(f => f.endsWith('.md') && f !== 'slides.md' && f !== 'README.md').sort()]
  .map((file, i) => {
    const name = file === 'slides.md' ? '' : file.replace(/\.md$/, '')
    return { file, prefix: `${base}${name ? name + '/' : ''}`, port: 3100 + i }
  })

const procs = decks.map(d => Bun.spawn(['bunx', 'slidev', d.file, '--port', String(d.port), '--base', d.prefix], { stdout: 'ignore', stderr: 'inherit', env: { ...process.env, VITE_CACHE_DIR: `node_modules/.vite/${d.file}` } }))
const stop = () => { procs.forEach(p => p.kill()); process.exit() }
process.on('SIGINT', stop)
process.on('SIGTERM', stop)

// Main deck's prefix is a prefix of every other deck's, so match the longest first.
const byPrefix = [...decks].sort((a, b) => b.prefix.length - a.prefix.length)
const target = path => byPrefix.find(d => path.startsWith(d.prefix)) ?? decks[0]

Bun.serve({
  port: PORT,
  async fetch(req, server) {
    const url = new URL(req.url)
    if (url.pathname === '/') return Response.redirect(base)
    const d = target(url.pathname)
    if (req.headers.get('upgrade') === 'websocket') {
      const protocol = req.headers.get('sec-websocket-protocol') ?? undefined
      const ok = server.upgrade(req, { data: { url: `ws://localhost:${d.port}${url.pathname}${url.search}`, protocol }, headers: protocol ? { 'sec-websocket-protocol': protocol } : undefined })
      return ok ? undefined : new Response('upgrade failed', { status: 400 })
    }
    try {
      return await fetch(`http://localhost:${d.port}${url.pathname}${url.search}`, { method: req.method, headers: req.headers, body: req.body, redirect: 'manual' })
    } catch {
      return new Response(`${d.file} is still starting, reload in a moment`, { status: 503 })
    }
  },
  websocket: {
    open(ws) {
      const up = new WebSocket(ws.data.url, ws.data.protocol)
      ws.data.up = up
      ws.data.queue = []
      up.onopen = () => { ws.data.queue.forEach(m => up.send(m)); ws.data.queue = null }
      up.onmessage = e => ws.send(e.data)
      up.onclose = () => ws.close()
    },
    message(ws, msg) { ws.data.queue ? ws.data.queue.push(msg) : ws.data.up.send(msg) },
    close(ws) { ws.data.up?.close() },
  },
})

console.log(`${decks.length} decks at http://localhost:${PORT}${base}`)
