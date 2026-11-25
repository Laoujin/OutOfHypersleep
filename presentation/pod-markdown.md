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
  score: 50
  frozenBecause: A plain-text format for READMEs.<br>The real docs lived in Word and Confluence.
  frozenSub: Nobody read the README anyway.
  wokenBecause: Agents read it, write it and think in it.<br>Every prompt, plan, skill and answer is Markdown.
  logTitle: The agent's native tongue
  logSub: 'All my presentations: Slidev markdown<br>Written by an agent'
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
routeAlias: markdown-web
clicks: 2
---

<Hs id="markdown-web" />

<!--
Gruber wrote Markdown for web writers. Now the web is republished in Markdown for agents.
A docs page as raw HTML: nav, cookie banner, scripts, Tailwind classes. The agent pays for every token. Token counts are chars / 4.
[click] The same page as Markdown: the content, nothing else.
[click] llms.txt: a Markdown map of a site at its root (Jeremy Howard, Answer.AI, 2024, to verify). Docs sites now ship a "Copy page as Markdown" button. Accept: text/markdown is Cloudflare's "Markdown for Agents" (February 2026): when a request asks for text/markdown, Cloudflare fetches the HTML from the origin and converts it to Markdown before serving it. Only on Cloudflare, and only for sites that turned it on.
-->

---
layout: hs
routeAlias: markdown-word
clicks: 2
---

<Hs id="markdown-word" />

<!--
The same 20-line spec, once as .docx, once as .md. A .docx is a zip of 11 XML files; this is only the body.
[click] Real sizes (pandoc output, Word's own is heavier): spec.md 397 B, document.xml 3,307 B, the unzipped .docx 49 KB. The agent has to convert it first, or burn the tokens.
[click] And in a lot of Word docs a "heading" is just bold, bigger text. The structure is gone. In Markdown a heading is a heading.
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
routeAlias: markdown-tree
clicks: 2
---

<Hs id="markdown-tree" />

<!--
A typical repo today, the files an agent reads before touching the code.
[click] Instructions, skills, slash commands, ADRs, specs, plans, memory: every one of them is Markdown.
[click] The agent's config, memory and playbook live in the format Gruber made for blog posts.
-->

---
layout: hs
routeAlias: markdown-log
---

<Hs id="markdown-log" />
