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
  sans: Inter
  mono: JetBrains Mono
layout: hs
routeAlias: pbt
clicks: 2
---

<Hs id="pbt" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
QuickCheck (Claessen & Hughes, ICFP 2000; written 1999, to verify). Hypothesis, fast-check, FsCheck, jqwik.
The agent that wrote the code also picks the examples: of course they pass. A generator does not share its blind spots.
-->

---
layout: hs
routeAlias: pbt-why
clicks: 3
---

<Hs id="pbt-why" />

<!--
Property-based testing: QuickCheck, ~1999. Frozen as academic; writing generators was the hard part.
[click] Agents write generators happily.
[click] A counterexample.
[click] Shrinking: the minimal failing input. The agent's blind spots are not the generator's blind spots.
-->
