---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Story points
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
  wip: true
  id: storypoints
  name: Story points
  sub: planning poker
  deck: cargo
  order: 3
  frozen: 2025
  born: 2002
  died: 2025
  power: 3
  fate: dead
  score:
    alive: 30
    dead: -40
  diesBecause: Why estimate something that takes 4 minutes to build?
layout: hs
routeAlias: storypoints-thaw
---

<Hs id="storypoints-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: storypoints-froze
---

<Hs id="storypoints-froze" />

---
layout: hs
routeAlias: storypoints-poker
clicks: 2
---

<Hs id="storypoints-poker" />

<!--
Background: Dies because: Why estimate something that takes 4 minutes to build?
Costs the audience this vote, alien +40.
Planning poker: James Grenning, 2002 (to verify). Death year placeholder (TBD in the source).
The estimation meeting took longer than the build.

Why estimate something that takes 4 minutes to build?
The alien eats story points. Some will cheer.
-->

---
layout: hs
routeAlias: storypoints-woke
---

<Hs id="storypoints-woke" />

---
layout: hs
routeAlias: storypoints-log
---

<Hs id="storypoints-log" />
