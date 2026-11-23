---
theme: none
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
  sans: Inter
  mono: JetBrains Mono
layout: hs
routeAlias: mergequeue
clicks: 2
---

<Hs id="mergequeue" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
bors (Rust, 2013) after Graydon Hoare's "not rocket science rule". Zuul (OpenStack) around the same time. GitHub merge queue GA: 2023. All to verify.
The Dark Factory talk started exactly here: I needed a merge queue.
-->

---
layout: hs
routeAlias: mergequeue-why
clicks: 3
---

<Hs id="mergequeue-why" />

<!--
"Only Google-scale needs this." Google-scale used to mean 1000 engineers. Now it means you plus 20 agents.
[click] Five branches, all green.
[click] Semantic conflicts: no textual conflict, but together they break.
[click] The queue: test the combination, bounce the one that breaks. This is how the Dark Factory talk started: I needed a merge queue.
-->
