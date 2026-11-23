---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · tmux
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
  wip: true
  id: tmux
  name: tmux
  deck: isolation
  order: 3
  frozen: 2007
  born: 2007
  power: 4
  fate: alive
  score:
    alive: 40
    dead: -40
  frozenBecause: Only sysadmins on SSH used it.
  wokenBecause: Agents run dev servers and long processes in panes; you watch several agents at once.
layout: hs
routeAlias: tmux-thaw
---

<Hs id="tmux-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: tmux-froze
---

<Hs id="tmux-froze" />

---
layout: hs
routeAlias: tmux-why
clicks: 3
---

<Hs id="tmux-why" />

<!--
Background: tmux 1.0: 2009, first release 2007 (to verify).
The surprise: the agent can read the other panes itself (capture-pane) and type into them (send-keys). The dev server log is no longer something you copy-paste.

tmux used to be the SSH-survival tool for sysadmins.
Now: agents run long-lived processes, and you want to watch several agents at once.
[click] capture-pane / send-keys: the agent reads the dev-server error and types into the pane. No more copy-pasting stack traces.
-->

---
layout: hs
routeAlias: tmux-woke
---

<Hs id="tmux-woke" />

---
layout: hs
routeAlias: tmux-log
---

<Hs id="tmux-log" />
