import { parse } from 'yaml'

window.HS = window.HS || {};

const frontmatter = src => parse(src.split(/^---\s*$/m)[1] || '') || {};
const podFiles = import.meta.glob('../pod-*.md', { query: '?raw', import: 'default', eager: true });
const intro = Object.values(import.meta.glob('../slides.md', { query: '?raw', import: 'default', eager: true }))[0];
const DECKS = ['plan', 'build', 'check', 'ship'];

HS.VOTE_URL = 'https://pods.sangu.be';
HS.SOURCE = 'https://github.com/itenium-be/git-worktrees/issues/3';

HS.TYPES = {
  plan: { label: 'Plan', n: 1 },
  build: { label: 'Build', n: 2 },
  check: { label: 'Check', n: 3 },
  ship: { label: 'Ship', n: 4 },
};

HS.awake = [
  { id: 'tdd', name: 'TDD', year: 2002, points: 0 },
  { id: 'unit', name: 'Unit testing', year: 1994, points: 0 },
];

const game = frontmatter(intro).game || {};
HS.alienEvents = {
  twist: (game.alien?.twist || []).map(e => [e.name, e.points]),
};

HS.pods = Object.values(podFiles)
  .map(src => frontmatter(src).pod)
  .filter(Boolean)
  .map(p => ({ ...p, dead: p.fate === 'dead', score: { alive: 0, dead: 0, ...p.score } }))
  .sort((a, b) => DECKS.indexOf(a.deck) - DECKS.indexOf(b.deck) || (a.order ?? 99) - (b.order ?? 99));

HS.podById = id => HS.pods.find(p => p.id === id);
HS.thisYear = new Date().getFullYear();

HS.points = p => (p.dead ? p.score.dead : p.score.alive);

HS.score = st => {
  const woken = st.woken.map(HS.podById).filter(Boolean);
  let crew = 0;
  let alien = 0;
  for (const p of woken) {
    const pts = HS.points(p);
    if (pts < 0) alien -= pts;
    else crew += pts;
  }
  if (st.events.twist) alien += HS.alienEvents.twist.reduce((a, e) => a + e[1], 0);
  const wl = woken.filter(p => !p.dead);
  const avgAge = wl.length ? Math.round(wl.reduce((a, p) => a + (HS.thisYear - p.born), 0) / wl.length) : 0;
  return { crew, alien, avgAge, wokenLive: wl, wokenDead: woken.filter(p => p.dead) };
};
