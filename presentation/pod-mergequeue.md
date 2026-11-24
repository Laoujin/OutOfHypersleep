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
routeAlias: mergequeue-race
clicks: 4
---

<Hs id="mergequeue-race" />

<!--
Background: bors (Rust, 2013) after Graydon Hoare's "not rocket science rule": keep main always green. Zuul (OpenStack) around the same time. GitHub merge queue GA: 2023. All to verify.
"Only Google-scale needed this." Google-scale used to mean 1000 engineers. Now it means you plus 20 agents.

The agent is green and wants to land.
[click] Fast-forward fails: another agent landed fix/i18n.
[click] Rebase: no textual conflict. Build breaks anyway: feat/discount renamed calcTotals to computeTotals. Semantic conflict.
[click] Fixed, green again. main moved again.
[click] The agent gives up: "tell me when nobody else is landing". This is how the Dark Factory talk started: I needed a merge queue.
-->

---
layout: hs
routeAlias: mergequeue-lander
clicks: 6
---

<Hs id="mergequeue-lander" />

<!--
Serialize the landing: one lane to main.

[click] Every agent pushes its branch into one queue.
[click] Rebase onto the latest main.
[click] Build.
[click] Test exactly the commit that will land.
[click] merge --ff-only. Nobody lands in between, so main is never red.
[click] Red? The branch bounces back to its agent, the next one rolls in.
-->

---
layout: hs
routeAlias: mergequeue-jam
clicks: 3
---

<Hs id="mergequeue-jam" />

<!--
The queue itself becomes the bottleneck. 20 agents, 10 minute pipeline: the last one lands after 3h20.

[click] Batch: test main + A + B + C + D in one run (bors, GitHub merge queue). Green: all four land.
[click] Red: bisect the batch, bounce the culprit. Buys time, doesn't remove the wall.
[click] Where I ended up: stop running the full suite on every merge. main is red a lot. A dedicated agent fixes forward.
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
