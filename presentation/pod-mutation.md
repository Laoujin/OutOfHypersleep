---
theme: none
title: Out of Hypersleep · Mutation testing
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
routeAlias: mutation
clicks: 2
---

<Hs id="mutation" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
Lipton 1971; DeMillo, Lipton & Sayward 1978. PIT (Java) and Stryker (JS/.NET) made it practical (to verify).
Agents write tests that confirm their own code. A surviving mutant proves the test asserts nothing.
Spin-off lightning talk: "Who Goes There?" (itenium-be/UnitTesting#4).
-->

---
layout: hs
routeAlias: mutation-why
clicks: 3
---

<Hs id="mutation-why" />

<!--
Mutation testing: 1970s. Frozen because you run the whole suite once per mutant: too slow.
[click] A surviving mutant proves the tests do not check that line.
[click] Feed survivors back to the agent: it writes the missing test.
[click] Compute is cheap now, and the agent does the boring part. Spin-off: "Who Goes There?".
-->
