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
  sans: IBM Plex Sans
  serif: Chakra Petch
  mono: IBM Plex Mono
  weights: '400,500,600,700'
pod:
  id: hooks
  name: Hooks
  sub: git hooks · agent hooks
  deck: verification
  order: 2
  frozen: 2005
  born: 2005
  power: 4
  fate: alive
  score:
    alive: 40
    dead: -40
  frozenBecause: Everyone bypassed them with <code>--no-verify</code>.<br>Ain't nobody got time for that
  frozenSub: The checks were executed on the CI only.
  wokenBecause: Agent hooks run the checks on every edit and feed the errors straight back to the agent.
layout: hs
routeAlias: hooks-thaw
---

<Hs id="hooks-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: hooks-froze
---

<Hs id="hooks-froze" />

---
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

---
layout: hs
routeAlias: hooks-loop
clicks: 3
---

<Hs id="hooks-loop" />

<!--
Claude Code hooks: PreToolUse, PostToolUse, Stop. Same idea as git hooks, one level up.
[click] PostToolUse on Edit/Write: format, lint, typecheck.
[click] Exit code 2 / JSON output goes straight back into the agent's context. It fixes it before you see it.
[click] Stop hook: run the tests; block "done" until green.
-->

---
layout: hs
routeAlias: hooks-woke
---

<Hs id="hooks-woke" />

---
layout: hs
routeAlias: hooks-log
---

<Hs id="hooks-log" />
