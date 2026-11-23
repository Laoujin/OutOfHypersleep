import pods from '../../pods.yaml';

window.HS = window.HS || {};

HS.SOURCE = 'https://github.com/itenium-be/git-worktrees/issues/3';

HS.TYPES = {
  isolation: { label: 'Isolation', n: 1 },
  integration: { label: 'Integration', n: 2 },
  verification: { label: 'Verification', n: 3 },
};

HS.pods = pods;

HS.awake = [
  { id: 'tdd', name: 'TDD', year: 2002, points: 10 },
  { id: 'unit', name: 'Unit testing', year: 1994, points: 10 },
];

HS.dying = [
  { id: 'pairing', name: 'Pair programming', sub: 'human with human', why: 'You pair with the agent now.' },
  { id: 'sprints', name: 'Sprints & ceremonies', why: 'Two weeks is an eternity.' },
  { id: 'humandocs', name: 'Docs for humans', why: 'CLAUDE.md and llms.txt are written for agents first.' },
];

HS.alienEvents = {
  twist: [['Hallucinations', 20], ['Bias', 20], ['Environmental cost', 20]],
  intermezzo: [['Prompt injection', 20], ['"You\'re absolutely right!"', 20], ['Slop at scale', 20]],
};
HS.RULES = { dead: 40, sleeping: 10, relevance: 10 };

HS.podById = id => HS.pods.find(p => p.id === id);
HS.podPoints = p => (p.type === 'dead' ? 0 : p.points != null ? p.points : p.rel * HS.RULES.relevance);
HS.thisYear = new Date().getFullYear();

HS.score = st => {
  const woken = st.woken.map(HS.podById).filter(Boolean);
  const live = HS.pods.filter(p => p.type !== 'dead');
  let crew = HS.awake.reduce((a, p) => a + p.points, 0);
  let alien = 0;
  for (const p of woken) crew += HS.podPoints(p);
  for (const k of ['twist', 'intermezzo']) if (st.events[k]) alien += HS.alienEvents[k].reduce((a, e) => a + e[1], 0);
  alien += woken.filter(p => p.type === 'dead').length * HS.RULES.dead;
  const sleeping = live.filter(p => !st.woken.includes(p.id)).length;
  if (st.events.final) alien += sleeping * HS.RULES.sleeping;
  const wl = woken.filter(p => p.type !== 'dead');
  const avgAge = wl.length ? Math.round(wl.reduce((a, p) => a + (HS.thisYear - p.year), 0) / wl.length) : 0;
  return { crew, alien, sleeping, avgAge, wokenLive: wl, wokenDead: woken.filter(p => p.type === 'dead') };
};
