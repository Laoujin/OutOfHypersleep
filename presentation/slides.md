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
  sans: Inter
  mono: JetBrains Mono
game:
  # alien points for every live pod still asleep at the end
  sleepingPenalty: 10
  # alien scores with LLM problems at fixed moments
  alien:
    twist:
      - { name: Hallucinations, points: 20 }
      - { name: Bias, points: 20 }
      - { name: Environmental cost, points: 20 }
    intermezzo:
      - { name: Prompt injection, points: 20 }
      - { name: '"You''re absolutely right!"', points: 20 }
      - { name: Slop at scale, points: 20 }
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
clicks: 2
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
[click] It scores with the problems of LLMs: hallucinations, bias, environmental cost. It is already ahead.
This slide starts a fresh game: score, votes and woken pods reset to 0.
The scoreboard stays with us all talk.
-->

---
layout: hs
routeAlias: ask
clicks: 1
---

<Hs id="ask" />

<!--
The ask. The audience is now in charge of the crew.
[click] Translate the metaphor once, then never again: waking crew = using old tools to keep LLM output in line.
-->

---
layout: hs
routeAlias: map
---

<Hs id="map" />

<!--
Run the vote: the voting app (or + / − for a show of hands). Click a pod, or → for the vote leader: the pod opens fullscreen.
Fullscreen pod: [→] venting · [→] lid opens: name + born · [→] it lives or dies (score applied) · [→] or the button: opens the pod's slides in a new tab and returns here. ← steps back / closes the pod.
Aim for 5–6 pods. Watch the "N awake" per deck: if a deck is still empty after 3 pods, nudge: "nobody wants to verify anything?"
After the 3rd pod, → on the map goes to the intermezzo. Press E for the final pod (Schrödinger's developer).
Pods are anonymous until opened: the audience votes on year, power and score only.
Keys: E final pod · M map · I intermezzo · S scoreboard · A about · X reset game · R replay · F fullscreen.
-->
