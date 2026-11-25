---
theme: none
favicon: favicon.svg
title: Out of Hypersleep
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
game:
  # alien scores with LLM problems at the twist
  alien:
    twist:
      - { name: Lethal trifecta, points: 20 }
      - { name: Hallucinations, points: 15 }
      - { name: Slop at scale, points: 10 }
      - { name: Bias, points: 10 }
      - { name: Env. cost, points: 5 }
layout: hs
routeAlias: title
---

<Hs id="title" />

<!--
Walk on with the lights low. Let the frozen pods sit on screen.
This talk answers WHY NOW, not HOW. The how is in the Git Worktrees and Guardrails decks.
-->

---
layout: hs
routeAlias: launch
---

<Hs id="launch" />

<!--
Cold open, deliver it with way too much enthusiasm.
"We've done it. We've built a starship and we're going to colonize Alpha Centauri. Exciting times to be alive!"
Then straight into the twist.
-->

---
layout: hs
routeAlias: twist
clicks: 2
---

<Hs id="twist" />

<!--
The twist: an evil alien AI has infiltrated the ship.
[click] It scores with the problems of LLMs: the lethal trifecta, hallucinations, slop at scale, bias, environmental cost. It is already ahead.
This slide starts a fresh game: score and woken pods reset to 0.
The scoreboard stays with us all talk.
-->

---
layout: hs
routeAlias: ask
clicks: 1
---

<Hs id="ask" />

<!--
The ask, recruitment-poster style: "We need YOU". The audience is now in charge of the crew.
[click] QR code: phones out, vote which crew member to wake at https://pods.sangu.be (one vote per pod, tap again to undo). Then → to the ship map.
-->

---
layout: hs
routeAlias: map
---

<Hs id="map" />

<!--
Run the vote: live counts from pods.sangu.be. Click a pod, or → for the vote leader: the pod opens fullscreen.
Fullscreen pod plays by itself (~5 s): venting · lid opens: name + born · it lives or dies (score applied). → or a click skips ahead. Then → or the button: opens the pod's slides in a new tab and returns here. ← steps back / closes the pod.
Aim for 5–6 pods.
Press E for the final pod (Schrödinger's developer).
Pods are anonymous until opened: the audience votes on year and power only.
Keys: E final pod · M map · S scoreboard · A about · X reset game · R replay · F fullscreen.
-->
