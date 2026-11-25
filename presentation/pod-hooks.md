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
  deck: check
  order: 2
  frozen: 2005
  born: 2005
  power: 4
  fate: alive
  score: 40
  frozenBecause: Everyone bypassed them with <code>--no-verify</code>.<br>Ain't nobody got time for that
  frozenSub: The checks were executed on the CI only.
  wokenBecause: Agent hooks run the checks on every edit and feed the errors straight back to the agent.
  logTitle: Shift left, all the way
  takeaway: "Every nitpick you ever wanted to enforce.<br>Nobody's around to <code>--no-verify</code> it."
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
routeAlias: hooks-loop
clicks: 4
---

<Hs id="hooks-loop" />

<!--
The agent is a machine: it performs every check you tell it to. No detail is too small, not even the tiniest nitpicking rule.
What we want is a fast feedback loop. CI is out there: minutes away.
[click] LSP: every keystroke, milliseconds.
[click] Agent hooks (PostToolUse): every edit, seconds. Format, lint, typecheck; errors go straight back into the agent's context.
[click] Git hooks: every commit. Tests, commit message.
[click] Nothing gets through. Not even the tiniest nitpick.
-->

---
layout: hs
routeAlias: hooks-log
---

<Hs id="hooks-log" />
