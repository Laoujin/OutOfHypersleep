---
theme: none
favicon: favicon.svg
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
  sans: IBM Plex Sans
  serif: Chakra Petch
  mono: IBM Plex Mono
  weights: '400,500,600,700'
pod:
  id: mutation
  name: Mutation testing
  deck: verification
  order: 1
  frozen: 1978
  born: 1978
  power: 5
  fate: alive
  score:
    alive: 50
    dead: -40
  frozenBecause: Too slow and too expensive<br>it ran the whole suite for each mutant
  wokenBecause: Compute is cheap and agents write the tests. Who tests the tests?
  logTitle: Agents write the tests
  takeaway: Deterministic guardrails make sure they actually test something.
layout: hs
routeAlias: mutation-thaw
---

<Hs id="mutation-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: mutation-froze
---

<Hs id="mutation-froze" />

---
layout: hs
routeAlias: mutation-coverage
clicks: 2
---

<Hs id="mutation-coverage" />

<!--
The agent wrote the tests. Four passed, every line covered.
[click] Look closer: none of them can fail. toBeDefined asserts nothing, x equals x, it tests the mock, the snapshot pins whatever it printed.
[click] Mutate the code: zero mutants die. 100% coverage, 0% confidence.
-->

---
layout: hs
routeAlias: mutation-defect
---

<Hs id="mutation-defect" />

<!--
Defect insertion. If breaking the code can't make your test fail, it isn't a test.
Mutation testing does exactly this, automatically, thousands of times.
-->

---
layout: hs
routeAlias: mutation-why
clicks: 3
---

<Hs id="mutation-why" />

<!--
Background: Lipton 1971; DeMillo, Lipton & Sayward 1978. PIT (Java) and Stryker (JS/.NET) made it practical (to verify).
Agents write tests that confirm their own code. A surviving mutant proves the test asserts nothing.
Spin-off lightning talk: "Who Goes There?" (itenium-be/UnitTesting#4).

Six mutants planted in cart.ts: each one a small, deliberate bug.
[click] The suite sweeps. Two die, four survive: those lines are not really tested. Mutation score 33%.
[click] Hand the survivors to the agent: it writes the missing tests.
[click] Sweep again. All contained, 100%. Compute is cheap now: run it on every PR.
-->

---
layout: hs
routeAlias: mutation-log
---

<Hs id="mutation-log" />
