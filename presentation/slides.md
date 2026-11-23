---
theme: none
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
clicks: 3
---

<Hs id="launch" />

<!--
Cold open, deliver it with way too much enthusiasm.
"We've done it. We've built a starship and we're going to colonize Alpha Centauri. Exciting times to be alive!"
[click] And the whole crew is asleep. Go straight to the crew manifest photo.
-->

---
layout: hs
routeAlias: manifest
---

<Hs id="manifest" />

<!--
Take the photo of the audience "for the ship's crew manifest". Make a small ceremony of it.
This is the setup for the final pod: Schrödinger's developer opens on this photo.
No Wi-Fi needed: laptop camera (Start camera, then Snap or press P) or load a photo from your phone. If nothing works, the final pod shows a placeholder crowd.
-->

---
layout: hs
routeAlias: wall
clicks: 1
---

<Hs id="wall" />

<!--
The ship's crew: each tool a crew member, frozen with a date.
[click] They were frozen for a reason: too expensive, too niche, too much ceremony. Agents removed that reason.
Do NOT reveal the average age yet: that is the scoreboard surprise.
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
routeAlias: headline
---

<Hs id="headline" />

<!--
The headline. Pause on it.
Why now, not how. Point to the Worktrees and Guardrails talks for the hands-on part.
-->

---
layout: hs
routeAlias: rules
clicks: 2
---

<Hs id="rules" />

<!--
Explain the map indicators: freeze year, relevance today, deck.
[click] Voting: QR code / show of hands. The pod with the most votes opens. TDD and unit testing are already awake: the crew starts with 20 points.
[click] Warning: not every crew member survives the thaw. A dead pod costs a vote and feeds the alien.
Then: to the ship map.
-->

---
layout: hs
routeAlias: map
---

<Hs id="map" />

<!--
Run the vote: QR / show of hands, use + / − on the pods. → (or clicking a pod) opens it; → opens the vote leader.
Aim for 5–6 pods. Watch the "N awake" per deck: if a deck is still empty after 3 pods, nudge: "nobody wants to verify anything?"
The intermezzo (alien strikes back) triggers automatically after the 3rd pod; the final pod is at the bow.
Keys: M map · I intermezzo · S scoreboard · A about · X reset game · R replay · F fullscreen.
-->

---
layout: hs
routeAlias: worktrees
clicks: 2
---

<Hs id="worktrees" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
Shipped in Git 2.5 (July 2015). For ten years it was the hotfix side door: "keep your feature branch open, fix prod in a second folder".
What changed: three agents in one checkout trample each other's files and switch branches under each other's feet.
The how is in the Git Worktrees deck. Here: why it woke up.
-->

---
layout: hs
routeAlias: worktrees-why
clicks: 3
---

<Hs id="worktrees-why" />

<!--
Three agents in one folder: show the collisions.
[click] Branch switches under someone else's feet; files change on disk mid-edit; three npm installs fight over the lockfile.
[click] Worktrees: one object store, a working directory per agent. Cheap: no re-clone.
[click] git worktree add. That's it. Ten years in the freezer as "the hotfix trick".
-->

---
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

---
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

---
layout: hs
routeAlias: mergequeue
clicks: 2
---

<Hs id="mergequeue" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
bors (Rust, 2013) after Graydon Hoare's "not rocket science rule". Zuul (OpenStack) around the same time. GitHub merge queue GA: 2023. All to verify.
The Dark Factory talk started exactly here: I needed a merge queue.
-->

---
layout: hs
routeAlias: mergequeue-why
clicks: 3
---

<Hs id="mergequeue-why" />

<!--
"Only Google-scale needs this." Google-scale used to mean 1000 engineers. Now it means you plus 20 agents.
[click] Five branches, all green.
[click] Semantic conflicts: no textual conflict, but together they break.
[click] The queue: test the combination, bounce the one that breaks. This is how the Dark Factory talk started: I needed a merge queue.
-->

---
layout: hs
routeAlias: trailers
clicks: 2
---

<Hs id="trailers" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+-10).
`git interpret-trailers`: Git 2.2, 2014 (to verify).
The twist: this crew member costs the crew points. Every Co-Authored-By trailer is the alien's mark on your history.
Surprise: the audience has been looking at one for two years without knowing the name.
-->

---
layout: hs
routeAlias: trailers-why
clicks: 3
---

<Hs id="trailers-why" />

<!--
Ask the room: who recognises the last line? Everyone has seen it, almost nobody knows it is called a trailer.
[click] git interpret-trailers, since 2014. Signed-off-by is the famous one.
[click] They are structured: git log can filter and count them.
[click] Scoring twist: commit trailers give the crew NEGATIVE points. The alien's mark on every commit. The number on screen is illustrative.
-->

