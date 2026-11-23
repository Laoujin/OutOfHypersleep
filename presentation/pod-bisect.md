---
theme: none
favicon: favicon.svg
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
layout: hs
routeAlias: bisect
clicks: 2
---

<Hs id="bisect" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+40).
`git bisect run` landed in Git 1.5 (2007, to verify).
64 commits = 6 test runs. Humans skipped it because each step needed a human. Agents don't get bored.
-->

---
layout: hs
routeAlias: bisect-why
clicks: 7
---

<Hs id="bisect-why" />

<!--
git bisect: binary search through history. By hand: build, run, mark good/bad, repeat. Tedious, so nobody did it.
Step through the halvings: 64 → 32 → 16 → 8 → 4 → 2 → 1.
(last step) git bisect run: the script decides good/bad. An agent kicks it off and comes back with the culprit commit.
-->
