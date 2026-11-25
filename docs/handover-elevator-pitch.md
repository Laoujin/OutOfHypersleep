# Handover: CFP elevator pitch for Out of Hypersleep

## Goal

Write `ElevatorPitch.md` at the repo root: the CFP submission text for this talk. Read by a program committee that never sees the slides.

## Done

Nothing written or committed yet. Only decisions so far (below).

## Decided with Wouter

- It's for a **CFP submission**.
- **Lead: the game first, then the provocation.** Open with the alien AI, the audience voting which cryo pod to wake, and the scoreboard (crew vs. alien), then turn to: the "AI-era" tooling is older than you think.
- **Don't give everything away.**

## Proposed, awaiting Wouter's approval

Sections, matching his other talks:

| Section         | Content                                                                                                                                                                                                       |
|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Title           | *Out of Hypersleep: the dev tools AI agents woke up*                                                                                                                                                          |
| One-liner       | The tools for running 10 agents were already on board. They were frozen.                                                                                                                                      |
| Abstract ¶1     | The game: an alien AI is aboard, the crew is in cryosleep, the audience votes on their phones which pod to wake, the scoreboard decides crew or alien. Not every crew member survives the thaw.               |
| Abstract ¶2     | The twist: the crew isn't new. The "AI-era" tooling is older than you think. Each pod was frozen for a reason (too expensive, too niche, too much ceremony), and agents removed that reason.                  |
| Abstract ¶3     | Why now, not how: what changed when the code writer became a machine, and which old practices that kills.                                                                                                    |
| Target audience | Developers and leads already using coding agents, or about to. No AI background needed.                                                                                                                      |
| Key takeaways   | Must hold whichever pods get picked (the audience opens only 5–6 of 11): spot frozen tools whose reason for freezing is gone; why constraints and backpressure matter more with agents; which habits to let die. |
| Session format  | 45 min, audience-driven, live voting on phones.                                                                                                                                                              |

Never reveal: which pods die (Stack Overflow, code review, the IDE, small SaaS tools), the average-age number, the final pod (Schrödinger's developer), the alien's scoring.

The live pods (`fate: alive` in the `pod-*.md` headers) average a birth year of about 2000, so about 26 years old in 2026. Use it as a tease ("older than you think"), not as the number.

Also planned: remove the README's line about the abstract being drafted in `notes/talks/out-of-hypersleep.md`. That file doesn't exist.

## Next steps

1. Get Wouter's approval of the outline above (or his changes to it).
2. Write `ElevatorPitch.md` at the repo root and commit it.

## Key files

| File                                                 | Why                                                                              |
|------------------------------------------------------|----------------------------------------------------------------------------------|
| `~/projects/context-engineering/ElevatorPitch.md`    | Closest format and tone to copy (has a one-liner, game-like hook at the end)      |
| `~/projects/rag-and-embeddings/ElevatorPitch.md`     | Same format, shorter                                                             |
| `README.md`                                          | Talk structure, pods, scoring; the dead `notes/talks` pointer                    |
| `presentation/pod-*.md`                              | `pod:` headers: names, years, fate                                               |
| `gh issue view 3 -R itenium-be/git-worktrees`        | Source pitch: headline, theme, story, surprises                                  |