---
layout: hs
routeAlias: bisect
clicks: 2
---

<Hs id="bisect" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+40).
`git bisect run` landed in Git 1.5 (2007, to verify).
64 commits = 6 test runs. Humans skipped it because each step needed a human. Agents don't get bored.
-->

---
layout: hs
routeAlias: bisect-why
clicks: 7
---

<Hs id="bisect-why" />

<!--
git bisect: binary search through history. By hand: build, run, mark good/bad, repeat. Tedious, so nobody did it.
Step through the halvings: 64 → 32 → 16 → 8 → 4 → 2 → 1.
(last step) git bisect run: the script decides good/bad. An agent kicks it off and comes back with the culprit commit.
-->

---
layout: hs
routeAlias: gitnotes
clicks: 2
---

<Hs id="gitnotes" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+30).
git notes: Git 1.6.6 (2010, to verify).
refs/notes/* is not pushed or fetched by default, so everyone assumed notes were broken. One refspec fixes it.
Metadata on a commit without rewriting the commit: model, prompt, cost, session link.
-->

---
layout: hs
routeAlias: gitnotes-why
clicks: 3
---

<Hs id="gitnotes-why" />

<!--
git notes: attach data to a commit without changing its hash.
[click] Which agent, which prompt, cost, link to the session.
[click] Not pushed or fetched by default: notes "got lost", so the feature froze.
[click] Push refs/notes/* (and add a fetch refspec). Pairs well with the commit trailers pod.
-->

---
layout: hs
routeAlias: mutation
clicks: 2
---

<Hs id="mutation" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
Lipton 1971; DeMillo, Lipton & Sayward 1978. PIT (Java) and Stryker (JS/.NET) made it practical (to verify).
Agents write tests that confirm their own code. A surviving mutant proves the test asserts nothing.
Spin-off lightning talk: "Who Goes There?" (itenium-be/UnitTesting#4).
-->

---
layout: hs
routeAlias: mutation-why
clicks: 3
---

<Hs id="mutation-why" />

<!--
Mutation testing: 1970s. Frozen because you run the whole suite once per mutant: too slow.
[click] A surviving mutant proves the tests do not check that line.
[click] Feed survivors back to the agent: it writes the missing test.
[click] Compute is cheap now, and the agent does the boring part. Spin-off: "Who Goes There?".
-->

---
layout: hs
routeAlias: pbt
clicks: 2
---

<Hs id="pbt" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+50).
QuickCheck (Claessen & Hughes, ICFP 2000; written 1999, to verify). Hypothesis, fast-check, FsCheck, jqwik.
The agent that wrote the code also picks the examples: of course they pass. A generator does not share its blind spots.
-->

---
layout: hs
routeAlias: pbt-why
clicks: 3
---

<Hs id="pbt-why" />

<!--
Property-based testing: QuickCheck, ~1999. Frozen as academic; writing generators was the hard part.
[click] Agents write generators happily.
[click] A counterexample.
[click] Shrinking: the minimal failing input. The agent's blind spots are not the generator's blind spots.
-->

---
layout: hs
routeAlias: formal
clicks: 2
---

<Hs id="formal" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+30).
TLA+: Lamport, 1999 (to verify). Dafny 2009, Lean 2013.
The LLM is very good at sounding right. The checker does not care how it sounds.
Keep it light: nobody in the room has to write TLA+ on Monday.
-->

---
layout: hs
routeAlias: formal-why
clicks: 3
---

<Hs id="formal-why" />

<!--
Formal methods: TLA+, Dafny, Lean. Frozen because writing proofs cost more than the code.
[click] A checker is the purest form of backpressure: no persuasion possible.
[click] Loop until it passes.
[click] Keep it light: the point is the cost moved, not that everyone should write TLA+.
-->

---
layout: hs
routeAlias: hooks
clicks: 2
---

<Hs id="hooks" />

<!--
Pod opens. Step 1: why it was frozen. Step 2: why agents woke it (+40).
Hooks exist since Git 1.0 (2005).
Humans bypassed slow hooks. Agents get a permission rule that blocks --no-verify, so the hook becomes a real gate.
From the Guardrails talk: a guardrail that only warns is documentation.
-->

---
layout: hs
routeAlias: hooks-why
clicks: 3
---

<Hs id="hooks-why" />

<!--
Everyone has a pre-commit hook story ending in --no-verify.
[click] For agents: a permission rule or PreToolUse hook denies --no-verify.
[click] The hook becomes backpressure. More in the Guardrails & Backpressure talk.
-->

---
layout: hs
routeAlias: stackoverflow
clicks: 2
---

<Hs id="stackoverflow" />

<!--
DEAD POD. Step 1: the pod opens… step 2: the alien eats it.
Dies because: Questions are answered inside the agent now. Volume collapsed after 2023.
Costs the audience this vote, alien +40.
The best-known dead pod. Show the numbers: monthly new questions from peak to today.
Numbers on the chart are approximate placeholders: replace with a Stack Exchange Data Explorer query before giving the talk.
-->

---
layout: hs
routeAlias: stackoverflow-chart
clicks: 3
---

<Hs id="stackoverflow-chart" />

<!--
The best-known dead pod. Let the chart do the talking.
[click] Plateau and slow decline already before AI.
[click] After late 2022: collapse.
[click] The message of its own: not every old practice survives the AI era.
TODO before giving the talk: replace placeholder figures with real SEDE numbers.
-->

---
layout: hs
routeAlias: saas
clicks: 2
---

<Hs id="saas" />

<!--
DEAD POD. Step 1: the pod opens… step 2: the alien eats it.
Dies because: Building beats buying. A PDF tool in 2 hours instead of hosting Stirling PDF.
Costs the audience this vote, alien +40.
Own story: I needed a few PDF operations. Hosting and securing Stirling PDF vs. asking an agent for exactly the three features I need: 2 hours, done.
Sleep year is a placeholder (TBD in the source).
-->

---
layout: hs
routeAlias: saas-story
clicks: 2
---

<Hs id="saas-story" />

<!--
Own story: Stirling PDF vs a small tool built by an agent in 2 hours.
Build vs buy flipped for small tools. Not for your ERP.
-->

---
layout: hs
routeAlias: storypoints
clicks: 2
---

<Hs id="storypoints" />

<!--
DEAD POD. Step 1: the pod opens… step 2: the alien eats it.
Dies because: Why estimate something that takes 4 minutes to build?
Costs the audience this vote, alien +40.
Planning poker: James Grenning, 2002 (to verify). Death year placeholder (TBD in the source).
The estimation meeting took longer than the build.
-->

---
layout: hs
routeAlias: storypoints-poker
clicks: 2
---

<Hs id="storypoints-poker" />

<!--
Why estimate something that takes 4 minutes to build?
The alien eats story points. Some will cheer.
-->

---
layout: hs
routeAlias: strike
clicks: 2
---

<Hs id="strike" />

<!--
Intermezzo (~minute 20). The alien takes its turn.
[click] Prompt injection, sycophancy, slop at scale: +60.
[click] The pods on life support flatline: human pair programming, sprint ceremonies, docs written only for humans. Nobody voted for them: they die on stage.
Then back to the map for the second half.
-->

---
layout: hs
routeAlias: status
---

<Hs id="status" />

<!--
Quick roll call per deck. Use it to steer the second half: if a deck is empty, point at it.
The message map: isolation, integration, verification. A crew needs all three.
-->

---
layout: hs
routeAlias: final
clicks: 2
---

<Hs id="final" />

<!--
Final pod, 60–90 seconds, lighthearted. The future of developers is its own talk.
[click] The pod opens on the crew manifest photo from the start.
[click] "It's you."
-->

---
layout: hs
routeAlias: vitals
clicks: 4
---

<Hs id="vitals" />

<!--
Vitals instead of slides: pros and cons in one glance.
Typing code: flatlined. Memorizing APIs: weak.
Specs from vague requirements: strong pulse.
Security: the homelab .lan story: asked for local only, it was public for 60 days.
Architecture: Meridian, five failed attempts at a dead-simple design until I explained it in detail.
-->

---
layout: hs
routeAlias: diagnosis
clicks: 1
---

<Hs id="diagnosis" />

<!--
Diagnosis line, then straight to the scoreboard. Do not linger.
-->

---
layout: hs
routeAlias: scoreboard
clicks: 3
---

<Hs id="scoreboard" />

<!--
Click 1: the sleepers count for the alien (+10 each). Click 2: the reveal: average age of the tooling woken tonight. Click 3: the verdict.
If the crew wins: "the tools were on board all along".
If the alien wins: "then you know what to wake on Monday". The closing line works either way.
-->

---
layout: hs
routeAlias: closing
clicks: 1
---

<Hs id="closing" />

<!--
Close on the headline. Then: which pod do you wake on Monday?
Questions. The about slide has links (press A).
-->

---
layout: hs
routeAlias: about
---

<Hs id="about" />

<!--
Source of the talk: https://github.com/itenium-be/git-worktrees/issues/3
Keys: → next · ← back · N notes · F fullscreen · R replay · M map · I intermezzo · S scoreboard · A about · X reset game.
-->
