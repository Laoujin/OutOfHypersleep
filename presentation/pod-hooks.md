---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Git hooks
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
pod:
  id: hooks
  name: Git hooks
  deck: verification
  order: 4
  frozen: 2005
  born: 2005
  power: 4
  fate: alive
  score:
    alive: 40
    dead: -40
  frozenBecause: Everyone bypassed them with <code>--no-verify</code>.
  wokenBecause: Agents can't skip a gate they aren't allowed to skip.
layout: hs
routeAlias: hooks-why
clicks: 3
---

<Hs id="hooks-why" />

<!--
Background: Hooks exist since Git 1.0 (2005).
Humans bypassed slow hooks. Agents get a permission rule that blocks --no-verify, so the hook becomes a real gate.
From the Guardrails talk: a guardrail that only warns is documentation.

Everyone has a pre-commit hook story ending in --no-verify.
[click] For agents: a permission rule or PreToolUse hook denies --no-verify.
[click] The hook becomes backpressure. More in the Guardrails & Backpressure talk.
-->
