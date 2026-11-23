---
theme: none
favicon: favicon.svg
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
  sans: IBM Plex Sans
  serif: Chakra Petch
  mono: IBM Plex Mono
  weights: '400,500,600,700'
pod:
  id: gitnotes
  name: git notes
  deck: integration
  order: 4
  frozen: 2010
  born: 2010
  power: 3
  fate: alive
  score:
    alive: 30
    dead: -40
  frozenBecause: Notes got lost on push and clone.
  wokenBecause: Recording which agent wrote which commit, and with which prompt.
layout: hs
routeAlias: gitnotes-why
clicks: 3
---

<Hs id="gitnotes-why" />

<!--
Background: git notes: Git 1.6.6 (2010, to verify).
refs/notes/* is not pushed or fetched by default, so everyone assumed notes were broken. One refspec fixes it.
Metadata on a commit without rewriting the commit: model, prompt, cost, session link.

git notes: attach data to a commit without changing its hash.
[click] Which agent, which prompt, cost, link to the session.
[click] Not pushed or fetched by default: notes "got lost", so the feature froze.
[click] Push refs/notes/* (and add a fetch refspec). Pairs well with the commit trailers pod.
-->
