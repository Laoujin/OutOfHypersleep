---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Markdown
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
  id: markdown
  name: Markdown
  deck: plan
  order: 2
  frozen: 2004
  born: 2004
  power: 5
  fate: alive
  score:
    alive: 50
    dead: -40
  frozenBecause: A plain-text format for READMEs.<br>The real docs lived in Word and Confluence.
  frozenSub: Nobody read the README anyway.
  wokenBecause: Agents read it, write it and think in it.<br>Every prompt, plan, skill and answer is Markdown.
  logTitle: The agent's native tongue
  takeaway: Nobody read the README.<br>Now the crew reads every word.
layout: hs
routeAlias: markdown-thaw
---

<Hs id="markdown-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: markdown-froze
---

<Hs id="markdown-froze" />

<!--
Born Monday 15 March 2004: John Gruber, "Introducing Markdown" on Daring Fireball, with Aaron Swartz.
-->

---
layout: hs
routeAlias: markdown-announce
clicks: 1
---

<Hs id="markdown-announce" />

<!--
John Gruber, "Introducing Markdown", Daring Fireball, 15 March 2004 (verbatim).
Design goal from the project page: "publishable as-is, as plain text, without looking like it's been marked up". Biggest inspiration: plain text email.
[click] Twenty years later, the web writers are agents.
-->

---
layout: hs
routeAlias: markdown-readme
clicks: 1
---

<Hs id="markdown-readme" />

<!--
facebook/react CLAUDE.md, verbatim first 12 lines (fetched 2026-11-24, main branch).
Nobody renders it. The agent reads the raw text, every session.
ADRs: architecture decisions as Markdown files in the repo (Michael Nygard, 2011, to verify). Agents read why the code is the way it is, not just what it is.
Agents handle Markdown natively; docx, PDF and friends not so much: they have to be converted first and cost far more tokens. Markdown has real headers (#, ##); in a docx a "header" is often just bold text, so the structure is lost.
[click] agents.md: "used by over 60k open-source projects" (to verify the current count).
-->

---
layout: hs
routeAlias: markdown-log
---

<Hs id="markdown-log" />
