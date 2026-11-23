import QRCode from 'qrcode';

(() => {
  const A = HS.art;
  const qrSvg = url => {
    const { modules } = QRCode.create(url, { errorCorrectionLevel: 'M' });
    const n = modules.size, q = 2;
    let d = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (modules.get(y, x)) d += `M${x + q} ${y + q}h1v1h-1z`;
    return `<svg class="qr" viewBox="0 0 ${n + q * 2} ${n + q * 2}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#fff"/><path d="${d}" fill="#04070b"/></svg>`;
  };
  HS.marquee = t => `<div class="alarm-bar"><div class="marquee">${Array(8).fill(`<span>${t}</span>`).join('')}</div></div><div class="alarm-bar bottom"><div class="marquee rev">${Array(8).fill(`<span>${t}</span>`).join('')}</div></div>`;
  const deckOf = p => (p.deck === 'cargo' ? 'Cargo deck' : `Deck ${HS.TYPES[p.deck].n} · ${HS.TYPES[p.deck].label}`);
  const head = (kicker, title, extra = '') => `<header><div class="kicker">${kicker}</div><h2>${title}</h2>${extra}</header>`;
  const S = [];
  const add = s => S.push(s);

  // ───────────────────────── INTRO ─────────────────────────
  add({
    id: 'title', seq: 'intro', cls: 'title-slide plate',
    html: () => `<div class="title-wrap">
        <div class="kicker">a hypersleep story</div>
        <h1>Out of<br>Hypersleep</h1>
        <div class="subtitle">Obscure dev tooling that sat frozen for years,<br>until AI agents woke it up.</div>
        <div class="footer">Wouter Van Schandevijl · itenium</div>
      </div>
      <div class="title-pods">${HS.pods.slice(0, 7).map(() => A.pod('frozen')).join('')}</div>`,
  });

  add({
    id: 'launch', seq: 'intro', cls: 'launch plate',
    html: () => `<div class="lt">
        <div class="lt-live"><i></i>Live</div>
        <div class="lt-hl"><b>First colony ship leaves Earth orbit</b><span>Destination Alpha Centauri · 4.37 light years · crew in hypersleep</span></div>
      </div>
      <div class="launch-q">
        <h1>"We've done it."</h1>
        <div class="sub">We built a starship, and we're going to colonize Alpha Centauri.</div>
      </div>`,
  });

  add({
    id: 'twist', seq: 'intro', steps: 3, cls: 'but plate',
    enter: c => { Object.assign(c.state, { woken: [], votes: {}, events: {}, shown: { crew: 0, alien: 0 } }); },
    html: () => `${HS.marquee('⚠ INTRUDER DETECTED · DECK 3 ·')}
      <div class="but-eye" data-s="1">${A.alien()}</div>
      <div class="but-text">
        <h1>But…</h1>
        <p data-s="1">An evil <b>alien AI</b> has infiltrated the ship.</p>
      </div>
      <div class="but-log" data-s="2">${HS.alienEvents.twist.map(([n, v]) => `<div>&gt; ${n.toUpperCase()} <i></i> +${v}</div>`).join('')}</div>
      <div class="hud-corner" data-s="2">${A.hud()}</div>`,
    step: (el, st, c) => {
      if (c.active && st >= 2 && !c.state.events.twist) { c.state.events.twist = true; A.hudUpdate(el, c); }
      else A.hudUpdate(el, c, false);
    },
  });

  add({
    id: 'ask', seq: 'intro', steps: 2,
    cls: 'ask plate',
    html: () => `<div class="ask-top">
        <div class="alarm"><i></i>intruder alert · all hands</div>
        <div class="poster"><span>We need</span><em>YOU</em></div>
        <div class="poster-sub">to wake the crew to tame the alien LLM output.</div>
      </div>
      <div class="vote-cta" data-s="1">
        ${qrSvg(HS.VOTE_URL)}
        <div class="vote-side"><div class="kicker">vote which crew member to wake</div><div class="vote-badge">${HS.VOTE_URL}</div></div>
      </div>`,
  });

  // ───────────────────────── MAP ─────────────────────────
  const podCard = (p, st) => {
    const woken = st.woken.includes(p.id);
    const state = woken ? (p.dead ? 'dead' : 'awake') : 'closed';
    const cls = ['pod', `t-${p.deck}`, `is-${state}`, HS.leader() === p.id ? 'lead' : ''].join(' ');
    const votes = HS.votesOf(p.id);
    const label = { closed: 'HYPERSLEEP', awake: 'REVIVED', dead: 'NO SIGNS' }[state];
    return `<div class="${cls}" data-pod="${p.id}">
      <div class="pod-art">${A.cryo(state, label)}</div>
      ${woken ? '' : `<div class="votes"><span class="vn">${votes}</span><small>votes</small><div class="vb"><button data-act="down" data-id="${p.id}">−</button><button data-act="up" data-id="${p.id}">+</button></div></div>`}
      <div class="pod-info"><span class="yr">❄ ${p.frozen}</span>${A.rel(p.power)}${A.flip(p.score.alive, Math.abs(p.score.dead), woken ? (p.dead ? 'show-neg' : 'show-pos') : '')}</div>
    </div>`;
  };

  const revive = {
    html: p => {
      const pts = p.score.alive;
      const why = p.dead
        ? `<div class="why dies"><label>dies because</label>${p.diesBecause || ''}</div>`
        : `<div class="why frozen"><label>frozen because</label>${p.frozenBecause || ''}</div><div class="why woken"><label>woken because</label>${p.wokenBecause || ''}</div>`;
      return `<button class="rv-close" data-act="close-pod" title="Close without waking this pod">×</button><div class="rv-alarm"><span>REVIVAL SEQUENCE · REVIVAL SEQUENCE · REVIVAL SEQUENCE · REVIVAL SEQUENCE</span></div>
        <div class="rv-pod">${A.cryo('closed', 'HYPERSLEEP', 9)}</div>
        <div class="rv-steam">${Array.from({ length: 12 }, (_, i) => `<i style="left:${140 + i * 64}px;top:${330 + (i % 3) * 30}px;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;animation-delay:${(i * 0.12).toFixed(2)}s"></i>`).join('')}</div>
        <div class="rv-info">
          <div class="kicker">crew member · ${deckOf(p)}</div>
          <h1>${p.name}</h1>
          <dl class="rv-dates"><dt>BORN</dt><dd>${p.born}</dd><dt>DIED</dt><dd class="died">—</dd></dl>
          <div class="rv-verdict ${p.dead ? 'dead' : 'alive'}">${p.dead ? `NO LIFE SIGNS<small>eaten by the alien AI · alien +${Math.abs(p.score.dead)}</small>` : `LIFE SIGNS: STABLE<small>crew ${pts > 0 ? '+' : ''}${pts}</small>`}</div>
          <div class="rv-why">${why}</div>
          <button class="rv-open" data-act="open-slides">Open the slides ↗</button>
        </div>
        <svg class="rv-ecg ${p.dead ? 'dead' : 'alive'}" viewBox="0 0 880 120" preserveAspectRatio="none"><path d="${p.dead
          ? 'M0 60 l90 0 l14 -26 l14 70 l16 -100 l16 80 l12 -24 l90 0 l10 -10 l10 20 l10 -10 l560 0'
          : 'M0 60 ' + Array(4).fill('l70 0 l14 -26 l14 70 l16 -100 l16 80 l12 -24').join(' ') + ' l100 0'}"/></svg>
        <div class="rv-flash"></div>`;
    },
    step: (el, p, st) => {
      for (let k = 1; k < 4; k++) el.classList.toggle('s' + k, k <= st);
      const svg = el.querySelector('.rv-pod .cryo');
      const state = st >= 3 && p.dead ? 'dead' : st >= 2 ? 'awake' : 'closed';
      svg.setAttribute('class', `cryo ${state}`);
      svg.querySelector('.readout-t').textContent = st >= 3 ? (p.dead ? 'NO SIGNS' : 'REVIVED') : st >= 1 ? 'VENTING' : 'HYPERSLEEP';
      el.querySelector('.rv-dates .died').textContent = st >= 3 && p.dead ? (p.died ?? '?') : '—';
      el.classList.toggle('is-dead', st >= 3 && p.dead);
      el.classList.toggle('is-alive', st >= 3 && !p.dead);
    },
  };
  HS.revive = revive;

  add({
    id: 'map', seq: 'map', cls: 'map plate',
    html: c => {
      const st = c.state;
      const sc = c.score;
      const row = deck => HS.pods.filter(p => p.deck === deck).map(p => podCard(p, st)).join('');
      const cov = deck => HS.pods.filter(p => p.deck === deck && st.woken.includes(p.id)).length;
      return `<div class="map-head"><div><div class="kicker">cryo chamber · vote at <b>${HS.VOTE_URL.replace('https://', '')}</b></div><h2>Which pod do we open?</h2></div>${A.hud()}</div>
        <svg class="hull" viewBox="0 0 1500 720" preserveAspectRatio="none"><path d="M20 60 L1180 40 Q1460 120 1480 360 Q1460 600 1180 680 L20 660 Q0 360 20 60Z"/></svg>
        <div class="map-grid">
          ${['isolation', 'integration', 'verification'].map(t => `<div class="deck-lbl t-${t}"><b>Deck ${HS.TYPES[t].n}</b>${HS.TYPES[t].label}<small>${cov(t)} awake</small></div><div class="deck-row">${row(t)}</div>`).join('')}
          <div class="deck-lbl t-dead"><b>Cargo</b>unmarked pods</div>
          <div class="deck-row">${row('cargo')}${HS.dying.map(d => `<div class="pod t-dying ${st.events.intermezzo ? 'is-lost' : 'is-dying'}" title="${d.why}"><div class="pod-art">${A.cryo(st.events.intermezzo ? 'dead' : 'dying', st.events.intermezzo ? 'LOST' : 'LIFE SUPP.')}</div></div>`).join('')}</div>
        </div>
`;
    },
    init: (el, c) => {
      A.hudUpdate(el, c);
      const syncVotes = () => {
        if (!el.isConnected) return;
        el.querySelectorAll('.pod[data-pod] .votes .vn').forEach(n => { n.textContent = HS.votesOf(n.closest('.pod').dataset.pod); });
        const lead = HS.leader();
        el.querySelectorAll('.pod').forEach(p => p.classList.toggle('lead', p.dataset.pod === lead));
      };
      HS.onLive = syncVotes;
      const ov = document.createElement('section');
      ov.className = 'revive rv-overlay';
      ov.hidden = true;
      el.appendChild(ov);
      let cur = null, st = 0, timer = null, snapshot = null;
      const DELAYS = [700, 2000, 2400];
      const auto = () => {
        clearTimeout(timer);
        if (cur && st < 3) timer = setTimeout(() => { step(st + 1); auto(); }, DELAYS[st]);
      };
      const step = n => {
        st = Math.max(0, Math.min(3, n));
        revive.step(ov, cur, st);
        if (st === 3 && !c.state.woken.includes(cur.id)) { c.state.woken.push(cur.id); c.save(); }
      };
      const close = () => { clearTimeout(timer); ov.hidden = true; cur = null; HS.refreshActive(); };
      const openSlides = () => { const id = cur.id; if (st < 3) step(3); window.open(HS.deckUrl('pod-' + id), '_blank'); close(); };
      const show = id => {
        const p = HS.podById(id);
        if (!p) return;
        cur = p;
        snapshot = { votes: { ...c.state.votes }, woken: [...c.state.woken] };
        c.state.votes = {};
        c.save();
        ov.innerHTML = revive.html(p);
        ov.hidden = false;
        step(0);
        auto();
      };
      HS.overlay = {
        get active() { return !!cur && el.isConnected; },
        next: () => (st < 3 ? (step(st + 1), auto()) : openSlides()),
        prev: () => { clearTimeout(timer); st > 0 ? step(st - 1) : close(); },
        show, close, cancel: () => cancel(),
      };
      const cancel = () => {
        if (snapshot) { c.state.votes = snapshot.votes; c.state.woken = snapshot.woken; c.save(); }
        close();
      };
      ov.addEventListener('click', e => {
        if (e.target.closest('[data-act=close-pod]')) return cancel();
        if (e.target.closest('[data-act=open-slides]')) return openSlides();
        if (st < 3) { step(st + 1); auto(); }
      });
      el.addEventListener('click', e => {
        if (e.target.closest('.rv-overlay')) return;
        const b = e.target.closest('[data-act]');
        if (b) {
          const id = b.dataset.id;
          c.state.votes[id] = Math.max(0, (c.state.votes[id] || 0) + (b.dataset.act === 'up' ? 1 : -1));
          c.save();
          syncVotes();
          return;
        }
        const pod = e.target.closest('.pod[data-pod]');
        if (pod && !c.state.woken.includes(pod.dataset.pod)) show(pod.dataset.pod);
      });
    },
  });

  // ───────────────────────── PODS ─────────────────────────
  const custom = (podId, def) => ({
    id: `${podId}-${def.slug}`, seq: 'pod:' + podId, steps: def.caps.length,
    cls: `custom t-${HS.podById(podId).deck} ${def.cls || ''}`,
    html: () => `${head(deckOf(HS.podById(podId)) + ' · ' + HS.podById(podId).name, def.title)}
      <div class="pane"><div class="stage">${def.body}</div><aside>${HS.caps(def.caps)}</aside></div>`,
    init: def.init,
    step: (el, st, c) => { HS.capStep(el, st); if (def.step) def.step(el, st, c); },
  });

  const podSlides = {
    worktrees: [{
      slug: 'why', title: 'Three agents, one checkout',
      body: `<svg viewBox="0 0 1000 560">
        <g data-o="2">
          <rect class="box" x="60" y="60" width="440" height="400" rx="18"/>
          <text class="lbl big" x="90" y="110">~/app</text><text class="lbl dim" x="400" y="110">(main?)</text>
          ${['src/auth.ts', 'src/search.ts', 'src/billing.ts', 'package-lock.json'].map((f, i) => `<text class="mono" x="90" y="${170 + i * 60}">${f}</text>`).join('')}
          <circle class="ag ag1" cx="380" cy="165" r="18"/><circle class="ag ag2" cx="420" cy="225" r="18"/><circle class="ag ag3" cx="385" cy="285" r="18"/>
          <g data-s="1" class="bad">
            <path class="spark" d="M340 200 l14 6 l-4 -16 l12 12 l2 -14 l6 16"/><path class="spark" d="M300 330 l12 8 l-2 -16 l12 12 l4 -14 l4 16"/>
            <text x="560" y="150" class="lbl red">agent 2 switched branch</text><text x="560" y="180" class="lbl dim">agent 1's edits are now on the wrong branch</text>
            <text x="560" y="250" class="lbl red">file changed on disk</text><text x="560" y="280" class="lbl dim">agent 3 overwrote search.ts mid-edit</text>
            <text x="560" y="350" class="lbl red">npm install × 3</text><text x="560" y="380" class="lbl dim">lockfile roulette</text>
          </g>
        </g>
        <g data-s="2">
          <ellipse class="git" cx="220" cy="190" rx="110" ry="26"/><path class="git" d="M110 190 v150 a110 26 0 0 0 220 0 v-150"/><ellipse class="git-top" cx="220" cy="190" rx="110" ry="26"/>
          <text class="lbl big" x="220" y="280" text-anchor="middle">.git</text><text class="lbl dim" x="220" y="310" text-anchor="middle">one object store</text>
          ${[['app-auth', 'auth', 1], ['app-search', 'search', 2], ['app-billing', 'billing', 3]].map(([d, b, i]) => `
            <path class="link" d="M330 ${265} C 450 265, 450 ${i * 150 - 60}, 560 ${i * 150 - 60}"/>
            <rect class="box ok" x="560" y="${i * 150 - 115}" width="380" height="110" rx="14"/>
            <text class="lbl" x="590" y="${i * 150 - 72}">../${d}</text><text class="mono dim" x="590" y="${i * 150 - 38}">branch: ${b}</text>
            <circle class="ag ag${i}" cx="900" cy="${i * 150 - 60}" r="18"/>`).join('')}
        </g>
        <g data-s="3"><rect class="term" x="60" y="470" width="880" height="70" rx="10"/><text class="mono" x="84" y="514">$ git worktree add ../app-auth -b auth   <tspan class="dim"># ×N, one per agent</tspan></text></g>
      </svg>`,
      caps: ['Three agents work in <b>one checkout</b>.', 'They trample each other: branches switch underneath, files change mid-edit.', '<b>One .git, N working directories.</b> Each agent its own folder and branch.', 'Ten years as the hotfix side door. Now: <b>one per agent</b>.<br><small>How: the Git Worktrees deck.</small>'],
    }],
    boxes: [{
      slug: 'why', title: 'Give the agent a box you can wipe',
      body: `<svg viewBox="0 0 1000 560">
        <g class="laptop"><rect class="box" x="60" y="120" width="340" height="220" rx="14"/><path class="box" d="M30 350 h400 l-30 34 h-340Z"/>
          ${['~/.ssh/id_ed25519', '~/.aws/credentials', 'browser cookies', 'your other repos'].map((t, i) => `<text class="mono" x="90" y="${175 + i * 42}">${t}</text>`).join('')}
          <text class="lbl dim" x="230" y="420" text-anchor="middle">your laptop</text></g>
        <g class="agent-yolo" data-o="1"><circle class="ag ag1" cx="700" cy="220" r="26"/><text class="mono red" x="700" y="290" text-anchor="middle">--dangerously-skip-permissions</text>
          <path class="arrow bad" d="M670 220 L420 220"/></g>
        <g data-s="1">
          <g class="vm" data-o="2"><rect class="box ok" x="560" y="110" width="360" height="260" rx="16"/><text class="lbl" x="590" y="150">throwaway VM</text><text class="mono dim" x="590" y="182">snapshot: clean</text>
            <circle class="ag ag1" cx="740" cy="270" r="26"/><text class="mono red" x="740" y="340" text-anchor="middle">--dangerously-skip-permissions</text></g>
          <path class="wall" d="M480 90 v320"/>
        </g>
        <g data-s="2" data-o="3" class="crumble"><rect class="box bad" x="560" y="110" width="360" height="260" rx="16"/><text class="lbl red" x="740" y="230" text-anchor="middle">rm -rf / --no-preserve-root</text><text class="lbl red" x="740" y="270" text-anchor="middle">✗ box destroyed</text></g>
        <g data-s="3"><rect class="box ok" x="560" y="110" width="360" height="260" rx="16"/><text class="lbl" x="590" y="150">throwaway VM</text><text class="mono green" x="590" y="182">rollback to snapshot · 4 s</text><circle class="ag ag1" cx="740" cy="270" r="26"/></g>
      </svg>`,
      caps: ['YOLO mode on your laptop: the agent can reach <b>everything you can</b>.', 'Put it in a box. The wall is the point.', 'It will break the box. That\'s fine.', 'Roll back, carry on. <b>Homelab: one VM per agent.</b>'],
    }],
    tmux: [{
      slug: 'why', title: 'Watching several agents at once',
      body: `<svg viewBox="0 0 1000 560">
        <rect class="term" x="40" y="30" width="920" height="500" rx="12"/>
        <g class="pane-a"><text class="mono" x="66" y="80">agent-1 ❯ refactor billing</text><text class="mono dim" x="66" y="112">● editing src/billing.ts</text></g>
        <g data-s="1"><path class="split" d="M500 40 v480"/><text class="mono" x="526" y="80">dev ❯ npm run dev</text><text class="mono green" x="526" y="112">ready on :5173</text><text class="mono red" x="526" y="144">TypeError: total is undefined</text></g>
        <g data-s="2"><path class="split" d="M40 285 h920"/><text class="mono" x="66" y="330">agent-2 ❯ add search filters</text><text class="mono dim" x="66" y="362">● running tests 41/120</text>
          <text class="mono" x="526" y="330">tests ❯ vitest --watch</text><text class="mono green" x="526" y="362">✓ 118 passed</text><text class="mono red" x="526" y="394">✗ 2 failed</text></g>
        <g data-s="3"><path class="arrow ok" d="M300 140 C 360 200, 420 200, 516 150"/><rect class="tag" x="90" y="176" width="420" height="78" rx="10"/>
          <text class="mono" x="118" y="210">tmux capture-pane -p -t dev</text><text class="mono dim" x="118" y="238">the agent reads the error itself</text></g>
      </svg>`,
      caps: ['One agent, one terminal.', 'The dev server needs a pane.', 'Four panes: two agents, a dev server, a test watcher.', 'The surprise: the agent <b>reads the other panes itself</b>.'],
    }],
    mergequeue: [{
      slug: 'why', title: 'Green alone, red together',
      body: `<svg viewBox="0 0 1000 560">
        <path class="main" d="M40 470 H960"/><text class="lbl" x="40" y="520">main</text>
        <g data-s="1">${[0, 1, 2, 3, 4].map(i => `<path class="branch" d="M${100 + i * 120} 470 C ${100 + i * 120} 380, ${150 + i * 120} 360, ${170 + i * 120} ${300 - i * 40}"/><circle class="ok-dot" cx="${170 + i * 120}" cy="${300 - i * 40}" r="16"/><text class="lbl green" x="${170 + i * 120}" y="${300 - i * 40 + 6}" text-anchor="middle">✓</text><text class="mono dim" x="${170 + i * 120}" y="${270 - i * 40}" text-anchor="middle">agent-${i + 1}</text>`).join('')}</g>
        <g data-s="2" data-o="3">${[0, 1, 2, 3, 4].map(i => `<path class="merge" d="M${170 + i * 120} ${300 - i * 40} C ${600 + i * 20} 300, 760 420, 820 470"/>`).join('')}<circle class="bad-dot" cx="840" cy="470" r="26"/><text class="lbl red" x="840" y="478" text-anchor="middle">✗</text><text class="lbl red" x="840" y="430" text-anchor="middle">main is red</text></g>
        <g data-s="3">${['#1', '#1+2', '#1+2+3', '#1+2+4', '#1+2+4+5'].map((t, i) => `<rect class="qbox ${i === 2 ? 'bad' : 'ok'}" x="${700}" y="${40 + i * 70}" width="250" height="54" rx="10"/><text class="mono ${i === 2 ? 'red' : 'green'}" x="${720}" y="${74 + i * 70}">${i === 2 ? '✗' : '✓'} main + ${t.slice(1)}</text>`).join('')}<circle class="ok-dot" cx="940" cy="470" r="20"/><text class="lbl green" x="940" y="477" text-anchor="middle">✓</text><text class="lbl dim" x="950" y="420" text-anchor="end">#3 bounced, main stays green</text></g>
      </svg>`,
      caps: ['main is green.', 'Five agents, five green branches.', 'Each green alone. Merged together: <b>main is red</b>.', 'A merge queue tests each PR <b>on top of the ones before it</b>. main never breaks.'],
    }],
    trailers: [{
      slug: 'why', title: 'You\'ve been looking at one for two years',
      body: `<div class="commit">
          <div class="mono"><span class="y">commit 3f9c2e1</span></div>
          <div class="mono">Author: you &lt;you@example.com&gt;</div>
          <div class="mono">&nbsp;</div>
          <div class="mono">&nbsp;&nbsp;&nbsp;&nbsp;feat: let the audience vote on pods</div>
          <div class="mono">&nbsp;</div>
          <div class="mono trailer">&nbsp;&nbsp;&nbsp;&nbsp;Co-Authored-By: Claude &lt;noreply@anthropic.com&gt;</div>
          <div class="trailer-tag" data-s="1">↑ a <b>commit trailer</b> · <code>git interpret-trailers</code>, 2014</div>
        </div>
        <div class="term-block" data-s="2"><div class="mono">$ git log --format='%(trailers:key=Co-Authored-By,valueonly)' | sort | uniq -c</div>
          <div class="mono green">&nbsp;&nbsp;1284 Claude &lt;noreply@anthropic.com&gt;</div><div class="mono dim">&nbsp;&nbsp;&nbsp;&nbsp;(the rest is you)</div></div>
        <div class="stamp" data-s="3">ALIEN MARK<br><span>crew −10</span></div>`,
      caps: ['Recognise the last line?', 'It has a name: a <b>commit trailer</b>. Key: value, at the end of the message.', 'Trailers are queryable. Who wrote main?', 'The twist: every one is <b>the alien\'s mark</b>. This crew member costs points.'],
    }],
    bisect: [{
      slug: 'why', title: '64 commits, nobody watching',
      body: `<svg viewBox="0 0 1000 560" class="bisect">
        ${Array.from({ length: 64 }, (_, i) => `<rect class="c" data-i="${i}" x="${40 + i * 14.4}" y="230" width="11" height="70" rx="3"/>`).join('')}
        <text class="lbl green" x="45" y="210">good</text><text class="lbl red" x="960" y="210" text-anchor="end">bad</text>
        <g class="marks"></g>
        <text class="lbl big runs" x="40" y="400">test runs: 0</text>
        <g data-s="7"><rect class="term" x="40" y="440" width="920" height="90" rx="10"/><text class="mono" x="64" y="478">$ git bisect start HEAD v2.3 &amp;&amp; git bisect run npm test</text><text class="mono green" x="64" y="510">a41c9e0 is the first bad commit</text></g>
      </svg>`,
      caps: ['Somewhere in 64 commits, something broke.', 'Test the middle: good.', 'Middle again: bad.', 'Good.', 'Bad.', 'Bad.', 'Good. Found it.', '<b>6 test runs.</b> An agent runs them unattended.'],
      step: (el, st) => {
        const culprit = 41;
        let lo = 0, hi = 63;
        const tested = [];
        for (let k = 0; k < Math.min(st, 6); k++) {
          const mid = Math.floor((lo + hi) / 2);
          const bad = mid >= culprit;
          tested.push([mid, bad]);
          if (bad) hi = mid; else lo = mid;
        }
        el.querySelectorAll('.bisect .c').forEach(r => {
          const i = +r.dataset.i;
          r.setAttribute('class', `c ${i < lo || i > hi ? 'out' : ''} ${st >= 6 && i === culprit ? 'culprit' : ''}`);
        });
        el.querySelector('.marks').innerHTML = tested.map(([m, b]) => `<text class="lbl ${b ? 'red' : 'green'}" x="${45 + m * 14.4}" y="340" text-anchor="middle">${b ? '✗' : '✓'}</text>`).join('');
        el.querySelector('.runs').textContent = `test runs: ${tested.length}`;
      },
    }],
    gitnotes: [{
      slug: 'why', title: 'Metadata that doesn\'t rewrite history',
      body: `<svg viewBox="0 0 1000 560">
        <path class="main" d="M40 200 H420"/><circle class="commit-dot" cx="300" cy="200" r="22"/><text class="mono" x="300" y="160" text-anchor="middle">a41c9e0</text>
        <g data-s="1" data-o="2"><path class="link dashed" d="M300 222 V300"/><rect class="note" x="140" y="300" width="330" height="170" rx="10"/>
          ${['agent: claude-code', 'prompt: "add vote buttons"', 'cost: $0.42 · 6 min', 'session: …/sessions/8f2c'].map((t, i) => `<text class="mono" x="160" y="${340 + i * 34}">${t}</text>`).join('')}</g>
        <g data-s="2"><path class="arrow" d="M440 200 H620"/><rect class="box" x="640" y="110" width="320" height="180" rx="14"/><text class="lbl" x="660" y="150">origin</text><circle class="commit-dot" cx="800" cy="220" r="22"/>
          <g data-o="3"><rect class="note lost" x="140" y="330" width="330" height="140" rx="10"/><text class="mono red" x="160" y="400">refs/notes/* not pushed</text></g></g>
        <g data-s="3"><rect class="term" x="40" y="480" width="920" height="60" rx="10"/><text class="mono" x="64" y="518">$ git push origin 'refs/notes/*'</text>
          <path class="link dashed" d="M800 242 V320"/><rect class="note" x="660" y="320" width="300" height="110" rx="10"/><text class="mono" x="680" y="360">agent: claude-code</text><text class="mono" x="680" y="392">prompt: "add vote…"</text></g>
      </svg>`,
      caps: ['A commit.', 'Attach a note: which agent, which prompt, what it cost. The commit hash doesn\'t change.', 'Push… and the note stays behind. That\'s why everyone thought notes were broken.', 'One refspec. Now every commit carries its <b>provenance</b>.'],
    }],
    mutation: [{
      slug: 'why', title: 'Who tests the tests?',
      body: `<div class="two">
        <div class="card"><div class="card-h">canVote.ts</div><pre class="code">function canVote(age) {
  return age <span class="op"><span class="orig" data-o="1">&gt;=</span><span class="mut" data-s="1">&gt;</span></span> 18;
}</pre><div class="mut-tag" data-s="1">mutant #7: <code>&gt;=</code> → <code>&gt;</code></div></div>
        <div class="card"><div class="card-h">canVote.test.ts <small>(written by the agent)</small></div><pre class="code">expect(canVote(30)).toBe(true)   <span class="green">✓</span>
expect(canVote(5)).toBe(false)   <span class="green">✓</span>
<span data-s="2">expect(canVote(18)).toBe(true)   <span class="red">✗ on mutant</span></span></pre>
          <div class="banner bad" data-s="1" data-o="2">MUTANT SURVIVED</div><div class="banner ok" data-s="2">MUTANT KILLED</div></div>
        </div>
        <div class="meter" data-s="3"><label>mutation score</label><div class="bar"><i></i></div><b><span class="from">61%</span> → <span class="to">94%</span></b></div>`,
      caps: ['Agent-written code. Agent-written tests. All green.', 'Flip one operator. <b>The tests stay green.</b> They assert nothing about the boundary.', 'The agent adds the boundary test. Mutant killed.', 'Compute is cheap: run thousands of mutants on every PR.'],
    }],
    pbt: [{
      slug: 'why', title: 'The agent picked its own examples',
      body: `<div class="two">
        <div class="card"><div class="card-h">examples <small>(chosen by the agent that wrote the code)</small></div><pre class="code">decode(encode("hello")) <span class="green">✓</span>
decode(encode("abc"))   <span class="green">✓</span>
decode(encode("123"))   <span class="green">✓</span></pre></div>
        <div class="card" data-s="1"><div class="card-h">property</div><pre class="code">∀ s: decode(encode(s)) === s</pre>
          <svg viewBox="0 0 400 160" class="spray">${Array.from({ length: 120 }, (_, i) => `<circle cx="${12 + (i % 20) * 19}" cy="${14 + Math.floor(i / 20) * 26}" r="7" class="${i === 87 ? 'hit' : ''}" style="animation-delay:${(i * 0.015).toFixed(3)}s"/>`).join('')}</svg></div>
        </div>
        <div class="counter" data-s="2"><span class="mono red">✗ "Ünïcödé ☃ test"</span> <span class="arrow-r" data-s="3">→ shrinks to</span> <span class="mono red big" data-s="3">"é"</span></div>`,
      caps: ['Three examples. All green. Of course: the same agent wrote the code.', 'A property and a generator: hundreds of inputs the agent never thought of.', 'One fails.', 'Shrinking finds the <b>smallest</b> counterexample. Agents write the generators.'],
    }],
    formal: [{
      slug: 'why', title: 'Backpressure that can\'t be argued with',
      body: `<div class="chat">
        <div class="bubble llm">This lock-free queue is correct. ✅ Trust me.</div>
        <div class="bubble checker bad" data-s="1">✗ Invariant <code>NoLostWrites</code> violated<br><small>state 7: two writers claim slot 3</small></div>
        <div class="bubble llm" data-s="2">You're absolutely right! Here's the fix.</div>
        <div class="bubble checker ok" data-s="3">✓ 2,416,331 states explored · no violations</div>
      </div>`,
      caps: ['The LLM is very good at <b>sounding</b> right.', 'The model checker doesn\'t care how it sounds.', 'Iterate.', 'Writing the spec and proof was the cost. <b>LLMs write them now.</b>'],
    }],
    hooks: [{
      slug: 'why', title: 'The gate everyone walked around',
      body: `<svg viewBox="0 0 1000 560">
        <rect class="box" x="40" y="220" width="200" height="90" rx="12"/><text class="mono" x="140" y="272" text-anchor="middle">git commit</text>
        <rect class="gate" x="400" y="180" width="200" height="170" rx="12"/><text class="lbl" x="500" y="225" text-anchor="middle">pre-commit</text>
        ${['lint', 'types', 'tests'].map((t, i) => `<text class="mono dim" x="500" y="${265 + i * 28}" text-anchor="middle">${t}</text>`).join('')}
        <rect class="box" x="760" y="220" width="200" height="90" rx="12"/><text class="mono" x="860" y="272" text-anchor="middle">repo</text>
        <path class="arrow" d="M240 265 H400"/><path class="arrow" d="M600 265 H760"/>
        <g data-s="1"><path class="arrow bad dashed" d="M200 220 C 300 90, 700 90, 820 220"/><text class="mono red" x="500" y="88" text-anchor="middle">humans: git commit --no-verify</text></g>
        <g data-s="2"><path class="arrow dashed" d="M200 310 C 260 480, 380 480, 420 440"/><path class="wall bad" d="M430 410 v80"/><text class="mono" x="460" y="440">agent: git commit --no-verify</text><text class="mono red" x="460" y="472">✗ denied by permission rule</text></g>
        <g data-s="3"><text class="lbl green" x="500" y="168" text-anchor="middle">✓ the gate holds</text></g>
      </svg>`,
      caps: ['Hooks: since Git 1.0, 2005.', 'Slow hook? Humans skipped it.', 'Agents don\'t get the choice: <code>--no-verify</code> is blocked.', 'The hook finally is what it was meant to be: <b>a gate</b>.<br><small>A guardrail that only warns is documentation.</small>'],
    }],
    stackoverflow: [{
      slug: 'chart', title: 'Monthly new questions', cls: 'deadslide',
      body: (() => {
        const data = [[2009, 25], [2010, 50], [2011, 85], [2012, 130], [2013, 175], [2014, 200], [2015, 195], [2016, 190], [2017, 180], [2018, 160], [2019, 145], [2020, 155], [2021, 130], [2022, 110], [2023, 70], [2024, 35], [2025, 15]];
        const X = i => 90 + i * 52, Y = v => 470 - v * 2;
        return `<svg viewBox="0 0 1000 560" class="chart">
          <path class="axis" d="M70 470 H980 M70 470 V40"/>
          ${[50, 100, 150, 200].map(v => `<text class="mono dim" x="60" y="${Y(v) + 6}" text-anchor="end">${v}k</text><path class="grid" d="M70 ${Y(v)} H980"/>`).join('')}
          ${data.map(([y, v], i) => `<g data-s="${y <= 2014 ? 0 : y <= 2022 ? 1 : 2}"><rect class="bar ${y >= 2023 ? 'bad' : ''}" x="${X(i)}" y="${Y(v)}" width="38" height="${v * 2}" rx="4"/><text class="mono dim" x="${X(i) + 19}" y="500" text-anchor="middle">${String(y).slice(2)}</text></g>`).join('')}
          <g data-s="2"><path class="marker" d="M${X(13) + 46} 60 V470"/><text class="mono" x="${X(13) + 40}" y="56" text-anchor="end">Nov 2022: chat assistants</text></g>
          <g data-s="3"><text class="lbl red huge" x="975" y="200" text-anchor="end">−90%</text></g>
          <text class="mono dim" x="980" y="540" text-anchor="end">≈ placeholder figures · replace with a Stack Exchange Data Explorer query</text>
        </svg>`;
      })(),
      caps: ['2008–2014: the place every developer went.', 'A long, slow plateau.', 'Then: questions get answered <b>inside the agent</b>.', 'The alien ate it. <b>Not every crew member survives the thaw.</b>'],
    }],
    saas: [{
      slug: 'story', title: 'I needed three PDF operations', cls: 'deadslide',
      body: `<div class="two">
        <div class="card"><div class="card-h">buy / host: Stirling PDF</div><ul class="check">${['docker compose', 'reverse proxy + TLS', 'auth in front of it', 'updates', 'CVE watching', '50 features I don\'t need'].map((t, i) => `<li data-s="${i < 3 ? 0 : 1}">${t}</li>`).join('')}</ul></div>
        <div class="card" data-s="2"><div class="card-h">build: ask an agent</div><ul class="check ok"><li>merge</li><li>split</li><li>compress</li></ul><div class="timer">⏱ 2 h</div></div>
      </div>`,
      caps: ['Small SaaS tools: why build what you can buy?', 'Because "buying" (or hosting) has a running cost too.', 'Building exactly what I need: <b>two hours</b>.'],
    }],
    storypoints: [{
      slug: 'poker', title: 'Planning poker', cls: 'deadslide',
      body: `<div class="poker">${['1', '2', '3', '5', '8', '13', '?'].map((v, i) => `<div class="pcard" style="transform: rotate(${(i - 3) * 7}deg) translateY(${Math.abs(i - 3) * 9}px)">${v}</div>`).join('')}</div>
        <div class="timers"><div class="tm" data-s="1"><label>estimation meeting</label><b>45:00</b></div><div class="tm ok" data-s="2"><label>agent builds it</label><b>03:52</b></div></div>`,
      caps: ['How many points is this story?', 'The meeting takes 45 minutes.', 'The build takes four.'],
    }],
  };

  for (const p of HS.pods) {
    for (const d of podSlides[p.id] || []) add(custom(p.id, d));
  }

  // ───────────────────────── INTERMEZZO ─────────────────────────
  add({
    id: 'strike', seq: 'intermezzo', steps: 3, cls: 'twist strike',
    html: () => `${HS.marquee('⚠ HULL BREACH · LIFE SUPPORT FAILING ·')}
      <div class="twist-body">
        <div class="twist-eye">${A.alien('angry')}</div>
        <div class="twist-text">
          <div class="big">The alien strikes back.</div>
          <ul class="alien-events" data-s="1">${HS.alienEvents.intermezzo.map(([n, v]) => `<li><span>${n}</span><b>+${v}</b></li>`).join('')}</ul>
          <div class="dying-row" data-s="2">${HS.dying.map(d => `<div class="dpod">${A.cryo('dying', 'LIFE SUPP.')}<b>${d.name}</b><small>${d.why}</small></div>`).join('')}</div>
        </div>
      </div>
      <div class="hud-corner">${A.hud()}</div>`,
    step: (el, st, c) => {
      if (c.active && st >= 1 && !c.state.events.intermezzo) { c.state.events.intermezzo = true; A.hudUpdate(el, c); }
      else A.hudUpdate(el, c, false);
      el.querySelectorAll('.dpod .cryo').forEach(s => { s.setAttribute('class', `cryo ${st >= 2 ? 'dead' : 'dying'}`); s.querySelector('.readout-t').textContent = st >= 2 ? 'LOST' : 'LIFE SUPP.'; });
    },
  });

  add({
    id: 'status', seq: 'intermezzo', cls: 'status plate',
    html: c => {
      const sc = c.score;
      return `${head('status report', 'Halfway there')}
        <div class="status-cols">${['isolation', 'integration', 'verification'].map(t => `<div class="scol t-${t}"><div class="scol-h">Deck ${HS.TYPES[t].n} · ${HS.TYPES[t].label}</div>${HS.pods.filter(p => p.deck === t).map(p => `<div class="srow ${c.state.woken.includes(p.id) ? 'on' : ''}">${c.state.woken.includes(p.id) ? '●' : '○'} ${p.name}</div>`).join('')}</div>`).join('')}</div>
        <div class="status-foot">${sc.wokenDead.length ? `Lost to the alien: ${sc.wokenDead.map(p => p.name).join(', ')}. ` : ''}Crew <b>${sc.crew}</b> · alien <b class="red">${sc.alien}</b></div>`;
    },
  });

  // ───────────────────────── FINAL ─────────────────────────
  add({
    id: 'final', seq: 'final', steps: 3, cls: 'thaw final',
    html: () => `<div class="thaw-pod">${A.pod('dying big')}</div>
      <div class="thaw-info">
        <div class="kicker">the bow · final pod</div>
        <h1>Schrödinger's developer</h1>
        <div class="meta"><span>half alive · half dead</span></div>
        <div class="manifest-reveal" data-s="1">${HS.photo ? `<img src="${HS.photo}" alt="crew manifest">` : `<div class="placeholder">${Array.from({ length: 18 }, () => '<i></i>').join('')}</div>`}<div class="cap-line">CREW MANIFEST · ALL HANDS</div></div>
        <div class="big-line" data-s="2">It's you.</div>
      </div>`,
    step: (el, st) => { const s = el.querySelector('.podsvg'); s.classList.toggle('open', st >= 1); s.classList.toggle('dying', st < 1); },
  });

  add({
    id: 'vitals', seq: 'final', steps: 5, cls: 'vitals',
    html: () => `${head('pod screen · vitals', 'Schrödinger\'s developer')}
      <div class="vit">${[
        ['Typing code', 'flat', 'flatlined', 'bad'],
        ['Memorizing APIs', 'weak', 'weak', 'warn'],
        ['Turning vague requirements into a spec', 'strong', 'strong pulse: business can\'t describe what it wants', 'ok'],
        ['Security', 'pulse', 'pulse: asked for <code>.lan</code> (local only), got 60 days public', 'ok'],
        ['Architecture', 'pulse', 'pulse: Meridian, 5 failed attempts at a dead-simple design until explained in detail', 'ok'],
      ].map(([n, k, r, c], i) => `<div class="vrow ${c}" data-s="${i}"><div class="vn">${n}</div>${A.ecg(k)}<div class="vr">${r}</div></div>`).join('')}</div>`,
  });

  add({
    id: 'diagnosis', seq: 'final', steps: 2,
    html: () => `<div class="statement"><div class="kicker">diagnosis</div><div class="big">Condition: <em class="cyan">Schrödinger</em>.</div>
      <div class="small">Outcome depends on what you do next.</div>
      <div class="small quote" data-s="1">"The coder is dying. The developer was never just a coder."</div></div>`,
  });

  // ───────────────────────── OUTRO ─────────────────────────
  add({
    id: 'scoreboard', seq: 'outro', steps: 4, cls: 'scoreboard',
    enter: c => { c.state.events.final = true; },
    html: c => {
      const sc = c.score;
      const pre = HS.score({ ...c.state, events: { ...c.state.events, final: false } });
      const max = Math.max(sc.crew, sc.alien, 1);
      const win = sc.crew >= sc.alien;
      return `${head('final score', 'Crew vs alien AI')}
        <div class="bars">
          <div class="brow crew"><label>Crew</label><div class="b"><i style="--w0:${(pre.crew / max) * 100}%;--w:${(sc.crew / max) * 100}%"></i></div><b data-n="${sc.crew}">${pre.crew}</b></div>
          <div class="brow alien"><label>Alien AI</label><div class="b"><i style="--w0:${(pre.alien / max) * 100}%;--w:${(sc.alien / max) * 100}%"></i></div><b data-n="${sc.alien}">${pre.alien}</b></div>
        </div>
        <div class="sleepers" data-s="1">${sc.sleeping} crew members left in hypersleep · alien +${HS.RULES.sleeping} each</div>
        <div class="reveal" data-s="2">The "new AI tooling" you woke tonight is on average <b>${sc.avgAge} years old</b>.<small>${sc.wokenLive.map(p => `${p.name} ${p.born}`).join(' · ')}</small></div>
        <div class="verdict ${win ? 'ok' : 'bad'}" data-s="3">${win ? 'The crew wins. Narrowly.' : 'The alien AI wins. This time.'}</div>`;
    },
    step: (el, st, c) => {
      el.querySelectorAll('.brow b').forEach(b => {
        const to = +b.dataset.n;
        if (c.active && st >= 1 && !b._done) { b._done = true; A.countUp(b, +b.textContent, to); }
      });
      if (c.active && st >= 1) { c.state.shown = { crew: c.score.crew, alien: c.score.alien }; c.save(); }
    },
  });

  add({
    id: 'closing', seq: 'outro', steps: 2,
    html: () => `<div class="statement headline"><div class="big">The tools for running 10 agents were already on board.</div>
      <div class="big cold">They were frozen.</div>
      <div class="small" data-s="1">Go wake one on Monday. ❄ → 💚</div></div>`,
  });

  add({
    id: 'about', seq: 'outro', cls: 'about',
    html: () => `${head('about this talk', 'Out of Hypersleep')}
      <div class="about-grid">
        <div><h3>Source</h3><p>Talk idea, message map and open questions:<br><a href="${HS.SOURCE}" target="_blank">${HS.SOURCE.replace('https://', '')}</a></p>
          <h3>The how</h3><p><i>Git Worktrees: One Repo, N Coding Agents</i><br><i>Guardrails &amp; Backpressure</i><br><a href="https://github.com/itenium-be/git-worktrees" target="_blank">github.com/itenium-be/git-worktrees</a></p></div>
        <div><h3>Related</h3><p><i>I Needed a Merge Queue. I Ended Up With a Dark Factory</i><br><i>I've Stopped Reviewing the Code</i><br><i>Who Goes There?</i> (mutation testing)</p>
          <h3>Credits</h3><p>All artwork drawn in SVG/CSS for this deck. A theme, not a recreation: no film stills, logos or likenesses.<br>Dates marked "to verify" in the notes still need checking.</p></div>
      </div>`,
  });

  HS.slides = S;
  HS.setVotes = votes => {
    HS.state().votes = { ...votes };
    HS.save();
    if (HS.currentId() === 'map') HS.refreshActive();
  };
})();
