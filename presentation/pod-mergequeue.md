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
  power: 5
  fate: alive
  score:
    alive: 50
    dead: -40
  frozenBecause: '"Only Google-scale needs this."'
  wokenBecause: 20 green branches at once. Each is green alone; together they break main.
layout: hs
routeAlias: mergequeue-why
clicks: 3
---

<Hs id="mergequeue-why" />

<!--
Background: bors (Rust, 2013) after Graydon Hoare's "not rocket science rule". Zuul (OpenStack) around the same time. GitHub merge queue GA: 2023. All to verify.
The Dark Factory talk started exactly here: I needed a merge queue.

"Only Google-scale needs this." Google-scale used to mean 1000 engineers. Now it means you plus 20 agents.
[click] Five branches, all green.
[click] Semantic conflicts: no textual conflict, but together they break.
[click] The queue: test the combination, bounce the one that breaks. This is how the Dark Factory talk started: I needed a merge queue.
-->
