import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

const here = path.dirname(new URL(import.meta.url).pathname)
const PORT = +(process.env.PORT || 3000)
const PODS_DIR = process.env.PODS_DIR || path.join(here, '..', 'presentation')
const DATA_DIR = process.env.DATA_DIR || path.join(here, 'data')
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || ''
const VOTES_FILE = path.join(DATA_DIR, 'votes.json')

const DECKS = ['plan', 'build', 'check', 'ship']
const frontmatter = src => parse(src.split(/^---\s*$/m)[1] || '') || {}
const pods = fs.readdirSync(PODS_DIR)
  .filter(f => /^pod-.+\.md$/.test(f))
  .map(f => frontmatter(fs.readFileSync(path.join(PODS_DIR, f), 'utf8')).pod)
  .filter(Boolean)
  .map(({ id, deck, order, frozen, power }) => ({ id, deck, order, frozen, power }))
  .sort((a, b) => DECKS.indexOf(a.deck) - DECKS.indexOf(b.deck) || (a.order ?? 99) - (b.order ?? 99))
const podIds = new Set(pods.map(p => p.id))

fs.mkdirSync(DATA_DIR, { recursive: true })
let votes = {}
try { votes = JSON.parse(fs.readFileSync(VOTES_FILE, 'utf8')) } catch {}
for (const id of podIds) votes[id] = new Set(votes[id] || [])

const save = () => {
  const out = Object.fromEntries(Object.entries(votes).map(([k, v]) => [k, [...v]]))
  fs.writeFileSync(VOTES_FILE + '.tmp', JSON.stringify(out))
  fs.renameSync(VOTES_FILE + '.tmp', VOTES_FILE)
}
const counts = () => Object.fromEntries(pods.map(p => [p.id, votes[p.id].size]))

const send = (res, status, body, type = 'application/json') => {
  res.writeHead(status, {
    'content-type': type,
    'cache-control': 'no-store',
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, PUT, DELETE, POST, OPTIONS',
    'access-control-allow-headers': 'content-type, authorization',
  })
  res.end(type === 'application/json' ? JSON.stringify(body) : body)
}

const statics = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/app.css': ['app.css', 'text/css; charset=utf-8'],
  '/favicon.svg': ['favicon.svg', 'image/svg+xml'],
}

const VOTER = /^[a-zA-Z0-9-]{8,64}$/

http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  const p = url.pathname
  if (req.method === 'OPTIONS') return send(res, 204, '', 'text/plain')
  if (req.method === 'GET' && statics[p]) {
    const [file, type] = statics[p]
    return send(res, 200, fs.readFileSync(path.join(here, 'public', file)), type)
  }
  if (req.method === 'GET' && p === '/health') return send(res, 200, { ok: true })
  if (req.method === 'GET' && p === '/api/pods') return send(res, 200, { pods, votes: counts() })
  if (req.method === 'GET' && p === '/api/votes') return send(res, 200, counts())

  const m = p.match(/^\/api\/votes\/([\w-]+)$/)
  if (m && (req.method === 'PUT' || req.method === 'DELETE')) {
    const voter = url.searchParams.get('voter') || ''
    if (!podIds.has(m[1])) return send(res, 404, { error: 'unknown pod' })
    if (!VOTER.test(voter)) return send(res, 400, { error: 'bad voter' })
    votes[m[1]][req.method === 'PUT' ? 'add' : 'delete'](voter)
    save()
    return send(res, 200, counts())
  }

  if (req.method === 'POST' && p === '/api/reset') {
    if (!ADMIN_TOKEN || req.headers.authorization !== `Bearer ${ADMIN_TOKEN}`) return send(res, 403, { error: 'forbidden' })
    for (const id of podIds) votes[id] = new Set()
    save()
    return send(res, 200, counts())
  }

  send(res, 404, { error: 'not found' })
}).listen(PORT, () => console.log(`voting on :${PORT} · ${pods.length} pods from ${PODS_DIR}`))
