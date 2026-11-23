---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Formal methods
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
  id: formal
  name: Formal methods
  sub: TLA+ · Dafny · Lean
  deck: verification
  order: 3
  frozen: 1999
  born: 1999
  power: 3
  fate: alive
  score:
    alive: 30
    dead: -40
  frozenBecause: Far too expensive to write the proofs.
  wokenBecause: LLMs write the proofs. A proof checker is backpressure that can't be argued with.
layout: hs
routeAlias: formal-thaw
---

<Hs id="formal-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: formal-froze
---

<Hs id="formal-froze" />

---
layout: hs
routeAlias: formal-why
clicks: 3
---

<Hs id="formal-why" />

<!--
Background: TLA+: Lamport, 1999 (to verify). Dafny 2009, Lean 2013.
The LLM is very good at sounding right. The checker does not care how it sounds.
Keep it light: nobody in the room has to write TLA+ on Monday.

Formal methods: TLA+, Dafny, Lean. Frozen because writing proofs cost more than the code.
[click] A checker is the purest form of backpressure: no persuasion possible.
[click] Loop until it passes.
[click] Keep it light: the point is the cost moved, not that everyone should write TLA+.
-->

---
layout: hs
routeAlias: formal-woke
---

<Hs id="formal-woke" />

---
layout: hs
routeAlias: formal-log
---

<Hs id="formal-log" />
