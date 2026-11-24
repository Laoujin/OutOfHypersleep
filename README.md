# Out of Hypersleep

Obscure dev tooling that sat frozen for years until AI agents woke it up. A 45-minute, audience-driven talk.

> The tools for running 10 agents were already on board. They were frozen.

- **Slides:** https://laoujin.github.io/OutOfHypersleep/
- **Source of the talk idea** (pitch, theme, story, message map, open questions): https://github.com/itenium-be/git-worktrees/issues/3

## Run it

```bash
cd presentation
bun install
bun run preview  # build all decks and serve them at http://localhost:4173/OutOfHypersleep/
bun run build    # all decks into presentation/dist
bunx slidev pod-mutation.md   # work on a single deck (links to other decks only work in preview/build)

cd ../voting
npm install
npm run dev      # voting app at http://localhost:3000, votes in voting/data/
```

Every push to `main` builds the Slidev deck and publishes it to GitHub Pages (`.github/workflows/pages.yml`).

## How the audience picks pods

The talk is split into **separate Slidev decks**:

| Deck | File | URL |
|---|---|---|
| Intro: starship, alien AI invasion, **ship map** | `slides.md` | `/OutOfHypersleep/` |
| One deck per pod (its content slides) | `pod-<id>.md` | `/OutOfHypersleep/pod-<id>/` |
| Intermezzo: the alien strikes back | `intermezzo.md` | `/OutOfHypersleep/intermezzo/` |
| Finale: Schrödinger's developer, scoreboard, closing | `finale.md` | `/OutOfHypersleep/finale/` |

1. **Ship map** (last slide of the intro). Pods are anonymous: freeze year, power and a score that flips between + (green) and − (red), because nobody knows whether the crew member survives. Votes come live from the voting app at **https://pods.sangu.be** (`voting/`, polled every 2s), + / − add a show of hands on top. The leader glows.
2. Click a pod, or → for the vote leader: the pod opens **fullscreen** on top of the map.
   → venting · → the lid opens: name and born year · → it lives or dies (died year, score applied).
3. **Open the slides ↗** (or → once more) opens that pod's deck in a **new tab**, closes the fullscreen pod and the map updates: score counts up, the pod shows revived or dead. At the end of the pod deck, → closes the tab.
4. After the 3rd pod, → on the map goes to the intermezzo deck. E opens the finale.

Game state (woken pods, votes, score) is in `localStorage`, shared by all decks on the same origin.

## Voting app (pods.sangu.be)

`voting/` is a small Node app, deployed by Coolify from `voting/Dockerfile` (build context = repo root). It reads the `pod:` headers of `presentation/pod-*.md` and shows the pods anonymously (deck, freeze year, power, score), like the map. One vote per pod per browser (localStorage), tap again to undo. Votes persist in `/data/votes.json`.

