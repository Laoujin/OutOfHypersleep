import './data.js'
import './art.js'
import './slides.js'

const HS = window.HS
const KEY = 'hypersleep-state-v1'
const fresh = () => ({ woken: [], events: {}, shown: { crew: 0, alien: 0 } })

const DEBUG_RESET_ON_RELOAD = true
const isReload = () => { try { return performance.getEntriesByType('navigation')[0]?.type === 'reload' } catch { return false } }
if (DEBUG_RESET_ON_RELOAD && isReload()) { try { localStorage.removeItem(KEY) } catch {} }

let state
try { state = { ...fresh(), ...JSON.parse(localStorage.getItem(KEY) || '{}') } }
catch { state = fresh() }

const listeners = new Set()
HS.state = () => state
HS.save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)) } catch {} }
HS.reset = () => { state = fresh(); HS.save() }
try { HS.photo = sessionStorage.getItem('hypersleep-photo') || null } catch { HS.photo = null }
HS.setPhoto = (url) => { HS.photo = url; try { sessionStorage.setItem('hypersleep-photo', url) } catch {} }

addEventListener('storage', (e) => {
  if (e.key !== KEY) return
  try { state = { ...fresh(), ...JSON.parse(e.newValue || '{}') } } catch {}
  HS.refreshActive()
})

const byId = {}
const seqs = {}
for (const s of HS.slides) {
  byId[s.id] = s
  ;(seqs[s.seq] = seqs[s.seq] || []).push(s.id)
}
for (const id in seqs) seqs[id].forEach((sid, i) => (byId[sid].idx = i))
HS.byId = byId
HS.seqs = seqs

let nav = null
HS.bindNav = (n) => { nav = n }
HS.currentId = () => nav?.currentSlideRoute.value?.meta?.slide?.frontmatter?.routeAlias
HS.refreshActive = () => listeners.forEach(fn => fn())
HS.onRefresh = (fn) => { listeners.add(fn); return () => listeners.delete(fn) }

const lastClick = id => (byId[id].steps || 1) - 1

HS.deckOf = (id) => {
  const seq = byId[id].seq
  if (seq === 'intro' || seq === 'map') return ''
  if (seq.startsWith('pod:')) return 'pod-' + seq.slice(4)
  return 'finale'
}
HS.deckSlides = deck => HS.slides.filter(s => HS.deckOf(s.id) === deck).map(s => s.id)
HS.currentDeck = () => { const id = HS.currentId(); return id && byId[id] ? HS.deckOf(id) : null }
HS.rootBase = () => {
  const b = import.meta.env.BASE_URL
  const d = HS.currentDeck()
  return d && b.endsWith(`/${d}/`) ? b.slice(0, -(d.length + 1)) : b
}
HS.go = (id, clicks = 0) => {
  const c = clicks < 0 ? lastClick(id) : clicks
  const deck = HS.deckOf(id)
  if (deck === HS.currentDeck()) return nav && nav.go(id, c)
  const no = HS.deckSlides(deck).indexOf(id) + 1
  location.href = `${HS.rootBase()}${deck ? deck + '/' : ''}#/${no}${c ? `?clicks=${c}` : ''}`
}

HS.ctx = (active, refresh) => ({ state, score: HS.score(state), save: HS.save, active, go: HS.go, refresh })

HS.live = {}
HS.votesOf = id => HS.live[id] || 0

HS.leader = () => {
  let best = null, max = 0
  for (const p of HS.pods) {
    const v = HS.votesOf(p.id)
    if (!state.woken.includes(p.id) && v > max) { max = v; best = p.id }
  }
  return best
}

HS.onLive = null
setInterval(async () => {
  if (HS.currentId() !== 'map') return
  try {
    const r = await fetch(HS.VOTE_URL + '/api/votes', { cache: 'no-store' })
    if (!r.ok) return
    const live = await r.json()
    if (JSON.stringify(live) === JSON.stringify(HS.live)) return
    HS.live = live
    HS.onLive && HS.onLive()
  } catch {}
}, 2000)

HS.deckUrl = deck => `${HS.rootBase()}${deck ? deck + '/' : ''}`

HS.openPod = (id) => {
  if (id === 'schrodinger') return HS.go(seqs.final[0])
  if (HS.overlay) HS.overlay.show(id)
}

HS.after = (id) => {
  const s = byId[id]
  if (s.seq === 'map') {
    const l = HS.leader()
    if (l) HS.openPod(l)
    return
  }
  const seq = seqs[s.seq]
  if (s.idx < seq.length - 1) return HS.go(seq[s.idx + 1])
  if (s.seq === 'intro') return HS.go('map')
  if (s.seq.startsWith('pod:')) { if (window.opener) return window.close(); return HS.go('map') }
  if (s.seq === 'final') return HS.go(seqs.outro[0])
}

HS.before = (id) => {
  const s = byId[id]
  const seq = seqs[s.seq]
  if (s.idx > 0) return HS.go(seq[s.idx - 1], -1)
  if (s.seq === 'map') return HS.go(seqs.intro[seqs.intro.length - 1], -1)
  if (s.seq === 'outro') return HS.go(seqs.final[seqs.final.length - 1], -1)
  if (s.seq !== 'intro') return HS.go('map')
}

export default HS
