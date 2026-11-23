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
  sans: Inter
  mono: JetBrains Mono
layout: hs
routeAlias: tmux
clicks: 2
---

<Hs id="tmux" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+40).
tmux 1.0: 2009, first release 2007 (to verify).
The surprise: the agent can read the other panes itself (capture-pane) and type into them (send-keys). The dev server log is no longer something you copy-paste.
-->

---
layout: hs
routeAlias: tmux-why
clicks: 3
---

<Hs id="tmux-why" />

<!--
tmux used to be the SSH-survival tool for sysadmins.
Now: agents run long-lived processes, and you want to watch several agents at once.
[click] capture-pane / send-keys: the agent reads the dev-server error and types into the pane. No more copy-pasting stack traces.
-->
