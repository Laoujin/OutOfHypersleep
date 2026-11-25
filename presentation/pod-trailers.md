---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Commit trailers
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
  id: trailers
  name: Commit trailers
  deck: ship
  order: 2
  frozen: 2014
  born: 2014
  power: 1
  fate: alive
  score: -10
  frozenBecause: "No one had ever heard of this niche git feature.<small>Even now you're thinking: what the hell is he talking about?</small>"
  wokenBecause: "Every agent commit carries <code>Co-Authored-By</code>. Suddenly <code>git log</code> knows who really wrote main."
  takeaway: The alien signs its work.
layout: hs
routeAlias: trailers-thaw
---

<Hs id="trailers-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: trailers-froze
---

<Hs id="trailers-froze" />

---
layout: hs
routeAlias: trailers-why
clicks: 2
---

<Hs id="trailers-why" />

<!--
Background: `git interpret-trailers`: Git 2.2, 2014 (to verify).
The twist: revived, but it scores for the alien. Every Co-Authored-By trailer is the alien's mark on your history.
Surprise: the audience has been looking at one for two years without knowing the name.

Everyone has seen the last line, almost nobody knows it is called a trailer.
Git can add one for you: git commit --trailer (Git 2.32, 2021, to verify).
[click] The result: on every commit the agent makes. git interpret-trailers, since 2014; Signed-off-by is the famous one.
[click] Scoring twist: revived, but it scores for the alien: alien +10. The alien's mark on every commit.
-->

---
layout: hs
routeAlias: trailers-log
---

<Hs id="trailers-log" />
