---
theme: none
title: Out of Hypersleep · git bisect run
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
  sans: Inter
  mono: JetBrains Mono
pod:
  id: bisect
  name: git bisect run
  deck: integration
  order: 3
  frozen: 2007
  born: 2007
  power: 4
  fate: alive
  score:
    alive: 40
    dead: -40
  frozenBecause: "Bisecting by hand is tedious: build, test, mark good or bad, repeat."
  wokenBecause: An agent runs it unattended and reports the culprit.
layout: hs
routeAlias: bisect-why
clicks: 7
---

<Hs id="bisect-why" />

<!--
Background: `git bisect run` landed in Git 1.5 (2007, to verify).
64 commits = 6 test runs. Humans skipped it because each step needed a human. Agents don't get bored.

git bisect: binary search through history. By hand: build, run, mark good/bad, repeat. Tedious, so nobody did it.
Step through the halvings: 64 → 32 → 16 → 8 → 4 → 2 → 1.
(last step) git bisect run: the script decides good/bad. An agent kicks it off and comes back with the culprit commit.
-->
