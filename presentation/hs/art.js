window.HS = window.HS || {};

HS.art = {
  cryo: (state = 'closed', label = 'HYPERSLEEP', strip = 7) => `<svg class="cryo ${state}" viewBox="0 0 440 180" aria-hidden="true">
    <rect class="shell" x="10" y="30" width="420" height="120" rx="60"/>
    ${[90, 130, 310, 350].map(x => `<line class="rib" x1="${x}" y1="32" x2="${x}" y2="46"/><line class="rib" x1="${x}" y1="134" x2="${x}" y2="148"/>`).join('')}
    <rect class="vent" x="28" y="76" width="14" height="28" rx="4"/><rect class="vent" x="398" y="76" width="14" height="28" rx="4"/>
    <rect class="interior" x="62" y="48" width="316" height="84" rx="42"/>
    <g class="sleeper"><circle cx="112" cy="90" r="17"/><rect x="134" y="73" width="196" height="34" rx="17"/></g>
    <g class="scratch"><path d="M180 64 l70 52"/><path d="M200 60 l70 52"/><path d="M220 58 l66 50"/></g>
    <circle class="eye" cx="300" cy="90" r="44" fill="url(#gEye)"/>
    <g class="lid"><rect class="glass" x="62" y="48" width="316" height="84" rx="42"/>
      <path class="frost" d="M86 72 q20 -10 34 2 t40 -2 t36 6 M92 106 q26 -8 44 4 t52 -2 t40 4 M210 70 q24 -8 40 2 t40 0 M240 112 q22 -6 36 2 t44 -2"/></g>
    <g class="strip">${Array.from({ length: strip }, (_, i) => `<rect x="${(440 - strip * 22) / 2 + i * 22 - 40}" y="152" width="16" height="8" rx="2"/>`).join('')}</g>
    ${label ? `<rect class="readout" x="300" y="146" width="104" height="24" rx="4"/><text class="readout-t" x="352" y="162" text-anchor="middle">${label}</text>` : ''}
  </svg>`,


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

  crew: (cls = '') => `<svg class="crew ${cls}" viewBox="-100 -100 200 200" aria-hidden="true">
    <defs><linearGradient id="crewVisorGrad" x1="0" x2="1"><stop offset="0" stop-color="#7dffb0" stop-opacity="0"/><stop offset=".5" stop-color="#7dffb0"/><stop offset="1" stop-color="#7dffb0" stop-opacity="0"/></linearGradient>
      <clipPath id="crewVisorClip"><rect x="-62" y="-16" width="124" height="32" rx="16"/></clipPath></defs>
    <circle class="c-r1" r="92"/><circle class="c-r2" r="72"/><circle class="c-r3" r="52"/>
    <rect class="c-visor" x="-62" y="-16" width="124" height="32" rx="16"/>
    <g clip-path="url(#crewVisorClip)"><rect class="c-light" x="-22" y="-16" width="44" height="32"/></g>
    <circle class="c-dot" cx="-30" cy="34" r="3"/><circle class="c-dot" cx="0" cy="34" r="3"/><circle class="c-dot" cx="30" cy="34" r="3"/>
    <g class="c-ticks">${Array.from({ length: 24 }, (_, i) => `<line x1="0" y1="-96" x2="0" y2="${i % 6 ? -88 : -80}" transform="rotate(${i * 15})"/>`).join('')}</g>
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
