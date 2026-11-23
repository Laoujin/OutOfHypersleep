---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Stack Overflow
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
  id: stackoverflow
  name: Stack Overflow
  deck: cargo
  order: 1
  frozen: 2008
  born: 2008
  died: 2023
  power: 5
  fate: dead
  score:
    alive: 50
    dead: -40
  was: The crew's shared memory. Every error you pasted into a search bar ended up here.
  takeaway: Not every crew member survives the thaw.
  diesBecause: Questions are answered inside the agent now. Volume collapsed after 2023.
layout: hs
routeAlias: stackoverflow-thaw
---

<Hs id="stackoverflow-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: stackoverflow-froze
---

<Hs id="stackoverflow-froze" />

---
layout: hs
routeAlias: stackoverflow-chart
clicks: 3
---

<Hs id="stackoverflow-chart" />

<!--
Source: Stack Exchange Data Explorer, new questions per month (deleted posts excluded), presentation/data/stackoverflow-questions.csv. Current month is dropped (incomplete).
Let the chart do the talking.
[click] Peak March 2014, ~207k a month. Then a long, slow plateau: decline was already there before AI.
[click] Nov 2022, ChatGPT. Collapse.
[click] Oct 2026: 844 questions. Fewer than in its first month, Aug 2008 (3,744). −99.6%.
-->

---
layout: hs
routeAlias: stackoverflow-irony
clicks: 3
---

<Hs id="stackoverflow-irony" />

<!--
Today the question never leaves the IDE: the agent has your code, answers instantly, no snark.
[click] Where did it learn that?
[click] From Stack Overflow. The public answers went into the training sets.
[click] 2024: Stack Overflow licenses its data (OverflowAPI) to Google (Feb) and OpenAI (May). To verify.
Question counts on the left are illustrative vote counts, ~24M questions is approximate: to verify.
-->

---
layout: hs
routeAlias: stackoverflow-well
clicks: 3
---

<Hs id="stackoverflow-well" />

<!--
The loop that fed every model: bug, public question, answer, index, training.
[click] The question now goes to the agent, in private. The public loop breaks.
[click] Nothing new goes into the well.
[click] Open question for the audience: who answers next year's framework?
-->

---
layout: hs
routeAlias: stackoverflow-woke
---

<Hs id="stackoverflow-woke" />

---
layout: hs
routeAlias: stackoverflow-log
---

<Hs id="stackoverflow-log" />
