---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Code review
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
  id: codereview
  name: Code review
  sub: line by line, by a human
  deck: integration
  order: 3
  frozen: 1976
  born: 1976
  died: 2027
  power: 4
  fate: dead
  score:
    alive: 40
    dead: -30
  was: A second human reads every line before it lands. Fagan inspections in 1976, pull requests from 2008.
  diesBecause: Ten agents, forty PRs a day. Nobody reads 4,000 lines a day.
  takeaway: LGTM.
layout: hs
routeAlias: codereview-thaw
---

<Hs id="codereview-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: codereview-froze
---

<Hs id="codereview-froze" />

---
layout: hs
routeAlias: codereview-lgtm
clicks: 2
---

<Hs id="codereview-lgtm" />

<!--
Background: Fagan inspections, IBM 1976 (to verify). GitHub pull requests 2008. Death year placeholder.
Costs the audience this vote, alien +40.

Ten agents, forty PRs a day.
[click] Every one of them hundreds of lines nobody typed.
[click] Approved in eleven seconds. Be honest: who read all of it?
The real review moved into the gates: tests, types, hooks (see the Hooks pod).
-->

---
layout: hs
routeAlias: codereview-log
---

<Hs id="codereview-log" />
