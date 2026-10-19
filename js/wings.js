// ============================================================
// W.B.S — Ailes animées (SVG) : deux vraies ailes à plumes qui battent
// ============================================================
let _wingId = 0;
function wbsWingsSVG(opts) {
  opts = opts || {};
  const dur = opts.dur || 3.4;           // durée d'un battement complet (s)
  const id = 'wg' + (++_wingId);
  const n = 11;                          // nombre de plumes par couche

  // une couche de plumes : angle en degrés (0 = horizontal vers l'extérieur, négatif = vers le haut)
  // la longueur suit une courbe en cloche : plumes primaires (extérieur) longues, couvertures courtes
  function couche(nb, a0, a1, lmin, lmax, pic, largeur, fill, delayBase) {
    let out = '';
    for (let i = 0; i < nb; i++) {
      const t = i / (nb - 1);
      const ang = a0 + (a1 - a0) * t;
      const k = Math.exp(-Math.pow((t - pic) / 0.38, 2));        // cloche centrée sur "pic"
      const L = lmin + (lmax - lmin) * k;
      const w = largeur;
      const d = `M0,0 C${L*0.2},${-w*1.05} ${L*0.62},${-w*1.15} ${L},${-w*0.1} C${L*0.7},${w*0.75} ${L*0.25},${w*0.7} 0,0Z`;
      const delay = -(delayBase + i * 0.05);
      out += `<path d="${d}" fill="${fill}" stroke="#b08d3c" stroke-width=".8" stroke-linejoin="round" transform="rotate(${ang})">
        <animateTransform attributeName="transform" type="rotate" values="${ang};${ang - 3.5};${ang + 2};${ang}" keyTimes="0;.45;.75;1" dur="${dur}s" begin="${delay}s" repeatCount="indefinite"/></path>`;
    }
    return out;
  }

  const wing =
    `<g>
      <animateTransform attributeName="transform" type="rotate" values="14 0 0;-20 0 0;14 0 0" keyTimes="0;.5;1" calcMode="spline" keySplines=".42 0 .58 1;.42 0 .58 1" dur="${dur}s" repeatCount="indefinite"/>
      ${couche(15, -72, 22, 40, 118, 0.62, 12, `url(#${id}-back)`, 0.15)}
      ${couche(13, -64, 14, 30, 82, 0.6, 10, `url(#${id}-front)`, 0)}
      ${couche(9, -58, 4, 22, 46, 0.55, 8, `url(#${id}-gold)`, 0.1)}
      <circle cx="0" cy="0" r="6" fill="#141416" stroke="#b08d3c" stroke-width="1.2"/>
    </g>`;

  return `<svg class="wbs-wings" viewBox="-128 -100 256 175" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="${id}-back" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#121214"/><stop offset=".55" stop-color="#4a3a16"/><stop offset="1" stop-color="#e6cf8e"/>
      </linearGradient>
      <linearGradient id="${id}-gold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#2a2110"/><stop offset=".5" stop-color="#9b7a2c"/><stop offset="1" stop-color="#f0d98f"/>
      </linearGradient>
      <linearGradient id="${id}-front" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#1b1b1f"/><stop offset=".6" stop-color="#8d8b86"/><stop offset="1" stop-color="#f3f1ea"/>
      </linearGradient>
    </defs>
    <g>${wing}</g>
    <g transform="scale(-1,1)">${wing}</g>
  </svg>`;
}
