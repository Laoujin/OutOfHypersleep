window.HS = window.HS || {};

HS.SOURCE = 'https://github.com/itenium-be/git-worktrees/issues/3';

HS.TYPES = {
  isolation: { label: 'Isolation', n: 1 },
  integration: { label: 'Integration', n: 2 },
  verification: { label: 'Verification', n: 3 },
};

HS.pods = [
  {
    id: 'worktrees', name: 'git worktree', type: 'isolation', year: 2015, rel: 5,
    frozen: 'One developer only ever needs one checkout. <code>git stash</code> was good enough.',
    woken: 'N agents on one repo: each needs its own working directory and branch.',
    notes: 'Shipped in Git 2.5 (July 2015). For ten years it was the hotfix side door: "keep your feature branch open, fix prod in a second folder".\nWhat changed: three agents in one checkout trample each other\'s files and switch branches under each other\'s feet.\nThe how is in the Git Worktrees deck. Here: why it woke up.',
  },
  {
    id: 'boxes', name: 'Throwaway boxes', sub: 'VMs · devcontainers · sandboxes', type: 'isolation', year: 2008, rel: 4,
    frozen: 'A homelab hobby. Your laptop <em>was</em> the dev environment.',
    woken: '<code>--dangerously-skip-permissions</code> needs a box you can wipe.',
    notes: 'Year: Proxmox VE 1.0 (2008) as the stand-in; devcontainers spec is much younger (to verify).\nHomelab story: one VM per agent, snapshot before, roll back after. The agent gets root on something you do not care about.',
  },
  {
    id: 'tmux', name: 'tmux', type: 'isolation', year: 2007, rel: 4,
    frozen: 'Only sysadmins on SSH used it.',
    woken: 'Agents run dev servers and long processes in panes; you watch several agents at once.',
    notes: 'tmux 1.0: 2009, first release 2007 (to verify).\nThe surprise: the agent can read the other panes itself (capture-pane) and type into them (send-keys). The dev server log is no longer something you copy-paste.',
  },
  {
    id: 'mergequeue', name: 'Merge queue', type: 'integration', year: 2013, rel: 5,
    frozen: '"Only Google-scale needs this."',
    woken: '20 green branches at once. Each is green alone; together they break main.',
    notes: 'bors (Rust, 2013) after Graydon Hoare\'s "not rocket science rule". Zuul (OpenStack) around the same time. GitHub merge queue GA: 2023. All to verify.\nThe Dark Factory talk started exactly here: I needed a merge queue.',
  },
  {
    id: 'trailers', name: 'Commit trailers', type: 'integration', year: 2014, rel: 3, points: -10,
    frozen: 'Nobody knew they existed (except kernel devs and <code>Signed-off-by</code>).',
    woken: 'Every AI commit carries <code>Co-Authored-By</code>: the alien\'s mark.',
    notes: '`git interpret-trailers`: Git 2.2, 2014 (to verify).\nThe twist: this crew member costs the crew points. Every Co-Authored-By trailer is the alien\'s mark on your history.\nSurprise: the audience has been looking at one for two years without knowing the name.',
  },
  {
    id: 'bisect', name: 'git bisect run', type: 'integration', year: 2007, rel: 4,
    frozen: 'Bisecting by hand is tedious: build, test, mark good or bad, repeat.',
    woken: 'An agent runs it unattended and reports the culprit.',
    notes: '`git bisect run` landed in Git 1.5 (2007, to verify).\n64 commits = 6 test runs. Humans skipped it because each step needed a human. Agents don\'t get bored.',
  },
  {
    id: 'gitnotes', name: 'git notes', type: 'integration', year: 2010, rel: 3,
    frozen: 'Notes got lost on push and clone.',
    woken: 'Recording which agent wrote which commit, and with which prompt.',
    notes: 'git notes: Git 1.6.6 (2010, to verify).\nrefs/notes/* is not pushed or fetched by default, so everyone assumed notes were broken. One refspec fixes it.\nMetadata on a commit without rewriting the commit: model, prompt, cost, session link.',
  },
  {
    id: 'mutation', name: 'Mutation testing', type: 'verification', year: 1978, rel: 5,
    frozen: 'Too slow and too expensive: run the whole suite once per mutant.',
    woken: 'Compute is cheap and agents write the tests. Who tests the tests?',
    notes: 'Lipton 1971; DeMillo, Lipton & Sayward 1978. PIT (Java) and Stryker (JS/.NET) made it practical (to verify).\nAgents write tests that confirm their own code. A surviving mutant proves the test asserts nothing.\nSpin-off lightning talk: "Who Goes There?" (itenium-be/UnitTesting#4).',
  },
  {
    id: 'pbt', name: 'Property-based testing', type: 'verification', year: 1999, rel: 5,
    frozen: 'Seen as academic. Generators are hard to write.',
    woken: 'Agents write the generators. Properties catch what an agent\'s own examples only confirm.',
    notes: 'QuickCheck (Claessen & Hughes, ICFP 2000; written 1999, to verify). Hypothesis, fast-check, FsCheck, jqwik.\nThe agent that wrote the code also picks the examples: of course they pass. A generator does not share its blind spots.',
  },
  {
    id: 'formal', name: 'Formal methods', sub: 'TLA+ · Dafny · Lean', type: 'verification', year: 1999, rel: 3,
    frozen: 'Far too expensive to write the proofs.',
    woken: 'LLMs write the proofs. A proof checker is backpressure that can\'t be argued with.',
    notes: 'TLA+: Lamport, 1999 (to verify). Dafny 2009, Lean 2013.\nThe LLM is very good at sounding right. The checker does not care how it sounds.\nKeep it light: nobody in the room has to write TLA+ on Monday.',
  },
  {
    id: 'hooks', name: 'Git hooks', type: 'verification', year: 2005, rel: 4,
    frozen: 'Everyone bypassed them with <code>--no-verify</code>.',
    woken: 'Agents can\'t skip a gate they aren\'t allowed to skip.',
    notes: 'Hooks exist since Git 1.0 (2005).\nHumans bypassed slow hooks. Agents get a permission rule that blocks --no-verify, so the hook becomes a real gate.\nFrom the Guardrails talk: a guardrail that only warns is documentation.',
  },
  {
    id: 'stackoverflow', name: 'Stack Overflow', type: 'dead', year: 2008, died: 2023, star: true,
    dies: 'Questions are answered inside the agent now. Volume collapsed after 2023.',
    notes: 'The best-known dead pod. Show the numbers: monthly new questions from peak to today.\nNumbers on the chart are approximate placeholders: replace with a Stack Exchange Data Explorer query before giving the talk.',
  },
  {
    id: 'saas', name: 'Small SaaS tools', sub: 'build vs buy', type: 'dead', year: 2010, died: 2025,
    dies: 'Building beats buying. A PDF tool in 2 hours instead of hosting Stirling PDF.',
    notes: 'Own story: I needed a few PDF operations. Hosting and securing Stirling PDF vs. asking an agent for exactly the three features I need: 2 hours, done.\nSleep year is a placeholder (TBD in the source).',
  },
  {
    id: 'storypoints', name: 'Story points', sub: 'planning poker', type: 'dead', year: 2002, died: 2025,
    dies: 'Why estimate something that takes 4 minutes to build?',
    notes: 'Planning poker: James Grenning, 2002 (to verify). Death year placeholder (TBD in the source).\nThe estimation meeting took longer than the build.',
  },
];

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
