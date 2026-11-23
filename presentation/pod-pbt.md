---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Property-based testing
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
  id: pbt
  name: Property-based testing
  deck: verification
  order: 2
  frozen: 1999
  born: 1999
  power: 5
  fate: alive
  score:
    alive: 50
    dead: -40
  frozenBecause: Seen as academic. Generators are hard to write.
  wokenBecause: Agents write the generators. Properties catch what an agent's own examples only confirm.
layout: hs
routeAlias: pbt-why
clicks: 3
---

<Hs id="pbt-why" />

<!--
Background: QuickCheck (Claessen & Hughes, ICFP 2000; written 1999, to verify). Hypothesis, fast-check, FsCheck, jqwik.
The agent that wrote the code also picks the examples: of course they pass. A generator does not share its blind spots.

Property-based testing: QuickCheck, ~1999. Frozen as academic; writing generators was the hard part.
[click] Agents write generators happily.
[click] A counterexample.
[click] Shrinking: the minimal failing input. The agent's blind spots are not the generator's blind spots.
-->
