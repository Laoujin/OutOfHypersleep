---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · git worktree
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
  id: worktrees
  name: git worktree
  deck: isolation
  order: 1
  frozen: 2015
  born: 2015
  power: 5
  fate: alive
  score:
    alive: 50
    dead: -40
  frozenBecause: One developer only ever needs one checkout.<br><code>git stash</code> was good enough.
  wokenBecause: "N agents on one repo: each needs its own working directory and branch."
  logTitle: A worktree is an environment
  takeaway: "An obscure feature for when <code>git&nbsp;stash</code> didn't cut it, now table stakes."
layout: hs
routeAlias: worktrees-thaw
---

<Hs id="worktrees-thaw" />

<!--
Frame slide, generated from the pod: header.
-->

---
layout: hs
routeAlias: worktrees-froze
---

<Hs id="worktrees-froze" />

---
layout: hs
routeAlias: worktrees-damage
clicks: 11
---

<Hs id="worktrees-damage" />

<!--
Background: Shipped in Git 2.5 (July 2015). For ten years it was the hotfix side door: "keep your feature branch open, fix prod in a second folder".
What changed: several agents in one checkout trample each other.

[click] Hull breach: two agents edit the same file. Last write wins.
[click] Nav failure: one agent checks out a branch under the other's feet. A commit sweeps up the other agent's changes. A stash vanishes.
[click] Reactor unstable: the dev server rebuilds and reloads on every save of every agent.
[click] Life support: the test run is red because of another agent's half-finished work.
[click] All agents, one compartment.
[click] Sealing the bulkheads: one worktree per agent.
[click] Working tree: separate directories. .worktreeinclude (Claude Code, not git) copies .env and friends into the new worktree.
[click] Git state: all worktrees share one .git: one object store, no re-clone.
[click] Dev server: each worktree its own port. pnpm or bun hardlink node_modules, so N installs cost almost nothing.
[click] Test run: each agent only runs its own code, against its own testcontainer.
[click] git worktree add. That's it.
-->

---
layout: hs
routeAlias: worktrees-core
---

<Hs id="worktrees-core" />

<!--
One .git at the core, a worktree per agent: auth, pdf-export, user-prefs, search-filters, dark-mode, fix-i18n.
The how is in the Git Worktrees deck.
-->

---
layout: hs
routeAlias: worktrees-log
---

<Hs id="worktrees-log" />
