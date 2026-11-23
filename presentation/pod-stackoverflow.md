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
  frozen: 2023
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
Background: Dies because: Questions are answered inside the agent now. Volume collapsed after 2023.
Costs the audience this vote, alien +40.
The best-known dead pod. Show the numbers: monthly new questions from peak to today.
Numbers on the chart are approximate placeholders: replace with a Stack Exchange Data Explorer query before giving the talk.

The best-known dead pod. Let the chart do the talking.
[click] Plateau and slow decline already before AI.
[click] After late 2022: collapse.
[click] The message of its own: not every old practice survives the AI era.
TODO before giving the talk: replace placeholder figures with real SEDE numbers.
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
