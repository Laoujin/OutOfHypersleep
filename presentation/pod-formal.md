---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Formal methods
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
routeAlias: formal
clicks: 2
---

<Hs id="formal" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+30).
TLA+: Lamport, 1999 (to verify). Dafny 2009, Lean 2013.
The LLM is very good at sounding right. The checker does not care how it sounds.
Keep it light: nobody in the room has to write TLA+ on Monday.
-->

---
layout: hs
routeAlias: formal-why
clicks: 3
---

<Hs id="formal-why" />

<!--
Formal methods: TLA+, Dafny, Lean. Frozen because writing proofs cost more than the code.
[click] A checker is the purest form of backpressure: no persuasion possible.
[click] Loop until it passes.
[click] Keep it light: the point is the cost moved, not that everyone should write TLA+.
-->
