# Out of Hypersleep

Obscure dev tooling that sat frozen for years until AI agents woke it up. A 45-minute, audience-driven talk.

> The tools for running 10 agents were already on board. They were frozen.

- **Slides:** https://laoujin.github.io/OutOfHypersleep/
- **Source of the talk idea** (pitch, theme, story, message map, open questions): https://github.com/itenium-be/git-worktrees/issues/3

## Run it

```bash
cd presentation
npm install
npm run dev      # http://localhost:3030, presenter view at /presenter
npm run build    # static site in presentation/dist

cd voting
npm install
npm run dev      # http://localhost:3000, votes in voting/data/
```

Every push to `main` builds the Slidev deck and publishes it to GitHub Pages (`.github/workflows/pages.yml`).

## How the audience picks pods

It is **one Slidev deck**. The ship map is a slide (a hub); every pod's slides live in the same deck, each with a `routeAlias`.

- The audience votes on their phones at **https://pods.sangu.be** (`voting/`): one vote per pod per browser, tap again to undo.
- The rules slide ends with "→ to the cryo chamber": the map polls `pods.sangu.be/api/votes` and shows the live count per pod (+ / − add a show of hands on top). The leader glows.
- Click a pod, or press → on the map to open the vote leader: the deck jumps to that pod's slides.
- At the end of a pod, → returns to the ship map (the scoreboard counts up). Skipped pods are simply never visited.
- After the 3rd pod, → goes to the intermezzo first. The final pod (Schrödinger's developer) is at the bow of the map.

This works by overriding Slidev's navigation shortcuts (`presentation/setup/shortcuts.ts`): → / ← / PageDown / PageUp / clicker follow the hub instead of the linear slide order. Presenter view and notes are plain Slidev. Game state (woken pods, votes, score) lives in `localStorage`, so it survives a refresh and syncs to the presenter window.

Before the talk, reset the live votes: `curl -X POST -H "Authorization: Bearer e9f031bd33407643654b280f" https://pods.sangu.be/api/reset`.

| Key | Action |
|---|---|
| → / Space / PageDown / clicker | next click, then the next slide *in the hub order* |
| ← / PageUp | back |
| ↑ / ↓ | previous / next slide (skip clicks) |
| M | ship map |
| I | intermezzo |
| S | scoreboard |
| A | about slide |
| R | replay the current slide's animation |
| F | fullscreen |
| P | crew manifest slide: snap the photo |
| X | reset the game (do this before the talk) |

## Structure

| Path | What |
|---|---|
| `pods.yaml` | the pods: shared by the deck and the voting app |
| `voting/` | pods.sangu.be: Node voting app + API (`/api/votes`), votes in `/data/votes.json`, deployed by Coolify (`voting/Dockerfile`, build context = repo root) |
| `presentation/slides.md` | the deck: one `<Hs id>` per slide, with `routeAlias`, `clicks` and speaker notes |
| `presentation/hs/data.js` | scoring rules, alien events, score function |
| `presentation/hs/slides.js` | slide content and per-step SVG/CSS animations |
| `presentation/hs/art.js` | artwork: cryo pod, alien eye, ECG, scoreboard |
| `presentation/hs/hub.js` | game state and hub navigation |
| `presentation/components/Hs.vue` | renders a slide and applies the current click step |
| `presentation/setup/shortcuts.ts` | hub-aware navigation keys |
| `presentation/layouts/hs.vue`, `style.css` | starfield layout and theme |

All artwork is original SVG/CSS: a sci-fi cryosleep theme, no film stills, logos, posters or likenesses.

## Choices made for the open questions

Everything below is a default; change it in `presentation/hs/data.js` (`HS.pods`, `HS.RULES`, `HS.alienEvents`) or `presentation/hs/slides.js`.

| Open question | Choice |
|---|---|
| Crew size | 11 live pods, max 4 per deck: Isolation (git worktree, throwaway boxes, tmux), Integration (merge queue, commit trailers, `git bisect run`, git notes), Verification (mutation testing, property-based testing, formal methods, git hooks). ArchUnit left for the architecture spin-off, as the source suggests. |
| Dead pods | 3: Stack Overflow ⭐, small SaaS tools, story points. |
| Dying pods | 3 flickering, not selectable: pair programming (human with human), sprints & ceremonies, docs for humans. They die on stage at the intermezzo: nobody can save them. |
| Context column | Left out (goes to the Memento talk). |
| Crew score | `relevance today × 10` (30–50 per pod). Commit trailers: **−10** (the alien's mark). TDD + unit testing already awake: +20 head start. |
| Alien score | Fixed events: the twist (hallucinations, bias, environmental cost: +60) and the intermezzo (prompt injection, sycophancy, slop: +60). +40 per dead pod opened. At the end, +10 per live pod left asleep. |
| Rigged? | No. Balanced so a 5–6 pod run with one dead pod ends close (e.g. five pods + one dead pod: crew ≈ 230 vs alien ≈ 220). Many dead pods or few pods opened → the alien wins. The speaker notes have a closing line for both outcomes. |
| Message map vs random order | Free vote. The map shows "N awake" per deck, and the intermezzo status report lists coverage per deck so the speaker can steer ("nobody wants to verify anything?"). |
| Already awake | Shown in the medbay as open pods with +10 each; not selectable. |
| Do voters know a pod is dead? | Subtle hint only: cargo-deck pods show `? ? ?` instead of relevance bars and no deck colour. |
| Voting | Local click-to-choose: **+ / −** on each pod (show of hands). `HS.setVotes({ podId: n, ... })` is the hook for a future QR/poll integration. |
| Intermezzo | The alien strikes back (its turn on the scoreboard) + a status report. Auto after the 3rd pod, or press I. |
| Crew manifest photo | Laptop camera (Start camera → Snap / P) or load a phone photo. Placeholder crowd if neither. |
| Surprising moment | Kept the source's main pick: the average age of the woken tooling, revealed on the scoreboard. |
| Title / abstract | Drafted in `notes/talks/out-of-hypersleep.md`. |

## Still to check before giving it

- **Dates**: every freeze year is approximate (marked "to verify" in the speaker notes): worktrees (Git 2.5, 2015), merge queues (bors 2013), trailers (2014), bisect run (2007), notes (2010), mutation testing (1978), QuickCheck (1999), TLA+ (1999), hooks (2005), throwaway boxes (2008), tmux (2007).
- **Stack Overflow chart**: the figures are **placeholders**. Replace with a Stack Exchange Data Explorer query (`stackoverflow` pod in `presentation/hs/slides.js`).
- **Death years / sleep years** for the dead pods (TBD in the source).
- Commit trailer count (1284) on the trailers slide is illustrative.
- Meridian and homelab `.lan` stories are referenced in the vitals but have no screenshots yet.
- The "own wake-up moment from the dark factory" per tool (source TODO) is only partly covered in the notes.
- Timing: ~6 min intro, ~5 min per pod × 5–6, ~2 min intermezzo, ~2 min final pod, ~3 min scoreboard + close.
