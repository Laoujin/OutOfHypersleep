---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · git worktree
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
  id: worktrees
  name: git worktree
  deck: isolation
  order: 1
  frozen: 2015
  born: 2015
  power: 5
  fate: alive
  score:
    alive: 50
    dead: -40
  frozenBecause: One developer only ever needs one checkout. <code>git stash</code> was good enough.
  wokenBecause: "N agents on one repo: each needs its own working directory and branch."
layout: hs
routeAlias: worktrees-why
clicks: 3
---

<Hs id="worktrees-why" />

<!--
Background: Shipped in Git 2.5 (July 2015). For ten years it was the hotfix side door: "keep your feature branch open, fix prod in a second folder".
What changed: three agents in one checkout trample each other's files and switch branches under each other's feet.
The how is in the Git Worktrees deck. Here: why it woke up.

Three agents in one folder: show the collisions.
[click] Branch switches under someone else's feet; files change on disk mid-edit; three npm installs fight over the lockfile.
[click] Worktrees: one object store, a working directory per agent. Cheap: no re-clone.
[click] git worktree add. That's it. Ten years in the freezer as "the hotfix trick".
-->
