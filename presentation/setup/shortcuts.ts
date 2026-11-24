import { defineShortcutsSetup } from '@slidev/types'
import { useNav } from '@slidev/client'
import HS from '../hs/hub.js'

export default defineShortcutsSetup((_ops, base) => {
  const nav = useNav()
  HS.bindNav(nav)
  const cur = () => HS.currentId()

  const next = () => {
    if (HS.overlay?.active) return HS.overlay.next()
    const id = cur()
    if (!id || !HS.byId[id]) return nav.next()
    if (nav.clicks.value < nav.clicksTotal.value) return nav.next()
    HS.after(id)
  }
  const prev = () => {
    if (HS.overlay?.active) return HS.overlay.prev()
    const id = cur()
    if (!id || !HS.byId[id]) return nav.prev()
    if (nav.clicks.value > 0) return nav.prev()
    HS.before(id)
  }
  const nextSlide = () => { const id = cur(); id && HS.byId[id] ? HS.after(id) : nav.nextSlide() }
  const prevSlide = () => { const id = cur(); id && HS.byId[id] ? HS.before(id) : nav.prevSlide() }

  let replayTimer: ReturnType<typeof setInterval> | undefined
  const replay = () => {
    const id = cur()
    if (!id) return
    clearInterval(replayTimer)
    const target = nav.clicks.value
    HS.go(id, 0)
    let k = 0
    replayTimer = setInterval(() => { if (++k > target) return clearInterval(replayTimer); HS.go(id, k) }, 900)
  }

  const fns: Record<string, () => void> = {
    next_space: next, next_right: next, next_page_key: next,
    prev_space: prev, prev_left: prev, prev_page_key: prev,
    next_down: nextSlide, next_shift: nextSlide,
    prev_up: prevSlide, prev_shift: prevSlide,
  }

  return [
    ...base.map(s => (s.name && fns[s.name] ? { ...s, fn: fns[s.name] } : s)),
    { name: 'hs_close_pod', key: 'escape', fn: () => { if (HS.overlay?.active) HS.overlay.cancel() } },
    { name: 'hs_map', key: 'm', fn: () => HS.go('map') },
    { name: 'hs_intermezzo', key: 'i', fn: () => HS.go(HS.seqs.intermezzo[0]) },
    { name: 'hs_final', key: 'e', fn: () => HS.go(HS.seqs.final[0]) },
    { name: 'hs_scoreboard', key: 's', fn: () => HS.go('scoreboard') },
    { name: 'hs_about', key: 'a', fn: () => HS.go('about') },
    { name: 'hs_replay', key: 'r', fn: replay },
    { name: 'hs_fullscreen', key: 'f', fn: () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen()) },
    { name: 'hs_reset', key: 'x', fn: () => { if (confirm('Reset the game (woken pods, events, score)?')) { HS.reset(); HS.go('title') } } },
  ]
})
