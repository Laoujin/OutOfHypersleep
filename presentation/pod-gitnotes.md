---
theme: none
title: Out of Hypersleep · git notes
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
routeAlias: gitnotes
clicks: 2
---

<Hs id="gitnotes" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+30).
git notes: Git 1.6.6 (2010, to verify).
refs/notes/* is not pushed or fetched by default, so everyone assumed notes were broken. One refspec fixes it.
Metadata on a commit without rewriting the commit: model, prompt, cost, session link.
-->

---
layout: hs
routeAlias: gitnotes-why
clicks: 3
---

<Hs id="gitnotes-why" />

<!--
git notes: attach data to a commit without changing its hash.
[click] Which agent, which prompt, cost, link to the session.
[click] Not pushed or fetched by default: notes "got lost", so the feature froze.
[click] Push refs/notes/* (and add a fetch refspec). Pairs well with the commit trailers pod.
-->
