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
          <div class="deck-row">${row('cargo')}</div>
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
    mergequeue: (() => {
      const crawler = (x, y, s = 1, cls = '', attr = '') => `<g ${attr}><g class="mq-crawler ${cls}" transform="translate(${x} ${y}) scale(${s})">
        <rect class="tr" x="0" y="50" width="104" height="18" rx="9"/>
        <path class="bd" d="M6 52 L12 16 L70 6 L98 22 L106 52 Z"/>
        <path class="wn" d="M74 13 L94 24 L91 32 L72 28 Z"/>
        <rect class="st" x="10" y="38" width="92" height="6"/>
        <circle class="lp" cx="103" cy="46" r="4"/>
      </g></g>`;
      const STATIONS = ['rebase onto main', 'build', 'test', 'merge --ff-only'];
      const LAND_PTS = ['auth', 'pdf-export', 'user-prefs', 'search', 'dark-mode', 'fix-i18n', 'checkout', 'discount', 'wishlist', 'tax'].map((n, i) => { const a = (-62 + i * 13.8) * Math.PI / 180; return [300 + Math.cos(a) * 220, 520 + Math.sin(a) * 290, n]; });
      const WEDGE = [[1, 1165, 455, -8], [4, 1165, 505, 9], [6, 1105, 440, -16], [8, 1105, 520, 15]];
      const wedgeTf = (x, y, r, sx, sy) => `translate(${x}px, ${y}px) rotate(${r}deg) scale(${sx}, ${sy})`;
      return [{
        slug: 'landing', title: 'Ten agents, one main', full: true, steps: 3, cls: 'mq mq-landing',
        body: () => {
          const port = cls => `<rect class="mq-port ${cls}" x="1180" y="400" width="140" height="160" rx="16"/><line class="mq-rail ${cls}" x1="1360" y1="480" x2="1560" y2="480"/>`;
          return `<svg class="mq-svg" viewBox="0 0 1600 900"><g class="mq-world">
            <g class="mq-portg">${port('ok')}</g>
            <text class="mq-locktag" x="1250" y="385" text-anchor="middle">port</text>
            <text class="mq-railtag" x="1460" y="520" text-anchor="middle">main</text>
            <g data-o="2">${LAND_PTS.map(([x, y, n], i) => `<g ${WEDGE.some(w => w[0] === i) ? 'data-o="1"' : ''}>${crawler(x - 42, y - 30, .8, 'ok')}</g><text class="mq-tag" x="${x - 55}" y="${y + 6}" text-anchor="end">${n}</text>`).join('')}</g>
            <g data-s="1" data-o="2">${LAND_PTS.map(([x, y]) => `<path class="mq-path" d="M${x + 45} ${y} C ${x + 400} ${y}, 1000 480, 1175 480"/>`).join('')}
              <path class="mq-crack" d="M1180 430 l30 18 l-12 20 l34 14 M1320 520 l-26 -10 l10 -22 l-30 -8"/>
              <ellipse class="mq-beacon" cx="1250" cy="396" rx="26" ry="10"/>
              <path class="mq-beacon-glow" d="M1250 396 L1450 330 L1450 460 Z"/>
              ${WEDGE.map(([, tx, ty, r], k) => `<g class="mq-wedge" data-k="${k}" style="transform: ${wedgeTf(tx + 4, ty, r, .66, .86)}">${crawler(-53, -37, 1, 'bad')}</g>`).join('')}
              <g class="mq-fx"></g>
            </g>
            <g data-s="2"><path class="mq-beam" d="M60 420 H1175 V540 H60 Z"/>${LAND_PTS.map(([, , n], i) => `${crawler(1068 - i * 108, 450, .8, 'ok')}<text class="mq-tag ${i ? '' : 'in'}" x="${1110 - i * 108}" y="${i % 2 ? 568 : 404}" text-anchor="middle">${n}</text>`).join('')}</g>
          </g></svg>`;
        },
        step: (el, st, c) => {
          clearInterval(el._sparks);
          if (st !== 1) el.classList.remove('mq-pending');
          if (st !== 1 || !c.active || el._st === 1) { el._st = st; return; }
          el._st = st;
          const fx = el.querySelector('.mq-fx'), world = el.querySelector('.mq-world');
          fx.innerHTML = '';
          const spark = (x, y, n, len) => {
            for (let i = 0; i < n; i++) {
              const a = Math.random() * Math.PI * 2, l = len * (.5 + Math.random());
              const s = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              Object.entries({ x1: x, y1: y, x2: x + Math.cos(a) * 14, y2: y + Math.sin(a) * 14, class: 'mq-spark' }).forEach(([k, v]) => s.setAttribute(k, v));
              fx.appendChild(s);
              s.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * l}px, ${Math.sin(a) * l}px)`, opacity: 0 }], { duration: 450 + Math.random() * 300, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => s.remove();
            }
          };
          const shake = (amp, dur) => world.animate(Array.from({ length: 9 }, (_, i) => ({ transform: `translate(${i === 8 ? 0 : (Math.random() - .5) * amp * 2 * (1 - i / 8)}px, ${i === 8 ? 0 : (Math.random() - .5) * amp * 2 * (1 - i / 8)}px)` })), { duration: dur });
          const curve = (x, y, tx, ty) => Array.from({ length: 7 }, (_, k) => {
            const t = k / 6, u = 1 - t;
            return [u ** 3 * x + 3 * u * u * t * (x + 400) + 3 * u * t * t * 1000 + t ** 3 * tx, u ** 3 * y + 3 * u * u * t * y + 3 * u * t * t * 480 + t ** 3 * ty];
          });
          const LAST = 3 * 180 + 1000;
          el.classList.add('mq-pending'); setTimeout(() => el.classList.remove('mq-pending'), 700);
          el.querySelector('.mq-crack').animate([{ strokeDasharray: '0 400' }, { strokeDasharray: '0 400', offset: LAST / (LAST + 500) }, { strokeDasharray: '400 0' }], { duration: LAST + 500 });
          el.querySelectorAll('.mq-beacon, .mq-beacon-glow').forEach(b => b.animate([{ visibility: 'hidden' }, { visibility: 'hidden', offset: .99 }, { visibility: 'visible' }], { duration: LAST }));
          el.querySelectorAll('.mq-wedge').forEach(g => {
            const k = +g.dataset.k, [i, tx, ty, r] = WEDGE[k], [x, y] = LAND_PTS[i];
            const fly = curve(x, y, tx, ty).map(([px, py], j) => ({ transform: wedgeTf(px, py, 0, .8, .8), offset: j / 6 * .7, easing: j === 0 ? 'cubic-bezier(.5,0,.9,.6)' : 'linear' }));
            const delay = k * 180;
            g.animate([...fly.slice(0, 1), ...fly.slice(1).map(f => ({ ...f, easing: 'linear' })), { transform: wedgeTf(tx + 6, ty, r, .62, .9), offset: .85 }, { transform: wedgeTf(tx + 4, ty, r, .66, .86), offset: 1 }], { duration: 1000, delay, easing: 'linear', fill: 'backwards' });
            setTimeout(() => { if (el._st !== 1) return; spark(tx + 40, ty, 8, 50); shake(8, 260); }, delay + 700);
          });
          setTimeout(() => {
            if (el._st !== 1) return;
            el._sparks = setInterval(() => { if (!el.isConnected || el._st !== 1) return clearInterval(el._sparks); spark(1185 + Math.random() * 30, 440 + Math.random() * 80, 4, 40); }, 350);
          }, LAST);
        },
      }, {
        slug: 'airlock', title: 'Through the airlock', full: true, steps: 1, cls: 'mq mq-air',
        body: () => {
          const L = { x: 600, y: 300, w: 440, h: 260 };
          return `<svg class="mq-svg" viewBox="0 0 1600 900">
            <defs>
              <pattern id="mqHz" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="10" height="20" fill="#ffb547"/><rect x="10" width="10" height="20" fill="#1a1f26"/></pattern>
              <linearGradient id="mqScan" x1="0" x2="1"><stop offset="0" stop-color="#ffb547" stop-opacity="0"/><stop offset=".5" stop-color="#ffb547" stop-opacity=".5"/><stop offset="1" stop-color="#ffb547" stop-opacity="0"/></linearGradient>
              <clipPath id="mqLockClip"><rect x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="16"/></clipPath>
            </defs>
            <path class="mq-tunnel" d="M-10 560 V360 Q-10 300 60 300 H${L.x - 10} V560 Z"/>
            ${[60, 200, 340, 480].map(x => `<line class="mq-lamp" x1="${x}" y1="312" x2="${x + 70}" y2="312"/>`).join('')}
            <line class="mq-floor" x1="0" y1="535" x2="1290" y2="535"/>
            <rect class="mq-al-lock" x="${L.x}" y="${L.y}" width="${L.w}" height="${L.h}" rx="16"/>
            <text class="mq-locktag" x="${L.x + L.w / 2}" y="${L.y - 18}" text-anchor="middle">the airlock</text>
            <g class="mq-al-ships"></g>
            <g clip-path="url(#mqLockClip)"><rect class="mq-al-scan" x="${L.x}" y="${L.y}" width="110" height="${L.h}"/></g>
            <rect class="mq-al-door l" x="${L.x - 8}" y="${L.y + 8}" width="16" height="${L.h - 16}"/>
            <rect class="mq-al-door r" x="${L.x + L.w - 8}" y="${L.y + 8}" width="16" height="${L.h - 16}"/>
            <rect fill="url(#mqHz)" x="${L.x}" y="${L.y + L.h}" width="${L.w}" height="10"/>
            <text class="mq-al-status" x="${L.x + L.w / 2}" y="${L.y + L.h + 70}" text-anchor="middle"></text>
            ${STATIONS.map((t, i) => `<g class="mq-al-step"><circle cx="${L.x + 40}" cy="${L.y + L.h + 120 + i * 50}" r="11"/><circle class="spin" cx="${L.x + 40}" cy="${L.y + L.h + 120 + i * 50}" r="17"/><text x="${L.x + 72}" y="${L.y + L.h + 128 + i * 50}">${t}</text></g>`).join('')}
            <line class="mq-rail ok" x1="1330" y1="820" x2="1330" y2="260"/>
            <text class="mq-railtag" x="1330" y="860" text-anchor="middle">main</text>
            <g class="mq-al-commits"></g>
          </svg>`;
        },
        init: el => {
          const NAMES = ['auth', 'pdf-export', 'user-prefs', 'search', 'dark-mode', 'fix-i18n', 'checkout', 'discount', 'wishlist', 'tax'];
          const VERB = ['Rebasing', 'Building', 'Testing', 'Merging'];
          const S = 3, PARK = { x: 661, y: 319 }, OUT = { x: 1290, y: 280, s: .12 };
          const slot = i => ({ x: 250 - i * 360, y: 319 });
          const q = sel => el.querySelector(sel);
          const ships = q('.mq-al-ships'), commits = q('.mq-al-commits'), lock = q('.mq-al-lock'), scan = q('.mq-al-scan'), status = q('.mq-al-status');
          const dl = q('.mq-al-door.l'), dr = q('.mq-al-door.r'), steps = [...el.querySelectorAll('.mq-al-step')];
          const token = (HS.mqAirlock = (HS.mqAirlock || 0) + 1);
          const alive = () => token === HS.mqAirlock && el.isConnected;
          const sleep = ms => new Promise(r => setTimeout(r, ms));
          const put = (g, p, t = 1.2) => { g.style.setProperty('--t', t + 's'); g.style.transform = `translate(${p.x}px, ${p.y}px) scale(${p.s || 1})`; };
          const ship = n => `<g class="mq-al-sh"><g transform="scale(${S})">
            <rect class="tr" x="0" y="50" width="104" height="18" rx="9"/><path class="bd" d="M6 52 L12 16 L70 6 L98 22 L106 52 Z"/>
            <path class="wn" d="M74 13 L94 24 L91 32 L72 28 Z"/><rect class="st" x="10" y="38" width="92" height="6"/><circle class="lp" cx="103" cy="46" r="4"/></g>
            <text x="${53 * S}" y="12" text-anchor="middle">${n}</text></g>`;
          let main;
          const drawCommits = () => { commits.innerHTML = main.slice(0, 8).map((c, i) => `<g class="mq-commit ok ${i === 0 && c.fresh ? 'new' : ''}"><circle cx="1330" cy="${300 + i * 70}" r="13"/><text x="1360" y="${307 + i * 70}">${c.name}</text></g>`).join(''); };
          const idle = () => { steps.forEach(s => s.setAttribute('class', 'mq-al-step')); status.textContent = ''; status.setAttribute('class', 'mq-al-status'); lock.setAttribute('class', 'mq-al-lock'); };
          const run = async () => {
            ships.innerHTML = '';
            const queue = NAMES.map(n => { ships.insertAdjacentHTML('beforeend', ship(n)); return ships.lastElementChild; });
            queue.forEach((g, i) => { g.style.transition = 'none'; put(g, slot(i)); });
            ships.getBoundingClientRect();
            queue.forEach(g => { g.style.transition = ''; });
            main = ['chore/lockfile', 'fix/cart', 'feat/auth-v1'].map(name => ({ name }));
            drawCommits(); idle(); dl.classList.add('open'); dr.classList.remove('open');
            await sleep(900);
            while (alive() && queue.length) {
              const s = queue.shift();
              dl.classList.add('open'); s.classList.add('in');
              put(s, PARK, 1.3); queue.forEach((g, i) => put(g, slot(i), 1.3));
              await sleep(1400); if (!alive()) return;
              dl.classList.remove('open'); lock.setAttribute('class', 'mq-al-lock busy'); scan.classList.add('on');
              await sleep(500); if (!alive()) return;
              for (let i = 0; i < steps.length; i++) {
                steps[i].setAttribute('class', 'mq-al-step now'); status.textContent = VERB[i] + '…';
                await sleep(i === 3 ? 800 : 1150); if (!alive()) return;
                steps[i].setAttribute('class', 'mq-al-step done');
              }
              scan.classList.remove('on'); lock.setAttribute('class', 'mq-al-lock done');
              status.textContent = '✓ Green'; status.setAttribute('class', 'mq-al-status ok');
              s.classList.remove('in'); s.classList.add('ok');
              await sleep(500); if (!alive()) return;
              dr.classList.add('open');
              await sleep(500); if (!alive()) return;
              put(s, OUT, 1.1);
              await sleep(1000); if (!alive()) return;
              s.style.opacity = 0; dr.classList.remove('open');
              main.unshift({ name: s.querySelector('text').textContent, fresh: true });
              drawCommits(); idle();
              await sleep(600); if (!alive()) return;
              s.remove();
            }
            if (alive()) { await sleep(1500); if (alive()) run(); }
          };
          run();
        },
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
    mutation: (() => {
      const SRC = [
        ['export function calcTotal(items, code) {'],
        ['  let sum = 0'],
        ['  for (const i of items) sum += i.price * i.qty', '+= → -=', true],
        ['  if (sum >= 100) sum *= 0.9', '>= → >'],
        ['  if (code === "CREW") sum -= 5', '=== → !=='],
        ['  const vat = sum * 0.21', '0.21 → 0', true],
        ['  return round(sum + vat, 2)', 'round → id'],
        ['}'],
        [''],
        ['function round(n, d) {'],
        ['  return Math.round(n * 10 ** d) / 10 ** d', '* → /'],
        ['}'],
      ];
      const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const LH = 40, SWEEP = 2600;
      const SURV = SRC.map((l, i) => [l, i]).filter(([l]) => l[1] && !l[2]);
      const spec = `<svg viewBox="-20 -20 40 40"><g class="lg">${[[-8, -4, -17, -11], [-9, 2, -18, 3], [-7, 7, -14, 15], [8, -4, 17, -11], [9, 2, 18, 3], [7, 7, 14, 15]].map(([a, b, c, d]) => `<line x1="${a}" y1="${b}" x2="${c}" y2="${d}"/>`).join('')}</g><ellipse class="bd" rx="10" ry="12"/><circle class="ey" cx="-3.5" cy="-4" r="2"/><circle class="ey" cx="3.5" cy="-4" r="2"/></svg>`;
      const sleep = ms => new Promise(r => setTimeout(r, ms));
      const render = async (el, st, live) => {
        const tok = el._tok = (el._tok || 0) + 1, ok = () => el._tok === tok && el.isConnected;
        const q = s => el.querySelector(s);
        const specs = [...el.querySelectorAll('.mut-spec')], scan = q('.mut-scan'), surv = q('.mut-surv pre'), sn = q('.mut-sn');
        const gauge = q('.mut-gauge'), ovR = q('.mut-ov.red'), ovG = q('.mut-ov.green');
        const set = (s, cls) => { s.className = 'mut-spec ' + cls; s.closest('.mut-line').classList.toggle('hit', cls === 'alive'); };
        const score = p => { gauge.style.setProperty('--w', p + '%'); gauge.querySelector('b').textContent = p == null ? '–' : p + '%'; gauge.classList.toggle('ok', p === 100); };
        const list = () => { surv.innerHTML = SURV.map(([l, i]) => `<span class="red">cart.ts:${i + 1}</span>  ${esc(l[1])}`).join('\n'); sn.textContent = SURV.length + ' mutants'; };
        const clear = () => { surv.innerHTML = '<span class="green">none</span>'; sn.textContent = ''; };
        const flash = async ov => { ov.classList.add('show'); await sleep(2600); if (ok()) ov.classList.remove('show'); };
        const sweep = async fn => {
          scan.animate([{ transform: 'translateY(-60px)', opacity: 1 }, { transform: `translateY(${SRC.length * LH}px)`, opacity: 1 }], { duration: SWEEP, easing: 'linear' });
          specs.forEach(s => { const i = +s.dataset.i; setTimeout(() => ok() && fn(s, SRC[i]), (i + 1) / SRC.length * SWEEP); });
          await sleep(SWEEP + 100);
        };
        ovR.classList.remove('show'); ovG.classList.remove('show');
        scan.getAnimations().forEach(a => a.cancel());
        specs.forEach(s => set(s, ''));
        surv.innerHTML = ''; sn.textContent = ''; score(null);
        const after1 = () => { specs.forEach(s => set(s, SRC[s.dataset.i][2] ? 'dead' : 'alive')); list(); score(33); };
        if (st === 0) return;
        if (st === 1) {
          if (!live) return after1();
          await sweep((s, l) => set(s, l[2] ? 'dead' : 'alive')); if (!ok()) return;
          list(); score(33); await sleep(500); if (ok()) flash(ovR);
          return;
        }
        after1();
        if (st === 2) { if (live) flash(ovG); return; }
        if (!live) { specs.forEach(s => set(s, 'dead')); clear(); return score(100); }
        await sweep((s, l) => { if (!l[2]) set(s, 'dead'); }); if (!ok()) return;
        clear(); score(100);
      };
      return [{
        slug: 'why', title: 'Who tests the tests?', full: true, steps: 4, cls: 'mut',
        body: () => `<div class="mut-stage">
          <div class="card mut-hull"><div class="card-h"><span>cart.ts</span><span>${SRC.filter(l => l[1]).length} mutants planted</span></div>
            <pre>${SRC.map((l, i) => `<div class="mut-line"><span class="ln">${i + 1}</span>${esc(l[0]) || ' '}${l[1] ? `<div class="mut-spec" data-i="${i}">${spec}</div>` : ''}</div>`).join('')}<div class="mut-scan"></div></pre></div>
          <div class="mut-side">
            <div class="card mut-gauge"><label>mutation score</label><div class="row"><div class="bar"><i></i></div><b>–</b></div></div>
            <div class="card mut-surv"><div class="card-h"><span>survivors</span><span class="red mut-sn"></span></div><pre></pre></div>
          </div>
          <div class="mut-ov red"><div class="mut-stamp">${A.alien()}<div>${SURV.length} mutants<br>survived</div></div></div>
          <div class="mut-ov green"><div class="mut-stamp">${A.crew()}<div>Implementing additional tests<small>to contain the mutants</small></div></div></div>
        </div>`,
        step: (el, st, c) => {
          const prev = el._st; el._st = st;
          render(el, st, c.active && prev !== undefined && st === prev + 1);
        },
      }];
    })(),
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
    }, {
      slug: 'loop', title: 'A gate on every edit',
      body: `<svg viewBox="0 0 1000 560">
        <rect class="box" x="40" y="200" width="200" height="110" rx="12"/><text class="lbl" x="140" y="248" text-anchor="middle">agent</text><text class="mono dim" x="140" y="282" text-anchor="middle">Edit vote.ts</text>
        <path class="arrow" d="M240 255 H380"/>
        <g data-s="1"><rect class="gate" x="380" y="170" width="250" height="170" rx="12"/><text class="lbl" x="505" y="212" text-anchor="middle">PostToolUse</text>
          ${['eslint --fix', 'tsc --noEmit', 'LSP diagnostics'].map((t, i) => `<text class="mono dim" x="505" y="${250 + i * 28}" text-anchor="middle">${t}</text>`).join('')}</g>
        <g data-s="2"><path class="arrow bad" d="M505 340 C 505 450, 140 450, 140 314"/><rect class="term" x="300" y="440" width="560" height="80" rx="10"/>
          <text class="mono red" x="320" y="474">vote.ts:12 'total' is possibly undefined</text><text class="mono dim" x="320" y="504">fed straight back into the agent's context</text></g>
        <g data-s="3"><path class="arrow" d="M630 255 H720"/><rect class="gate" x="720" y="170" width="250" height="170" rx="12"/><text class="lbl" x="845" y="212" text-anchor="middle">Stop</text>
          <text class="mono dim" x="845" y="250" text-anchor="middle">npm test</text><text class="mono red" x="845" y="290" text-anchor="middle">✗ not done yet</text></g>
      </svg>`,
      caps: ['Git hooks gate a commit. Agent hooks gate <b>every edit</b>.', 'After each edit: lint, types, and the language server the IDE used to keep to itself.', 'Errors go straight back to the agent. No human reading red squiggles.', 'A Stop hook: the agent can\'t say "done" until the tests pass.'],
    }],
    spec: [{
      slug: 'cascade', title: 'The waterfall, at agent speed',
      body: (() => {
        const ST = [['Requirements', 'requirements.md', '3 months', 'spec.md', '8 min'], ['Design', 'design.md', '2 months', 'plan.md', '4 min'], ['Implementation', '', '6 months', 'tasks.md', '2 min'], ['Verification', '', '3 months', 'implement', '25 min'], ['Maintenance', '', 'forever', 'review', '10 min']];
        const X = i => 30 + i * 190, Y = i => 40 + i * 92;
        return `<svg viewBox="0 0 1000 560">
          ${ST.map(([w, , wt, a, at], i) => `<rect class="box" x="${X(i)}" y="${Y(i)}" width="170" height="64" rx="10"/>
            ${i < 4 ? `<path class="arrow" d="M${X(i) + 170} ${Y(i) + 32} H${X(i) + 205} V${Y(i + 1) - 4}"/>` : ''}
            <g data-o="2"><text class="lbl" x="${X(i) + 85}" y="${Y(i) + 40}" text-anchor="middle" style="font-size:20px">${w}</text><text class="mono dim" x="${X(i) + 85}" y="${Y(i) + 88}" text-anchor="middle">${wt}</text></g>
            <g data-s="2"><text class="mono green" x="${X(i) + 85}" y="${Y(i) + 40}" text-anchor="middle">${a}</text><text class="mono dim" x="${X(i) + 85}" y="${Y(i) + 88}" text-anchor="middle">${at}</text></g>`).join('')}
          <g data-s="1" data-o="2"><text class="lbl red" x="980" y="80" text-anchor="end">2001 · Agile Manifesto</text><text class="mono dim" x="980" y="112" text-anchor="end">working software over</text><text class="mono dim" x="980" y="138" text-anchor="end">comprehensive documentation</text></g>
          <g data-s="2"><text class="lbl green" x="980" y="80" text-anchor="end">2025 · Spec Kit · Kiro · BMAD</text><text class="mono dim" x="980" y="112" text-anchor="end">the agent does exactly</text><text class="mono dim" x="980" y="138" text-anchor="end">what you wrote down</text></g>
          <g data-s="3"><text class="lbl big" x="30" y="530">Total: 14 months → 49 minutes</text></g>
        </svg>`;
      })(),
      caps: ['1970: Royce draws the waterfall.<small>Every phase signed off before the next one starts.</small>', '2001: we killed it.<small>Too slow. The requirements changed before the code shipped.</small>', 'Same cascade. Same documents. Different reader: <b>the agent</b>.', 'Big Design Up Front is back.<small>It just doesn\'t take a year anymore.</small>'],
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
    codereview: [{
      slug: 'lgtm', title: 'Review requested', cls: 'deadslide',
      body: `<div class="two">
        <div class="card"><div class="card-h">review queue <small>(10 agents)</small></div><ul class="check">${[['#409', '+812 −97', 0], ['#410', '+1,904 −340', 0], ['#411', '+455 −1,022', 1], ['#412', '+3,412 −1,208', 1], ['#413', '+2,766 −51', 1], ['… 35 more', '', 1]].map(([n, d, s]) => `<li data-s="${s}"><code>${n}</code> <small>${d}</small></li>`).join('')}</ul></div>
        <div class="card" data-s="2"><div class="card-h">PR #412 · +3,412 −1,208</div><ul class="check ok"><li>looks good to me</li></ul><div class="timer">⏱ 0:11</div><div class="banner ok">APPROVED · LGTM</div></div>
      </div>`,
      caps: ['Ten agents. <b>Forty PRs a day.</b>', 'Every one of them hundreds of lines nobody typed.', 'Approved in eleven seconds.<small>The real review moved into the gates: tests, types, hooks.</small>'],
    }],
    ide: [{
      slug: 'features', title: 'Built for a human at a keyboard', cls: 'deadslide',
      body: `<div class="two">
        <div class="card"><div class="card-h">the IDE · 40 years of features</div><ul class="check">${['autocomplete', 'refactor › rename', 'go to definition', 'debugger', 'file tree', 'find usages'].map(t => `<li>${t}</li>`).join('')}</ul><div class="stamp" data-s="1">AGENT<br><span>does this now</span></div></div>
        <div class="card" data-s="2"><div class="card-h">what's left</div><ul class="check ok"><li>a terminal</li><li>git diff</li><li>LSP <small>→ feeds the agent</small></li></ul></div>
      </div>`,
      caps: ['Forty years of features. All for a human typing code.', 'The agent does all of it itself.', 'What\'s left: a terminal and a diff.<small>One survivor: the language server got a new job.</small>'],
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
    mergequeue: { woke: [] },
    worktrees: { woke: [] },
    mutation: { woke: [] },
    spec: { woke: [] },
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
      return `${bg(p)}${p.logTitle ? head(deckOf(p) + ' · ' + p.name, p.logTitle) : ''}<div class="log ${p.logTitle ? 'titled' : ''}">
        <div class="log-h">Crew log · ${p.name}</div>
        <div class="log-line">&gt; ${todo(p.takeaway)}</div>
        <div class="log-stamp ${red ? 'red' : ''}">${score}</div>
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
    id: 'strike', seq: 'intermezzo', steps: 2, cls: 'twist strike',
    html: () => `${HS.marquee('⚠ HULL BREACH · LIFE SUPPORT FAILING ·')}
      <div class="twist-body">
        <div class="twist-eye">${A.alien('angry')}</div>
        <div class="twist-text">
          <div class="big">The alien strikes back.</div>
          <ul class="alien-events" data-s="1">${HS.alienEvents.intermezzo.map(([n, v]) => `<li><span>${n}</span><b>+${v}</b></li>`).join('')}</ul>
        </div>
      </div>
      <div class="hud-corner">${A.hud()}</div>`,
    step: (el, st, c) => {
      if (c.active && st >= 1 && !c.state.events.intermezzo) { c.state.events.intermezzo = true; A.hudUpdate(el, c); }
      else A.hudUpdate(el, c, false);
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
