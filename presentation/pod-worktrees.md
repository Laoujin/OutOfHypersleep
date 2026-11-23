---
theme: none
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
  sans: Inter
  mono: JetBrains Mono
layout: hs
routeAlias: worktrees
clicks: 2
---

<Hs id="worktrees" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
Shipped in Git 2.5 (July 2015). For ten years it was the hotfix side door: "keep your feature branch open, fix prod in a second folder".
What changed: three agents in one checkout trample each other's files and switch branches under each other's feet.
The how is in the Git Worktrees deck. Here: why it woke up.
-->

---
layout: hs
routeAlias: worktrees-why
clicks: 3
---

<Hs id="worktrees-why" />

<!--
Three agents in one folder: show the collisions.
[click] Branch switches under someone else's feet; files change on disk mid-edit; three npm installs fight over the lockfile.
[click] Worktrees: one object store, a working directory per agent. Cheap: no re-clone.
[click] git worktree add. That's it. Ten years in the freezer as "the hotfix trick".
-->
