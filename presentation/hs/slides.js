import QRCode from 'qrcode';
import soCsv from '../data/stackoverflow-questions.csv?raw';

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
    const cls = ['pod', `t-${p.deck}`, `is-${state}`, HS.leader() === p.id ? 'lead' : '', p.wip ? 'wip' : ''].join(' ');
    const votes = HS.votesOf(p.id);
    const label = { closed: 'HYPERSLEEP', awake: 'REVIVED', dead: 'NO SIGNS' }[state];
    return `<div class="${cls}" data-pod="${p.id}">
      ${p.wip ? '<div class="wip-tag">WIP</div>' : ''}
      <div class="pod-art">${A.cryo(state, label)}</div>
      ${woken ? '' : `<div class="votes"><span class="vn">${votes}</span><small>votes</small><div class="vb"><button data-act="down" data-id="${p.id}">−</button><button data-act="up" data-id="${p.id}">+</button></div></div>`}
      <div class="pod-info"><span class="yr">❄ ${p.frozen}</span>${A.rel(p.power)}${A.flip(Math.abs(p.score.alive), Math.abs(woken && p.score.alive < 0 ? p.score.alive : p.score.dead), woken ? (p.dead || p.score.alive < 0 ? 'show-neg' : 'show-pos') : '')}</div>
    </div>`;
  };

  const BEAT = [[0, 0], [70, 0], [84, -26], [98, 44], [114, -56], [130, 24], [142, 0], [220, 0]];
  const beatY = x => {
    for (let i = 1; i < BEAT.length; i++) {
      const [x0, y0] = BEAT[i - 1], [x1, y1] = BEAT[i];
      if (x <= x1) return y0 + (y1 - y0) * ((x - x0) / (x1 - x0));
    }
    return 0;
  };
  const stopEcg = cv => { if (cv && cv._raf) { cancelAnimationFrame(cv._raf); cv._raf = 0; } };
  const startEcg = (cv, dead) => {
    if (!cv || cv._raf) return;
    const ctx = cv.getContext('2d');
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    const W = 880, H = 120, MID = 60, SPEED = 260, GAP = 36;
    const color = dead ? '#ff3b3b' : '#7dffb0';
    let x = 0, total = 0, last = performance.now(), prevY = MID;
    ctx.clearRect(0, 0, W, H);
    const yAt = t => MID + (dead ? (t < 220 ? beatY(t) : 0) : beatY(t % 220));
    const frame = now => {
      if (!cv.isConnected) return stopEcg(cv);
      const dx = Math.min(40, ((now - last) / 1000) * SPEED);
      last = now;
      ctx.clearRect(x, 0, GAP + dx, H);
      ctx.strokeStyle = color; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.shadowColor = color; ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(x, prevY);
      let nx = x, ny = prevY;
      for (let s = 1; s <= Math.ceil(dx); s++) { nx = x + Math.min(s, dx); ny = yAt(total + Math.min(s, dx)); ctx.lineTo(nx, ny); }
      ctx.stroke();
      total += dx; x = nx; prevY = ny;
      if (x >= W) { x = 0; ctx.clearRect(0, 0, GAP, H); prevY = yAt(total); }
      const tip = cv.parentElement.querySelector('.rv-tip');
      if (tip) { tip.style.left = `${80 + x}px`; tip.style.top = `${prevY}px`; }
      cv._raf = requestAnimationFrame(frame);
    };
    cv._raf = requestAnimationFrame(frame);
  };

  const revive = {
    html: p => {
      const pts = p.score.alive;
      return `<button class="rv-close" data-act="close-pod" title="Close without waking this pod">×</button><div class="rv-alarm"><span>REVIVAL SEQUENCE · REVIVAL SEQUENCE · REVIVAL SEQUENCE · REVIVAL SEQUENCE</span></div>
        <div class="rv-pod">${A.cryo('closed', 'HYPERSLEEP', 9)}</div>
        <div class="rv-steam">${Array.from({ length: 12 }, (_, i) => `<i style="left:${140 + i * 64}px;top:${330 + (i % 3) * 30}px;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;animation-delay:${(i * 0.12).toFixed(2)}s"></i>`).join('')}</div>
        <div class="rv-info">
          <div class="kicker">crew member · ${deckOf(p)}</div>
          <h1>${p.name}</h1>
          <dl class="rv-dates"><dt>BORN</dt><dd>${p.born}</dd><dt class="died">DIED</dt><dd class="died">${p.died ?? '?'}</dd></dl>
          <div class="rv-verdict ${p.dead ? 'dead' : pts < 0 ? 'alive traitor' : 'alive'}">${p.dead ? `NO LIFE SIGNS<small>alien +${Math.abs(p.score.dead)}</small><span class="rv-sub">eaten by the alien AI</span>` : `LIFE SIGNS: STABLE<small>${pts < 0 ? `alien +${-pts}` : `crew +${pts}`}</small>${pts < 0 ? '<span class="rv-sub">it works for the alien</span>' : ''}`}</div>
          <button class="rv-open" data-act="open-slides">Open the slides ↗</button>
        </div>
        <canvas class="rv-ecg ${p.dead ? 'dead' : 'alive'}" width="1760" height="240"></canvas>
        <div class="rv-tip ${p.dead ? 'dead' : 'alive'}"></div>
        <div class="rv-flash"></div>`;
    },
    step: (el, p, st) => {
      for (let k = 1; k < 4; k++) el.classList.toggle('s' + k, k <= st);
      const svg = el.querySelector('.rv-pod .cryo');
      const state = st >= 3 && p.dead ? 'dead' : st >= 2 ? 'awake' : 'closed';
      svg.setAttribute('class', `cryo ${state}`);
      svg.querySelector('.readout-t').textContent = st >= 3 ? (p.dead ? 'NO SIGNS' : 'REVIVED') : st >= 1 ? 'VENTING' : 'HYPERSLEEP';
      const ecg = el.querySelector('canvas.rv-ecg');
      if (st >= 3) startEcg(ecg, p.dead); else stopEcg(ecg);
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
    id: `${podId}-${def.slug}`, seq: 'pod:' + podId, steps: def.steps || def.caps?.length || 1,
    cls: `custom t-${HS.podById(podId).deck} ${def.cls || ''}`,
    html: () => `${head(deckOf(HS.podById(podId)) + ' · ' + HS.podById(podId).name, def.title, def.sub ? `<div class="sub">${def.sub}</div>` : '')}
      ${def.full ? def.body() : `<div class="pane"><div class="stage">${def.body}</div>${def.caps ? `<aside>${HS.caps(def.caps)}</aside>` : ''}</div>`}`,
    init: def.init,
    step: (el, st, c) => { HS.capStep(el, st); if (def.step) def.step(el, st, c); },
  });

  const podSlides = {
    worktrees: (() => {
      const HULL = 'M70 500 C 70 340, 190 250, 340 250 H 1260 C 1410 250, 1530 340, 1530 500 C 1530 660, 1410 750, 1260 750 H 340 C 190 750, 70 660, 70 500 Z';
      const XS = [60, 430, 800, 1170];
      const POS = [[150, 270], [452, 340], [822, 340], [1192, 290]];
      const SECS = [
        ['Hull breach', 'Hull sealed', 'working tree', 'Two agents, one file. Last write wins.', 'Separate directories.<br><code>.worktreeinclude</code> for <code>.env</code>'],
        ['Nav failure', 'Nav restored', 'git state', 'Checkout moves. Commit steals. Stash vanishes.', 'One shared <code>.git</code>.'],
        ['Reactor unstable', 'Reactor stable', 'dev server', 'It rebuilds &amp; reloads all the time.', 'Own port.<br>Hardlinked <code>node_modules</code> (pnpm, bun).'],
        ['Life support', 'Life support', 'test run', 'Red, from the other agent\'s in-progress work.', 'Own code only.<br>Own testcontainer.'],
      ];
      const hull = () => `<svg class="wt-hull" viewBox="0 0 1600 900">
        <defs><clipPath id="wt-clip"><path d="${HULL}"/></clipPath></defs>
        <g clip-path="url(#wt-clip)">${XS.map((x, i) => `<rect class="wt-zone bad" data-s="${i + 1}" x="${x}" y="240" width="370" height="520"/><rect class="wt-zone ok z${i + 1}" x="${x}" y="240" width="370" height="520"/>`).join('')}</g>
        <path class="wt-shell" d="${HULL}"/>
        ${[430, 800, 1170].map((x, i) => `<line class="wt-wall w${i + 1}" x1="${x}" y1="256" x2="${x}" y2="744"/>`).join('')}
      </svg>`;
      const sec = (s, i) => `<div class="wt-sec z${i + 1}" data-s="${i + 1}" style="left:${POS[i][0]}px;width:${POS[i][1]}px">
        <div class="t"><i></i><span><b class="r">${s[0]}</b><b class="g">${s[1]}</b><small>${s[2]}</small></span></div><div class="d"><span class="r">${s[3]}</span><span class="g">${s[4]}</span></div></div>`;
      const BADGES = [
        ['auth', '#ff9d5c', 'M600 420 C 420 470, 220 520, 0 580', 'left:70px;top:540px'],
        ['pdf-export', '#2dd4bf', 'M965 420 C 1150 470, 1350 520, 1600 560', 'right:30px;top:500px'],
        ['user-prefs', '#a78bfa', 'M720 450 C 650 560, 560 700, 480 900', 'left:330px;top:770px'],
        ['search-filters', '#f472b6', 'M840 450 C 900 560, 980 700, 1060 900', 'left:1000px;top:770px'],
        ['dark-mode', '#facc15', 'M600 385 C 430 385, 230 400, 0 440', 'left:70px;top:372px'],
        ['fix-i18n', '#60a5fa', 'M965 385 C 1130 385, 1340 395, 1600 420', 'right:30px;top:330px'],
      ];
      return [{
        slug: 'damage', title: '<span class="wt-ta">Damage report</span><span class="wt-tb">Sealing the bulkheads</span>', full: true, steps: 12, cls: 'wt wt-damage',
        body: () => `<div class="wt-bars">${HS.marquee('⚠ ALL AGENTS · ONE COMPARTMENT ·')}</div><div class="wt-bars done">${HS.marquee('✓ ALL COMPARTMENTS SEALED · ALL AGENTS GREEN ·')}</div>
          ${hull()}
          ${SECS.map(sec).join('')}
          <div class="wt-cmd">$ git worktree add ../app-auth -b auth</div>`,
      }, {
        slug: 'core', title: 'One .git, a worktree per agent', full: true, steps: 1, cls: 'wt wt-core',
        body: () => `<div class="wt-plate" style="--plate-img: url('${import.meta.env.BASE_URL}plates/pod-worktrees.webp')"></div>
          <svg class="wt-cables" viewBox="0 0 1600 900">
            <ellipse class="wt-ring" cx="782" cy="355" rx="215" ry="62"/>
            ${BADGES.map(b => `<path class="wt-glow" d="${b[2]}"/>`).join('')}
          </svg>
          ${BADGES.map(([n, c, , pos]) => `<div class="wt-badge" style="${pos}"><b style="background:${c}"></b>../app-${n}</div>`).join('')}`,
      }];
    })(),
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
    mergequeue: (() => {
      const crawler = (x, y, s = 1, cls = '', attr = '') => `<g ${attr}><g class="mq-crawler ${cls}" transform="translate(${x} ${y}) scale(${s})">
        <rect class="tr" x="0" y="50" width="104" height="18" rx="9"/>
        <path class="bd" d="M6 52 L12 16 L70 6 L98 22 L106 52 Z"/>
        <path class="wn" d="M74 13 L94 24 L91 32 L72 28 Z"/>
        <rect class="st" x="10" y="38" width="92" height="6"/>
        <circle class="lp" cx="103" cy="46" r="4"/>
      </g></g>`;
      const tag = (x, y, t, cls = '', attr = '') => `<text class="mq-tag ${cls}" ${attr} x="${x}" y="${y}" text-anchor="middle">${t}</text>`;
      const CONVOY = ['fix/totals', 'chore/deps', 'feat/wishlist', 'fix/i18n', 'feat/gift-cards'];
      const STATIONS = ['rebase onto main', 'build', 'test', 'merge --ff-only'];
      const cap = (s, t, last) => `<div class="mq-cap" data-s="${s}" ${last ? '' : `data-o="${s + 1}"`}>${t}</div>`;
      return [{
        slug: 'landing', title: 'Ten agents, one main', full: true, steps: 3, cls: 'mq mq-landing',
        body: () => {
          const AG = ['auth', 'pdf-export', 'user-prefs', 'search', 'dark-mode', 'fix-i18n', 'checkout', 'discount', 'wishlist', 'tax'];
          const pts = AG.map((n, i) => { const a = (-62 + i * 13.8) * Math.PI / 180; return [300 + Math.cos(a) * 220, 520 + Math.sin(a) * 290, n]; });
          const port = cls => `<rect class="mq-port ${cls}" x="1180" y="400" width="140" height="160" rx="16"/><line class="mq-rail ${cls}" x1="1360" y1="480" x2="1560" y2="480"/>`;
          return `<svg class="mq-svg" viewBox="0 0 1600 900">
            <g data-o="1">${port('ok')}</g><g data-s="1" data-o="2">${port('bad')}</g><g data-s="2">${port('ok')}</g>
            <text class="mq-locktag" x="1250" y="385" text-anchor="middle">port</text>
            <text class="mq-railtag" x="1460" y="520" text-anchor="middle">main</text>
            <g data-o="2">${pts.map(([x, y, n]) => `${crawler(x - 42, y - 30, .8, 'ok')}<text class="mq-tag" x="${x - 55}" y="${y + 6}" text-anchor="end">${n}</text>`).join('')}</g>
            <g data-s="1" data-o="2">${pts.map(([x, y]) => `<path class="mq-path" d="M${x + 45} ${y} C ${x + 400} ${y}, 1000 480, 1175 480"/>`).join('')}
              ${[0, 1, 2, 3].map(i => `<g transform="rotate(${i % 2 ? 12 : -14} ${1090 - i * 24} ${450 + (i % 2 ? 40 : -10)})">${crawler(1048 - i * 24, 420 + (i % 2 ? 40 : -10), .8, 'bad')}</g>`).join('')}</g>
            <g data-s="2"><path class="mq-beam" d="M60 420 H1175 V540 H60 Z"/>${AG.map((n, i) => `${crawler(1068 - i * 108, 450, .8, 'ok')}<text class="mq-tag ${i ? '' : 'in'}" x="${1110 - i * 108}" y="${i % 2 ? 568 : 404}" text-anchor="middle">${n}</text>`).join('')}</g>
          </svg>`;
        },
      }, {
        slug: 'lander', title: 'One lane to main', full: true, steps: 7, cls: 'mq mq-lander',
        body: () => `<svg class="mq-svg" viewBox="0 0 1600 900">
            <path class="mq-tunnel" d="M30 700 V400 Q30 300 130 300 H700 V700 Z"/>
            ${[120, 240, 360, 480, 600].map(x => `<line class="mq-lamp" x1="${x}" y1="312" x2="${x + 60}" y2="312"/>`).join('')}
            <line class="mq-floor" x1="30" y1="660" x2="700" y2="660"/>
            <g data-s="1">${CONVOY.map((n, i) => `<g ${i ? '' : 'data-o="6"'}>${crawler(560 - i * 130, 560, 1, i === 0 ? 'next' : '')}${tag(613 - i * 130, i % 2 ? 700 : 540, n)}</g>`).join('')}</g>
            <rect class="mq-lock" x="720" y="300" width="400" height="400" rx="18"/>
            <text class="mq-locktag" x="920" y="282" text-anchor="middle">the airlock</text>
            ${crawler(860, 330, 1.15, 'in', 'data-o="6"')}${tag(920, 435, 'feat/checkout', 'in', 'data-o="6"')}
            ${crawler(860, 330, 1.15, 'bad', 'data-s="6"')}${tag(920, 435, 'fix/totals', 'red', 'data-s="6"')}
            ${STATIONS.map((t, i) => `<g class="mq-station" data-z="${i + 2}"><circle cx="770" cy="${490 + i * 52}" r="10"/><text x="796" y="${498 + i * 52}">${t}</text></g>`).join('')}
            <g class="mq-x" data-s="6"><circle cx="770" cy="594" r="10"/><text x="1000" y="602">✗ red</text></g>
            <path class="mq-bounce" data-s="6" d="M920 700 C 920 760, 820 780, 640 780"/>
            <text class="mq-tag red" data-s="6" x="625" y="787" text-anchor="end">back to its agent</text>
            <path class="mq-arrow" d="M1130 500 H1210"/>
            <line class="mq-rail ok" x1="1330" y1="760" x2="1330" y2="300"/>
            <text class="mq-railtag" x="1330" y="800" text-anchor="middle">main · always green</text>
            ${['chore/lockfile', 'fix/cart', 'feat/auth', 'fix/i18n'].map((t, i) => `<g class="mq-commit ok"><circle cx="1330" cy="${720 - i * 70}" r="13"/><text x="1360" y="${727 - i * 70}">${t}</text></g>`).join('')}
            <g class="mq-commit ok new" data-s="5"><circle cx="1330" cy="440" r="13"/><text x="1360" y="447">feat/checkout</text></g>
          </svg>
          ${cap(1, 'Every branch joins one queue.')}
          ${cap(2, 'Rebase onto the <b>latest</b> main.')}
          ${cap(3, 'Build that exact commit.')}
          ${cap(4, 'Test the commit that <b>will</b> land.')}
          ${cap(5, 'Fast-forward. Nobody else lands in between.')}
          ${cap(6, 'Red? Bounce it back to its agent. The queue keeps moving.', true)}`,
      }, {
        slug: 'jam', title: 'The next bottleneck', full: true, steps: 4, cls: 'mq mq-jam',
        body: () => `<svg class="mq-svg" viewBox="0 0 1600 900">
            <line class="mq-floor" x1="40" y1="390" x2="1400" y2="390"/>
            ${Array.from({ length: 14 }, (_, i) => crawler(1310 - i * 92, 330, 0.8)).join('')}
            <rect class="mq-lock" x="1420" y="290" width="150" height="120" rx="14"/>
            <text class="mq-locktag" x="1495" y="440" text-anchor="middle">airlock</text>
            <g data-s="1" data-o="3">
              <rect class="mq-batch" x="80" y="500" width="620" height="180" rx="16"/>
              ${['A', 'B', 'C', 'D'].map((t, i) => crawler(110 + i * 145, 560, 0.9) + tag(160 + i * 145, 545, t)).join('')}
              <text class="mq-tag big" x="390" y="730" text-anchor="middle">main + A + B + C + D · one run</text>
            </g>
            <g data-s="2" data-o="3" class="mq-bisect">
              <rect class="node bad" x="1000" y="490" width="240" height="56" rx="10"/><text x="1120" y="527" text-anchor="middle">✗ A B C D</text>
              <path d="M1080 546 L 960 600 M1160 546 L 1280 600"/>
              <rect class="node ok" x="860" y="600" width="200" height="56" rx="10"/><text x="960" y="637" text-anchor="middle">✓ A B</text>
              <rect class="node bad" x="1180" y="600" width="200" height="56" rx="10"/><text x="1280" y="637" text-anchor="middle">✗ C D</text>
              <path d="M1240 656 L 1190 710 M1320 656 L 1370 710"/>
              <rect class="node bad" x="1120" y="710" width="140" height="56" rx="10"/><text x="1190" y="747" text-anchor="middle">✗ C</text>
              <rect class="node ok" x="1300" y="710" width="140" height="56" rx="10"/><text x="1370" y="747" text-anchor="middle">✓ D</text>
            </g>
          </svg>
          <div class="mq-big" data-o="1">20 agents × 10 min pipeline<small>the last one lands after 3h20</small></div>
          ${cap(1, 'Batch: test four at once. Green? All four land.')}
          ${cap(2, 'Red? Bisect the batch, bounce the culprit.')}
          <div class="mq-ft" data-s="3">
            <div class="drop">✗ run the full suite on every merge</div>
            <div class="cost">! main is red. A lot.</div>
            <div class="keep">✓ a dedicated fix-forward agent</div>
          </div>`,
      }];
    })(),
    trailers: [{
      slug: 'why', title: 'We all hate them', sub: 'Since our agent made its first commit',
      body: `<div class="term-block cmd"><div class="mono">$ git commit -m "feat: let the audience vote on pods" \\</div><div class="mono">    <span class="trailer-hl">--trailer "Co-Authored-By: Claude &lt;noreply@anthropic.com&gt;"</span></div></div>
        <div class="commit" data-s="1">
          <div class="mono"><span class="y">commit 3f9c2e1</span></div>
          <div class="mono">Author: you &lt;you@example.com&gt;</div>
          <div class="mono">&nbsp;</div>
          <div class="mono">&nbsp;&nbsp;&nbsp;&nbsp;feat: let the audience vote on pods</div>
          <div class="mono">&nbsp;</div>
          <div class="mono trailer">&nbsp;&nbsp;&nbsp;&nbsp;Co-Authored-By: Claude &lt;noreply@anthropic.com&gt;</div>
        </div>
        <div class="stamp" data-s="2">ALIEN MARK<br><span>alien +10</span></div>`,
      steps: 3,
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
      slug: 'chart', title: 'New questions per month', cls: 'deadslide',
      body: (() => {
        const rows = soCsv.trim().split('\n').slice(1).map(l => l.split(',')).map(([m, v]) => [m, +v])
          .filter(([m]) => m >= '2008-08' && m < new Date().toISOString().slice(0, 7));
        const n = rows.length, peak = rows.reduce((a, r) => (r[1] > a[1] ? r : a)), last = rows[n - 1], first = rows[0];
        const idx = m => rows.findIndex(r => r[0] === m);
        const X = i => 80 + (i / (n - 1)) * 890, Y = v => 470 - (v / 220000) * 420;
        const seg = (a, b) => rows.slice(a, b + 1).map((r, k) => `${k ? 'L' : 'M'}${X(a + k).toFixed(1)} ${Y(r[1]).toFixed(1)}`).join('');
        const pk = idx(peak[0]), gpt = idx('2022-11');
        const fmtM = m => new Date(m + '-01').toLocaleString('en', { month: 'short', year: 'numeric' });
        const k = v => (v >= 1000 ? Math.round(v / 1000) + 'k' : v);
        const drop = ((1 - last[1] / peak[1]) * 100).toFixed(1);
        return `<svg viewBox="0 0 1000 560" class="chart so-chart">
          <path class="axis" d="M70 470 H980 M70 470 V40"/>
          ${[50000, 100000, 150000, 200000].map(v => `<text class="mono dim" x="60" y="${Y(v) + 6}" text-anchor="end">${k(v)}</text><path class="grid" d="M70 ${Y(v)} H980"/>`).join('')}
          ${rows.map((r, i) => (r[0].endsWith('-01') && +r[0].slice(0, 4) % 2 === 0 ? `<text class="mono dim" x="${X(i)}" y="500" text-anchor="middle">${r[0].slice(0, 4)}</text>` : '')).join('')}
          <path class="so-line" d="${seg(0, pk + 9)}"/>
          <g data-s="0"><circle class="so-dot" cx="${X(pk)}" cy="${Y(peak[1])}" r="7"/><text class="mono" x="${X(pk)}" y="${Y(peak[1]) - 18}" text-anchor="middle">${k(peak[1])} · ${fmtM(peak[0])}</text></g>
          <g data-s="1"><path class="so-line" d="${seg(pk + 9, gpt)}"/></g>
          <g data-s="2"><path class="marker" d="M${X(gpt)} 60 V470"/><text class="mono" x="${X(gpt) - 8}" y="56" text-anchor="end">Nov 2022: ChatGPT</text>
            <path class="so-line bad" d="${seg(gpt, n - 1)}"/></g>
          <g data-s="3"><circle class="so-dot bad" cx="${X(n - 1)}" cy="${Y(last[1])}" r="7"/>
            <text class="lbl red huge" x="760" y="360" text-anchor="end">−${drop}%</text>
            <text class="mono" x="760" y="400" text-anchor="end">${fmtM(last[0])}: ${last[1].toLocaleString('en')} questions</text>
            <text class="mono dim" x="760" y="430" text-anchor="end">first month, ${fmtM(first[0])}: ${first[1].toLocaleString('en')}</text></g>
          <text class="mono dim" x="980" y="540" text-anchor="end">Stack Exchange Data Explorer · new questions per month · deleted posts excluded</text>
        </svg>`;
      })(),
      caps: ['2008–2014: the place every developer went.', 'Then a long, slow plateau.', 'Nov 2022: questions move <b>inside the agent</b>.', 'Fewer questions than in <b>its very first month</b>.'],
    }, {
      slug: 'irony', title: 'It absorbed all the knowledge of the crew', cls: 'deadslide so-absorb',
      body: (() => {
        const cx = 500, top = 280, rx = 250, ry = 50, h = 210;
        const body = `M${cx - rx} ${top} v${h} a${rx} ${ry} 0 0 0 ${rx * 2} 0 v-${h}`;
        const bits = Array.from({ length: 14 }, (_, i) => `<rect class="bit" x="${cx - 90 + (i * 37) % 180}" y="${top - 10}" width="12" height="12" rx="2" style="animation-delay:${(i * 0.17).toFixed(2)}s"/>`).join('');
        return `<svg viewBox="0 0 1000 560">
          <defs><clipPath id="so-db-clip"><path d="${body} a${rx} ${ry} 0 0 0 -${rx * 2} 0z"/></clipPath></defs>
          <g data-s="2" data-o="3"><path class="beam" d="M${cx - 40} 150 L${cx + 40} 150 L${cx + rx} ${top} L${cx - rx} ${top}Z"/><g class="bits">${bits}</g></g>
          <g data-o="3">
            <ellipse class="git" cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}"/><path class="git" d="${body}"/>
            <g clip-path="url(#so-db-clip)"><rect class="lvl" x="${cx - rx - 5}" y="${top - ry}" width="${rx * 2 + 10}" height="${h + ry * 2 + 5}"/></g>
            <ellipse class="git-top" cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}"/>
            <text class="lbl big" x="${cx}" y="${top + 110}" text-anchor="middle">training set</text>
            <text class="mono dim" x="${cx}" y="${top + 148}" text-anchor="middle">~24M questions · 15 years of answers</text>
          </g>
          <g data-s="3"><path class="ghost" d="${body}"/><ellipse class="ghost" cx="${cx}" cy="${top}" rx="${rx}" ry="${ry}"/>
            <text class="lbl big dim" x="${cx}" y="${top + 110}" text-anchor="middle">training set</text>
            <text class="mono red" x="${cx}" y="${top + 148}" text-anchor="middle">0 rows</text></g>
          <g data-s="1"><svg class="alien-host alien" x="${cx - 100}" y="0" width="200" height="200" viewBox="-100 -100 200 200">${A.alien().replace(/^<svg[^>]*>|<\/svg>$/g, '')}</svg></g>
        </svg>`;
      })(),
      caps: ['Fifteen years of crew knowledge: <b>~24M questions</b>, answered and voted.', 'Then the alien found it.', 'It absorbed <b>everything</b>.', 'Stack Overflow even <b>sold</b> it the meal.<small>2024: licensing deals with Google and OpenAI.</small>'],
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

  const SO_SITES = ['Super User', 'ServerFault', 'Ask Ubuntu', 'Math', 'English', 'Cooking', 'Bicycles', 'Arqade', 'Travel', 'Photo', 'Physics', 'Unix', 'CodeReview', 'Security', 'DBA', 'TeX', 'Android', 'Apple', 'WordPress', 'GIS', 'Movies', 'Music', 'Law', 'History', 'Chess', 'Gardening', 'Pets', 'Space'];
  const soEmpire = () => {
    let h = '', k = 0;
    const W = 80, H = 30, SX = 88, SY = 40;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) {
      if (c >= 2 && c <= 3 && r >= 3 && r <= 4) continue;
      const x = 4 + c * SX, y = 4 + r * SY, lbl = (r + c) % 3 && k < SO_SITES.length ? SO_SITES[k++] : '';
      h += `<rect class="tile" x="${x}" y="${y}" width="${W}" height="${H}" rx="5"/>${lbl ? `<text class="tl" x="${x + W / 2}" y="${y + 20}" text-anchor="middle">${lbl}</text>` : ''}`;
    }
    const cx = 4 + 2 * SX, cy = 4 + 3 * SY;
    h += `<rect class="core" x="${cx}" y="${cy}" width="${SX + W}" height="${SY + H}" rx="10"/><text class="cl" x="${cx + (SX + W) / 2}" y="${cy + (SY + H) / 2 + 7}" text-anchor="middle">Stack Overflow</text>`;
    h += `<text class="dead" x="265" y="360" text-anchor="middle">Experts Exchange · phpBB forums · mailing lists · Usenet</text>`;
    return `<svg viewBox="0 0 530 370" class="so-empire">${h}</svg>`;
  };
  const podFrame = {
    trailers: { woke: [] },
    worktrees: { woke: [] },
    stackoverflow: {
      froze: [{
        slug: 'empire', title: 'The empire', cls: 'beat',
        body: soEmpire(),
        caps: ['The Q&A site that won so hard every other dev forum died.<small>Then spread into 50+ sister sites.</small>'],
      }, {
        slug: 'gamification', title: 'Gamification done right', cls: 'beat',
        body: `<div class="so-rep">
          <div class="rep-top"><div class="rep-n"><small>reputation</small>10,297</div><div class="rep-tag"><small>top tag</small><code>c#</code></div></div>
          <div class="rep-badges"><span class="g">7</span><span class="s">46</span><span class="b">74</span></div>
          <div class="rep-best"><b>411</b><span>ESLint: "window" is not defined</span><small>Sep 2015</small></div>
          <div class="rep-impact"><span><b>~855k</b>people reached</span><span><b>168</b>answers</span></div>
        </div>`,
        caps: ['Reputation was coveted, a gold badge a medal of honour, an accepted answer made your day.'],
      }, {
        slug: 'reflex', title: 'The reflex', cls: 'beat',
        body: `<div class="so-search"><span>TypeError: Cannot read properties of undefined (reading 'map')</span> <b>stackoverflow</b><i></i></div>
          <div class="so-res top"><small>stackoverflow.com › questions</small><b>Cannot read properties of undefined (reading 'map') in React</b><em>✓ accepted</em></div>
          <div class="so-res"><small>stackoverflow.com › questions</small><b>Cannot read property 'map' of undefined</b><em>✓ accepted</em></div>`,
        caps: ['Paste the error. Add <b class="amber">stackoverflow</b>. Hit enter.<small>For fifteen years, that was debugging.</small>'],
      }],
    },
  };

  const BASE = import.meta.env.BASE_URL;
  const bg = p => `<div class="pod-bg" style="--plate-img: url('${BASE}plates/pod-${p.id}.webp')"></div>`;
  const todo = t => t || '<span class="todo">TODO</span>';
  const frame = (p, slug, html) => ({
    id: `${p.id}-${slug}`, seq: 'pod:' + p.id,
    cls: `frame f-${slug} t-${p.deck} ${p.dead ? 'is-deadpod' : 'is-alivepod'}`,
    html: () => html(p),
  });
  const statement = (p, title, text, art) => `${head(deckOf(p) + ' · ' + p.name, title)}
    <div class="stmt"><p>${todo(text)}</p>${art ? `<div class="stmt-art">${art}</div>` : ''}</div>`;
  const FRAME = {
    thaw: p => `${bg(p)}<div class="thaw-card">
      <div class="kicker">${deckOf(p)}</div>
      <h1>${p.name}</h1>
      <div class="ids"><span>born<b>${p.born}</b></span>${p.dead ? `<span>died<b>${p.died}</b></span>` : `<span>frozen<b>${p.frozen}</b></span>`}<span>relevance${A.rel(p.power)}</span></div>
      <div class="fate">${p.dead ? 'No signs of life' : 'Revived'}</div>
    </div>`,
    froze: p => p.dead
      ? statement(p, 'What it was', p.was)
      : statement(p, 'Why it froze', p.frozenBecause),
    woke: p => p.dead
      ? statement(p, 'What killed it', p.diesBecause, A.cryo('dead', 'NO SIGNS'))
      : statement(p, 'What woke it', p.wokenBecause, A.cryo('awake', 'REVIVED')),
    log: p => {
      const score = p.dead ? `alien +${Math.abs(p.score.dead)}` : p.score.alive < 0 ? `alien +${-p.score.alive}` : `crew +${p.score.alive}`;
      const red = p.dead || p.score.alive < 0;
      if (p.logTitle) return `${bg(p)}${head(deckOf(p) + ' · ' + p.name, p.logTitle)}<div class="log titled">
        <div class="log-h">Crew log · ${p.name}</div>
        <div class="log-line">&gt; ${todo(p.takeaway)}</div>
        <div class="log-stamp ${red ? 'red' : ''}">${score}</div>
      </div>`;
      return `${bg(p)}<div class="log">
      <div class="log-h">Crew log · ${p.name}</div>
      <div class="log-line">&gt; ${todo(p.takeaway)}</div>
      <div class="log-score ${red ? 'red' : ''}">${score}</div>
    </div>`;
    },
  };
  HS.FRAME_BEFORE = ['thaw', 'froze'];
  HS.FRAME_AFTER = ['woke', 'log'];

  for (const p of HS.pods) {
    const put = k => {
      if (podFrame[p.id]?.[k]) podFrame[p.id][k].forEach(d => add(custom(p.id, d)));
      else add(frame(p, k, FRAME[k]));
    };
    HS.FRAME_BEFORE.forEach(put);
    for (const d of podSlides[p.id] || []) add(custom(p.id, d));
    HS.FRAME_AFTER.filter(k => !(p.dead && k === 'woke')).forEach(put);
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
