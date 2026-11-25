# Handover: Markdown pod deck

Repo: `~/projects/OutOfHypersleep` (Slidev talk). Read `README.md` first, then `presentation/pod-markdown.md` and `podSlides.markdown` in `presentation/hs/slides.js`.

## Goal

A live pod for **Markdown**: born 2004 (John Gruber, Daring Fireball, with Aaron Swartz), a plain-text README format for 20 years, now the native language of agents (CLAUDE.md, AGENTS.md, SKILL.md, specs, plans, every LLM answer).

## Decided with Wouter

| Item      | Decision                                                                                             |
|-----------|------------------------------------------------------------------------------------------------------|
| Deck row  | Was `verification`, `order: 4`. Another session regrouped the decks (`b158bb8`): now `deck: plan`, `order: 2`. |
| Numbers   | born/frozen 2004, power 5, fate alive, `score: 50` (collapsed to one value in `0a63874`)              |
| Frame     | frozenBecause / frozenSub / wokenBecause / logTitle / takeaway as in the `pod:` header (drafts, Wouter said "build it, then finetune") |
| WIP badge | removed                                                                                              |
| README    | Crew size, Rigged? and Context column rows updated in `9d899d9`; may be stale after the deck regroup and score retune |

## Done (commits)

| Commit    | What                                                      |
|-----------|-----------------------------------------------------------|
| `9d899d9` | Add Markdown pod deck (deck, 2 custom slides, CSS, README, MJ prompt) |
| `cafee7b` | Drop wip badge                                            |
| `d94e772` | Plate `public/plates/pod-markdown.webp`                   |
| `4957ce6` | Speaker notes on ADRs and Markdown vs docx                |

Slides: thaw → froze → `markdown-announce` → `markdown-readme` → log. No *woke* slide (`podFrame.markdown = { woke: [] }`, like the other live pods).

- `markdown-announce`: Gruber's verbatim line from "Introducing Markdown" (15 March 2004). Click: "web writers" struck in red, "agents" fades in above.
- `markdown-readme`: first 12 lines of `facebook/react` `CLAUDE.md`, verbatim (fetched 2026-11-24). Click: "60k+ AGENTS.md on GitHub" (agents.md: "used by over 60k open-source projects").

## Open / next

- Wouter hasn't reviewed the slides visually yet; expect many small tweaks (do each, build, commit, one-line report).
- Frame lines are drafts; Wouter may rewrite them.
- ADRs and Markdown vs docx (token cost, conversion, real `#` headers vs bold-as-header in docx) are only in the speaker notes of `markdown-readme`. Offered to make them a slide; no answer yet.
- To verify: the 60k+ count, Nygard ADRs 2011.
- README rows (Crew size, Rigged?) need rechecking against the new decks and scores.

## Key files

| Path                                   | What                                     |
|----------------------------------------|------------------------------------------|
| `presentation/pod-markdown.md`         | `pod:` header, slide list, speaker notes |
| `presentation/hs/slides.js`            | `podSlides.markdown`, `podFrame.markdown` |
| `presentation/style.css`               | `.md-*` rules (end of file)              |
| `docs/theme/index.html`                | plate prompt (`pod-markdown`)            |

Verify: `cd presentation && timeout 300 bun run build` (headless Chromium can't run here). Report URLs like `#/markdown-readme` for Wouter to check visually.
