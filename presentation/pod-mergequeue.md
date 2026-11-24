---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Merge queue
info: |
  Obscure dev tooling that sat frozen for years until AI agents woke it up.
  Source: https://github.com/itenium-be/git-worktrees/issues/3
author: Wouter Van Schandevijl
canvasWidth: 1600
aspectRatio: 16/9
colorSchema: dark
transition: fade
download: false
routerMode: hash
wakeLock: false
fonts:
  sans: IBM Plex Sans
  serif: Chakra Petch
  mono: IBM Plex Mono
  weights: '400,500,600,700'
pod:
  id: mergequeue
  name: Merge queue
  deck: integration
  order: 1
  frozen: 2013
  born: 2013
  power: 3
  fate: alive
  score:
    alive: 30
    dead: -40
  frozenBecause: '"Only Google-scale needed this."'
  wokenBecause: 20 green branches at once. Each is green alone; together they break main.
layout: hs
routeAlias: mergequeue-thaw
---

<Hs id="mergequeue-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: mergequeue-froze
---

<Hs id="mergequeue-froze" />

---
layout: hs
routeAlias: mergequeue-landing
clicks: 2
---

<Hs id="mergequeue-landing" />

<!--
Background: bors (Rust, 2013) after Graydon Hoare's "not rocket science rule": keep main always green. Zuul (OpenStack) around the same time. GitHub merge queue GA: 2023. All to verify.
"Only Google-scale needed this." Google-scale used to mean 1000 engineers. Now it means you plus 20 agents.

Ten agents, ten green branches, all ready to land.
[click] They all land at once. main is red. Whose fault? Nobody's. Everybody's. This is how the Dark Factory talk started: I needed a merge queue.
[click] One lane. One at a time.
-->

---
layout: hs
routeAlias: mergequeue-airlock
---

<Hs id="mergequeue-airlock" />

<!--
Serialize the landing: one at a time through the airlock. Runs on its own, no clicks.

Each branch: rebase onto the latest main, build, test exactly the commit that will land, merge --ff-only. Nobody lands in between, so main is never red.
A red one would bounce back to its agent and the next one rolls in.
-->

---
layout: hs
routeAlias: mergequeue-woke
---

<Hs id="mergequeue-woke" />

---
layout: hs
routeAlias: mergequeue-log
---

<Hs id="mergequeue-log" />
