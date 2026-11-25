# Out of Hypersleep

Obscure dev tooling that sat frozen for years until AI agents woke it up. A 45-minute, audience-driven talk.

> The tools for running 10 agents were already on board. They were frozen.

- **Slides:** https://laoujin.github.io/OutOfHypersleep/
- **Source of the talk idea** (pitch, theme, story, message map, open questions): https://github.com/itenium-be/git-worktrees/issues/3

## Run it

```bash
cd presentation
bun install
bun run dev:all  # all decks with live reload at http://localhost:4173/OutOfHypersleep/
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
| Finale: Schrödinger's developer, scoreboard, closing | `finale.md` | `/OutOfHypersleep/finale/` |

1. **Ship map** (last slide of the intro). Pods are anonymous: freeze year and power. Votes come live from the voting app at **https://pods.sangu.be** (`voting/`, polled every 2s). The leader glows.
2. Click a pod, or → for the vote leader: the pod opens **fullscreen** on top of the map.
   → venting · → the lid opens: name and born year · → it lives or dies (died year, score applied).
3. **Open the slides ↗** (or → once more) opens that pod's deck in a **new tab**, closes the fullscreen pod and the map updates: score counts up, the pod shows revived or dead. At the end of the pod deck, → closes the tab.
4. Click an opened pod to show it fullscreen again, straight on its end screen.
5. The bow hatch opens the finale: click once to unseal it, again to open the finale in a new tab.

Game state (woken pods, score) is in `localStorage`, shared by all decks on the same origin; it survives a reload. Reset it with X or the faint ↺ button bottom-right on the map (it turns red on the first click; click again within 3 s to reset).

## Voting app (pods.sangu.be)

`voting/` is a small Node app, deployed by Coolify from `voting/Dockerfile` (build context = repo root). It reads the `pod:` headers of `presentation/pod-*.md` and shows the pods anonymously (deck, freeze year, power, score), like the map. One vote per pod per browser (localStorage), tap again to undo. Votes persist in `/data/votes.json`.

The `ask` slide ends with "→ to the cryo chamber" (the map). Reset the live votes before the talk: `POST /api/reset` with `Authorization: Bearer <ADMIN_TOKEN>` (the token is in the Home repo's Coolify config, not here).

## Pods and scores live in YAML

Each pod is defined in the YAML header of its own deck, `presentation/pod-<id>.md`:

```yaml
pod:
  id: stackoverflow
  name: Stack Overflow
  deck: plan           # plan | build | check | ship (row on the ship map)
  order: 3             # position in that row
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

Game-wide rules (the alien events at the twist) are in the `game:` block of `presentation/slides.md`. Add a pod by adding a `pod-<id>.md` with a `pod:` header and its slides.

| Key                            | Action                                                       |
|--------------------------------|--------------------------------------------------------------|
| → / Space / PageDown / clicker | next click, then the next slide *in the hub order*           |
| ← / PageUp                     | back                                                         |
| ↑ / ↓                          | previous / next slide (skip clicks)                          |
| M                              | ship map                                                     |
| X                              | reset the game (do this before the talk)                     |
| hold Ctrl (map)                | show the names of the closed pods                            |
| Ctrl+click a pod (map)         | open it straight on its end screen (score applied)           |
| Ctrl+Shift+click a pod (map)   | same, without showing the names                              |

## Structure

| Path | What |
|---|---|
| `presentation/slides.md`, `pod-*.md`, `finale.md` | the decks: one `<Hs id>` per slide, with `routeAlias`, `clicks` and speaker notes |
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
| Crew size | 11 pods in 4 decks, by stage of the agent's work: Plan (Waterfall: spec-driven development, Markdown, Stack Overflow), Build (git worktree, the IDE, small SaaS tools), Check (mutation testing, hooks, code review), Ship (merge queue, commit trailers). Parked candidates are GitHub issues labelled `parked pod`. ArchUnit left for the architecture spin-off, as the source suggests. |
| Dead pods | 4: Stack Overflow ⭐ (plan), the IDE and small SaaS tools (build), code review (check). |
| Context column | Left out (goes to the Memento talk). Markdown sits in Plan, next to spec-driven development. |
| Crew score | `relevance today × 10` (30–50 per pod). Commit trailers: **−10** (the alien's mark). TDD + unit testing are already awake (on duty, no points): the crew starts at 0. |
| Alien score | Fixed event: the twist (lethal trifecta 20, hallucinations 15, slop at scale 10, bias 10, environmental cost 5: +60). +30–40 per dead pod opened. |
| Rigged? | Crew-leaning. Four live pods + two dead pods: crew ≈ 150–190 vs alien ≈ 120–140. The alien only wins with three or more dead pods or few live pods opened. The speaker notes have a closing line for both outcomes. |
| Message map vs random order | Free vote. |
| Already awake | Shown in the medbay as open pods (on duty); not selectable, no points. |
| Do voters know a pod is dead? | No hint on the pod itself: a dead pod shows a normal power and positive score, and its freeze year is the year it died (Stack Overflow ❄ 2023). |
| Voting | Only in the deployed voting app; the map shows the live counts. |
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
- Timing: ~6 min intro, ~5 min per pod × 5–6, ~2 min final pod, ~3 min scoreboard + close.
