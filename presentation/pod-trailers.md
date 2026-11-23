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
  deck: integration
  order: 2
  frozen: 2014
  born: 2014
  power: 3
  fate: alive
  score:
    alive: -10
    dead: -40
  frozenBecause: Nobody knew they existed (except kernel devs and <code>Signed-off-by</code>).
  wokenBecause: "Every AI commit carries <code>Co-Authored-By</code>: the alien's mark."
layout: hs
routeAlias: trailers-why
clicks: 3
---

<Hs id="trailers-why" />

<!--
Background: `git interpret-trailers`: Git 2.2, 2014 (to verify).
The twist: this crew member costs the crew points. Every Co-Authored-By trailer is the alien's mark on your history.
Surprise: the audience has been looking at one for two years without knowing the name.

Ask the room: who recognises the last line? Everyone has seen it, almost nobody knows it is called a trailer.
[click] git interpret-trailers, since 2014. Signed-off-by is the famous one.
[click] They are structured: git log can filter and count them.
[click] Scoring twist: commit trailers give the crew NEGATIVE points. The alien's mark on every commit. The number on screen is illustrative.
-->
