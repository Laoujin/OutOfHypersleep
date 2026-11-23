window.HS = window.HS || {};

HS.art = {
  pod: (cls = '') => `<svg class="podsvg ${cls}" viewBox="0 0 120 200" aria-hidden="true">
    <rect class="shell" x="8" y="4" width="104" height="192" rx="52"/>
    <rect class="rim" x="16" y="12" width="88" height="176" rx="44"/>
    <rect class="bay" x="24" y="24" width="72" height="140" rx="36"/>
    <g class="sleeper"><circle cx="60" cy="60" r="13"/><rect x="41" y="78" width="38" height="72" rx="18"/></g>
    <g class="eaten"><path d="M38 52 l44 44 M82 52 l-44 44"/></g>
    <g class="door"><rect class="glass" x="24" y="24" width="72" height="140" rx="36"/>
      <path class="frost" d="M30 70 q14 -10 22 2 t24 -4 t16 8 M28 110 q18 -8 28 4 t34 -2 M30 140 q20 -6 30 2 t30 0"/></g>
    <circle class="light" cx="60" cy="178" r="6"/>
  </svg>`,

  alien: (cls = '') => `<svg class="alien ${cls}" viewBox="-100 -100 200 200" aria-hidden="true">
    <circle class="a-r1" r="92"/><circle class="a-r2" r="72"/><circle class="a-r3" r="52"/>
    <path class="a-eye" d="M-60 0 Q0 -46 60 0 Q0 46 -60 0Z"/>
    <path class="a-pupil" d="M0 -30 Q10 0 0 30 Q-10 0 0 -30Z"/>
    <g class="a-ticks">${Array.from({ length: 24 }, (_, i) => `<line x1="0" y1="-96" x2="0" y2="${i % 6 ? -88 : -80}" transform="rotate(${i * 15})"/>`).join('')}</g>
  </svg>`,

  rel: n => `<span class="rel" title="relevance today">${[1, 2, 3, 4, 5].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`,

  hud: () => `<div class="hud"><div class="hud-side crew"><label>Crew</label><b data-hud="crew">0</b></div><div class="hud-vs">vs</div><div class="hud-side alien"><label>Alien AI</label><b data-hud="alien">0</b></div></div>`,

  countUp(el, from, to, ms = 1200) {
    if (!el) return;
    const t0 = performance.now();
    const tick = t => {
      const k = Math.min(1, (t - t0) / ms);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  hudUpdate(root, c, animate = true) {
    const sc = HS.score(c.state);
    if (!c.active) {
      const cr0 = root.querySelector('[data-hud=crew]'), al0 = root.querySelector('[data-hud=alien]');
      if (cr0) cr0.textContent = sc.crew;
      if (al0) al0.textContent = sc.alien;
      return;
    }
    const sh = c.state.shown || { crew: 0, alien: 0 };
    const cr = root.querySelector('[data-hud=crew]'), al = root.querySelector('[data-hud=alien]');
    if (animate) { HS.art.countUp(cr, sh.crew, sc.crew); HS.art.countUp(al, sh.alien, sc.alien); }
    else { if (cr) cr.textContent = sc.crew; if (al) al.textContent = sc.alien; }
    c.state.shown = { crew: sc.crew, alien: sc.alien };
    c.save();
  },

  ecg(kind) {
    const beat = {
      flat: 'l120 0',
      weak: 'l40 0 l6 -6 l6 10 l6 -4 l62 0',
      strong: 'l36 0 l8 -14 l8 56 l10 -110 l10 84 l8 -16 l40 0',
      pulse: 'l40 0 l8 -10 l8 34 l8 -64 l8 50 l8 -10 l40 0',
    }[kind];
    return `<svg class="ecg ${kind}" viewBox="0 0 480 120" preserveAspectRatio="none"><path d="M0 60 ${Array(8).fill(beat).join(' ')}"/></svg>`;
  },
};

HS.caps = caps => `<div class="caps">${caps.map((c, i) => `<div class="cap" data-c="${i}">${c}</div>`).join('')}</div>`;
HS.capStep = (el, st) => el.querySelectorAll('[data-c]').forEach(c => c.classList.toggle('on', +c.dataset.c === st));
