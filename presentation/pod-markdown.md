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
routeAlias: markdown-web
clicks: 2
---

<Hs id="markdown-web" />

<!--
Gruber wrote Markdown for web writers. Now the web is republished in Markdown for agents.
A docs page as raw HTML: nav, cookie banner, scripts, Tailwind classes. The agent pays for every token. Token counts are chars / 4.
[click] The same page as Markdown: the content, nothing else.
[click] llms.txt: a Markdown map of a site at its root (Jeremy Howard, Answer.AI, 2024, to verify). Barely adopted: roughly 5–10% of top sites have one, a tiny fraction of the whole web, and almost nothing reads them: 97% of llms.txt files got zero traffic in May 2026 (Ahrefs, 137K domains). Accept: text/markdown is Cloudflare's "Markdown for Agents" (February 2026): when a request asks for text/markdown, Cloudflare fetches the HTML from the origin and converts it to Markdown before serving it. Only on Cloudflare, and only for sites that turned it on.
-->

---
layout: hs
routeAlias: markdown-word
---

<Hs id="markdown-word" />

<!--
The same 20-line spec, once as .docx, once as .md. A .docx is a zip of 11 XML files; this is only the body.
Real sizes (pandoc output, Word's own is heavier): spec.md 397 B, document.xml 3,307 B, the unzipped .docx 49 KB. The agent has to convert it first, or burn the tokens.
And in a lot of Word docs a "heading" is just bold, bigger text. The structure is gone. In Markdown a heading is a heading.
-->

---
layout: hs
routeAlias: markdown-everything
clicks: 1
---

<Hs id="markdown-everything" />

<!--
Markdown is pretty much code today.
[click] Instructions, skills, subagents, slash commands, rules, memory, specs, plans, ADRs, tasks, PRs and issues, every answer: all Markdown.
Skills, subagents and commands are YAML frontmatter + prose: the agent runs them like a program.
ADRs: architecture decisions as Markdown files in the repo (Michael Nygard, 2011, to verify). Agents read why the code is the way it is, not just what it is.
-->

---
layout: hs
routeAlias: markdown-log
---

<Hs id="markdown-log" />
