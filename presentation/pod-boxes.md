---
theme: none
favicon: favicon.svg
title: Out of Hypersleep · Throwaway boxes
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
  id: boxes
  name: Throwaway boxes
  sub: VMs · devcontainers · sandboxes
  deck: isolation
  order: 2
  frozen: 2008
  born: 2008
  power: 4
  fate: alive
  score:
    alive: 40
    dead: -40
  frozenBecause: A homelab hobby. Your laptop <em>was</em> the dev environment.
  wokenBecause: <code>--dangerously-skip-permissions</code> needs a box you can wipe.
layout: hs
routeAlias: boxes-why
clicks: 3
---

<Hs id="boxes-why" />

<!--
Background: Year: Proxmox VE 1.0 (2008) as the stand-in; devcontainers spec is much younger (to verify).
Homelab story: one VM per agent, snapshot before, roll back after. The agent gets root on something you do not care about.

Skipping permissions is the only way agents run for hours unattended. On your laptop that means your keys, your cookies, your other repos.
[click] Throwaway VM / devcontainer / sandbox: the agent gets root on something you do not care about.
[click] It will break it.
[click] Snapshot rollback in seconds. Homelab story: Proxmox, one VM per agent.
-->
