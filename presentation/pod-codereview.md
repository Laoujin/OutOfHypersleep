---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Code review
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
  id: codereview
  name: Code review
  sub: line by line, by a human
  deck: integration
  order: 3
  frozen: 1976
  born: 1976
  died: 2027
  power: 4
  fate: dead
  score:
    alive: 40
    dead: -30
  was: A second human reads every line before it lands. <br>Fagan Inspections from 1976<br>Pull Requests from 2008
  diesBecause: Ten agents, forty PRs a day. Nobody reads 4,000 lines a day.
  takeaway: LGTM.
layout: hs
routeAlias: codereview-thaw
---

<Hs id="codereview-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: codereview-froze
---

<Hs id="codereview-froze" />

---
layout: hs
routeAlias: codereview-eras
clicks: 4
---

<Hs id="codereview-eras" />

<!--
Fifty years of code review, one era per click. Meter top right: lines read per hour (all rates to verify).
1976 Fagan inspection at IBM: printout, red pen, moderator, reader, checklist. ~150 lines/hour, max 2 hours.
[click] 1992: a patch on the mailing list. Quote the diff, argue inline.
[click] 2008: GitHub pull request. Review moves to the browser, still line by line. ~400 lines/hour.
[click] 2026: one of forty PRs today. 4,012 lines nobody typed. Let it scroll all the way down.
[click] LGTM. Be honest: who read all of it?
Costs the audience this vote, alien +30.
-->

---
layout: hs
routeAlias: codereview-log
---

<Hs id="codereview-log" />