The `ask` slide ends with "→ to the cryo chamber" (the map). Reset the live votes before the talk: `POST /api/reset` with `Authorization: Bearer <ADMIN_TOKEN>` (the token is in the Home repo's Coolify config, not here).

## Pods and scores live in YAML

Each pod is defined in the YAML header of its own deck, `presentation/pod-<id>.md`:

```yaml
pod:
  id: stackoverflow
  name: Stack Overflow
  deck: cargo          # isolation | integration | verification | cargo (row on the ship map)
  order: 1             # position in that row
  frozen: 2008         # year shown on the map (dead pods: = born)
  born: 2008           # shown when the pod opens
  died: 2023           # shown when it dies (fate: dead)
  power: 5             # 1–5 bars on the map
  fate: dead           # alive | dead
  score:
    alive: 50          # crew points if it lives (the + on the map); negative = it lives but scores for the alien (commit trailers)
    dead: -40          # alien points if it dies (the − on the map)
  diesBecause: ...     # dead pods
  # frozenBecause / wokenBecause for pods that live; frozenSub: optional subtitle on the froze slide
  was: ...             # dead pods: what it was in its prime
  takeaway: ...        # one line on the crew log slide
  wip: true            # badge on the ship map until the deck is done
```

Every pod deck uses the same frame: **thaw** (ID card) → **froze** (`frozenBecause`, or `was` for dead pods) → the pod's own slides → **woke** (`wokenBecause`; skipped for dead pods) → **log** (`takeaway`, score). The frame slides are generated in `hs/slides.js`; the `.md` lists them as `<Hs id="<pod>-thaw" />` etc. A pod can replace a frame slide with its own slides via `podFrame` in `hs/slides.js` (Stack Overflow replaces *froze* with empire / gamification / reflex; an empty list drops the slide, e.g. commit trailers has no *woke*). Background plate for thaw and log: `public/plates/pod-<id>.webp` (prompts in `docs/theme/index.html`).

Game-wide rules (alien events at the twist and intermezzo, the penalty per pod left asleep) are in the `game:` block of `presentation/slides.md`. Add a pod by adding a `pod-<id>.md` with a `pod:` header and its slides.

| Key | Action |
|---|---|
| → / Space / PageDown / clicker | next click, then the next slide *in the hub order* |
| ← / PageUp | back |
| ↑ / ↓ | previous / next slide (skip clicks) |
| M | ship map |
| E | final pod (Schrödinger's developer) |
| I | intermezzo |
| S | scoreboard |
| A | about slide |
| R | replay the current slide's animation |
| F | fullscreen |
| X | reset the game (do this before the talk) |

## Structure

| Path | What |
|---|---|
| `presentation/slides.md`, `pod-*.md`, `intermezzo.md`, `finale.md` | the decks: one `<Hs id>` per slide, with `routeAlias`, `clicks` and speaker notes |
| `presentation/build.mjs` | builds every deck into `dist/` |
| `presentation/hs/data.js` | reads the pods and game rules from the YAML headers; score function |
| `presentation/hs/slides.js` | slide content and per-step SVG/CSS animations |
| `presentation/hs/art.js` | artwork: cryo pod, alien eye, ECG, scoreboard |
| `presentation/hs/hub.js` | game state and hub navigation |
| `presentation/components/Hs.vue` | renders a slide and applies the current click step |
| `presentation/setup/shortcuts.ts` | hub-aware navigation keys |
| `presentation/layouts/hs.vue`, `style.css` | starfield layout and theme |

All artwork is original SVG/CSS: a sci-fi cryosleep theme, no film stills, logos, posters or likenesses.

## Choices made for the open questions

Everything below is a default; change pods in the `pod:` header of `presentation/pod-*.md`, game rules in the `game:` header of `presentation/slides.md`, slide content in `presentation/hs/slides.js`.

| Open question | Choice |
|---|---|
| Crew size | 6 live pods: Isolation (git worktree), Integration (merge queue, commit trailers), Verification (mutation testing, hooks: git hooks · agent hooks · LSP, Waterfall: spec-driven development). Parked candidates are GitHub issues labelled `parked pod`. ArchUnit left for the architecture spin-off, as the source suggests. |
| Dead pods | 5: Stack Overflow ⭐, small SaaS tools, story points (cargo row), code review (integration row), the IDE (isolation row). |
| Context column | Left out (goes to the Memento talk). |
| Crew score | `relevance today × 10` (30–50 per pod). Commit trailers: **−10** (the alien's mark). TDD + unit testing are already awake (on duty, no points): the crew starts at 0. |
| Alien score | Fixed events: the twist (hallucinations, bias, environmental cost: +60) and the intermezzo (prompt injection, sycophancy, slop: +60). +40 per dead pod opened. At the end, +10 per live pod left asleep. |
| Rigged? | No. Balanced so a 5–6 pod run with one dead pod ends close (e.g. five pods + one dead pod: crew ≈ 210 vs alien ≈ 220, a knife edge now that the crew starts at 0). Many dead pods or few pods opened → the alien wins. The speaker notes have a closing line for both outcomes. |
| Message map vs random order | Free vote. The map shows "N awake" per deck, and the intermezzo status report lists coverage per deck so the speaker can steer ("nobody wants to verify anything?"). |
| Already awake | Shown in the medbay as open pods (on duty); not selectable, no points. |
| Do voters know a pod is dead? | No hint on the pod itself: a dead pod shows a normal power and positive score, and its freeze year is the year it died (Stack Overflow ❄ 2023). They do sit in the cargo row. |
| Voting | Local click-to-choose: **+ / −** on each pod (show of hands). `HS.setVotes({ podId: n, ... })` is the hook for a future QR/poll integration. |
| Intermezzo | The alien strikes back (its turn on the scoreboard) + a status report. Auto after the 3rd pod, or press I. |
| Crew manifest photo | Slide removed from the intro. The final pod shows a placeholder crowd for now. |
| Surprising moment | Kept the source's main pick: the average age of the woken tooling, revealed on the scoreboard. |
| Title / abstract | Drafted in `notes/talks/out-of-hypersleep.md`. |

## Still to check before giving it

- **Dates**: every freeze year is approximate (marked "to verify" in the speaker notes): worktrees (Git 2.5, 2015), merge queues (bors 2013), trailers (2014), mutation testing (1978), hooks (2005).
- **Stack Overflow chart**: the figures are **placeholders**. Replace with a Stack Exchange Data Explorer query (`stackoverflow` pod in `presentation/hs/slides.js`).
- **Death years / sleep years** for the dead pods (TBD in the source).
- Commit trailer count (1284) on the trailers slide is illustrative.
- Meridian and homelab `.lan` stories are referenced in the vitals but have no screenshots yet.
- The "own wake-up moment from the dark factory" per tool (source TODO) is only partly covered in the notes.
- Timing: ~6 min intro, ~5 min per pod × 5–6, ~2 min intermezzo, ~2 min final pod, ~3 min scoreboard + close.
