---
theme: none
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
layout: hs
routeAlias: boxes
clicks: 2
---

<Hs id="boxes" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+40).
Year: Proxmox VE 1.0 (2008) as the stand-in; devcontainers spec is much younger (to verify).
Homelab story: one VM per agent, snapshot before, roll back after. The agent gets root on something you do not care about.
-->

---
layout: hs
routeAlias: boxes-why
clicks: 3
---

<Hs id="boxes-why" />

<!--
Skipping permissions is the only way agents run for hours unattended. On your laptop that means your keys, your cookies, your other repos.
[click] Throwaway VM / devcontainer / sandbox: the agent gets root on something you do not care about.
[click] It will break it.
[click] Snapshot rollback in seconds. Homelab story: Proxmox, one VM per agent.
-->
