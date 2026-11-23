import { parse } from 'yaml'

window.HS = window.HS || {};

const frontmatter = src => parse(src.split(/^---\s*$/m)[1] || '') || {};
const podFiles = import.meta.glob('../pod-*.md', { query: '?raw', import: 'default', eager: true });
const intro = Object.values(import.meta.glob('../slides.md', { query: '?raw', import: 'default', eager: true }))[0];
const DECKS = ['isolation', 'integration', 'verification', 'cargo'];

HS.VOTE_URL = 'https://pods.sangu.be';
HS.SOURCE = 'https://github.com/itenium-be/git-worktrees/issues/3';

HS.TYPES = {
  isolation: { label: 'Isolation', n: 1 },
  integration: { label: 'Integration', n: 2 },
  verification: { label: 'Verification', n: 3 },
  cargo: { label: 'Cargo', n: 4 },
};

HS.awake = [
  { id: 'tdd', name: 'TDD', year: 2002, points: 0 },
  { id: 'unit', name: 'Unit testing', year: 1994, points: 0 },
];

HS.dying = [
  { id: 'pairing', name: 'Pair programming', sub: 'human with human', why: 'You pair with the agent now.' },
  { id: 'sprints', name: 'Sprints & ceremonies', why: 'Two weeks is an eternity.' },
  { id: 'humandocs', name: 'Docs for humans', why: 'CLAUDE.md and llms.txt are written for agents first.' },
];

const game = frontmatter(intro).game || {};
HS.alienEvents = {
  twist: (game.alien?.twist || []).map(e => [e.name, e.points]),
  intermezzo: (game.alien?.intermezzo || []).map(e => [e.name, e.points]),
};
HS.RULES = { sleeping: game.sleepingPenalty ?? 10 };

HS.pods = Object.values(podFiles)
  .map(src => frontmatter(src).pod)
  .filter(Boolean)
  .map(p => ({ ...p, dead: p.fate === 'dead', score: { alive: 0, dead: 0, ...p.score } }))
  .sort((a, b) => DECKS.indexOf(a.deck) - DECKS.indexOf(b.deck) || (a.order ?? 99) - (b.order ?? 99));

HS.podById = id => HS.pods.find(p => p.id === id);
HS.thisYear = new Date().getFullYear();

HS.score = st => {
  const woken = st.woken.map(HS.podById).filter(Boolean);
  let crew = 0;
  let alien = 0;
  for (const p of woken) {
    if (p.dead) alien += Math.abs(p.score.dead);
    else crew += p.score.alive;
  }
  for (const k of ['twist', 'intermezzo']) if (st.events[k]) alien += HS.alienEvents[k].reduce((a, e) => a + e[1], 0);
  const sleeping = HS.pods.filter(p => !p.dead && !st.woken.includes(p.id)).length;
  if (st.events.final) alien += sleeping * HS.RULES.sleeping;
  const wl = woken.filter(p => !p.dead);
  const avgAge = wl.length ? Math.round(wl.reduce((a, p) => a + (HS.thisYear - p.born), 0) / wl.length) : 0;
  return { crew, alien, sleeping, avgAge, wokenLive: wl, wokenDead: woken.filter(p => p.dead) };
};
