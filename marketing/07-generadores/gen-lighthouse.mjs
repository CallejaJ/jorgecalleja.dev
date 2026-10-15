import sharp from "sharp";

const rocket = (x, y, s) => `
<g transform="translate(${x},${y}) scale(${s})">
  <linearGradient id="fl-t" x1="24" y1="4" x2="24" y2="40" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <path d="M20 13 L2 5 L2 12 Z" fill="#22d3ee" opacity="0.55"/>
  <path d="M28 13 L46 5 L46 12 Z" fill="#22d3ee" opacity="0.55"/>
  <path d="M18.5 10 L29.5 10 L24 3.5 Z" fill="url(#fl-t)"/>
  <rect x="20" y="10" width="8" height="5.5" rx="1.2" fill="#0f0a1e"/>
  <circle cx="24" cy="12.8" r="2.1" fill="#22d3ee"/>
  <rect x="17.8" y="15.2" width="12.4" height="1.8" rx="0.9" fill="#e9e4f8" opacity="0.3"/>
  <path d="M19 17 L29 17 L31.5 40 L16.5 40 Z" fill="url(#fl-t)"/>
  <path d="M18.45 22 L29.55 22 L30 26 L18 26 Z" fill="#e9e4f8" opacity="0.9"/>
  <path d="M17.5 31 L30.5 31 L30.95 35 L17.05 35 Z" fill="#e9e4f8" opacity="0.9"/>
  <rect x="22.4" y="35.5" width="3.2" height="4.5" rx="1.5" fill="#0f0a1e"/>
  <rect x="14.5" y="40" width="19" height="3" rx="1.5" fill="#e9e4f8" opacity="0.35"/>
</g>`;

const whatsapp = (x, y, s) => `
<g transform="translate(${x},${y}) scale(${s})">
  <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
</g>`;

const dots = (W, H, seed) => {
  let s = "";
  const rnd = (sd => () => (sd = (sd * 9301 + 49297) % 233280) / 233280)(seed);
  for (let i = 0; i < (H > 1200 ? 60 : 40); i++) {
    const x = rnd() * W, y = rnd() * H, r = 1 + rnd() * 2.4;
    const c = rnd() > 0.5 ? "#9333ea" : "#22d3ee";
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${c}" opacity="${(0.12 + rnd() * 0.2).toFixed(2)}"/>`;
  }
  return s;
};

const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#150d26"/><stop offset="0.6" stop-color="#251444"/><stop offset="1" stop-color="#1e1b4b"/>
  </linearGradient>
  <linearGradient id="rg" x1="14" y1="4" x2="36" y2="34" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.35" r="0.7">
    <stop offset="0" stop-color="#9333ea" stop-opacity="0.25"/><stop offset="1" stop-color="#9333ea" stop-opacity="0"/>
  </radialGradient>
</defs>`;

// Medidor estilo Lighthouse: arco según puntuación
const gauge = (cx, cy, r, score, color, label, sw = 14, emphasize = false) => {
  const theta = (score / 100) * 2 * Math.PI;
  const ex = cx + r * Math.sin(theta);
  const ey = cy - r * Math.cos(theta);
  const large = theta > Math.PI ? 1 : 0;
  const arc = score >= 100
    ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="${sw}"/>`
    : `<path d="M ${cx} ${cy - r} A ${r} ${r} 0 ${large} 1 ${ex.toFixed(1)} ${ey.toFixed(1)}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/>`;
  return `
  ${emphasize ? `<circle cx="${cx}" cy="${cy}" r="${r + sw + 10}" fill="${color}" opacity="0.12"/>` : ""}
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#352a55" stroke-width="${sw}"/>
  ${arc}
  <text x="${cx}" y="${cy + r * 0.18}" font-family="Liberation Sans" font-size="${r * 0.62}" font-weight="bold" fill="${color}" text-anchor="middle">${score}</text>
  <text x="${cx}" y="${cy + r + (emphasize ? 64 : 56)}" font-family="Liberation Sans" font-size="${emphasize ? 36 : 32}" font-weight="bold" fill="${emphasize ? "white" : "#8b83a8"}" text-anchor="middle">${label}</text>`;
};

const ORANGE = "#fb923c", GREEN = "#4ade80";

// ═══ CUADRADO 1080×1080 ═══
const sq = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
${defs}
<rect width="1080" height="1080" fill="url(#bg)"/>
<rect width="1080" height="1080" fill="url(#glow)"/>
${dots(1080, 1080, 55)}
${rocket(60, 48, 1.5)}
<text x="140" y="95" font-family="Liberation Sans" font-size="34" font-weight="bold" fill="#c4b5fd">jorgecalleja.dev</text>
<text x="540" y="210" font-family="Liberation Sans" font-size="66" font-weight="bold" fill="white" text-anchor="middle">Hay un nivel al que</text>
<text x="540" y="292" font-family="Liberation Sans" font-size="66" font-weight="bold" fill="#fbbf24" text-anchor="middle">las plantillas no llegan.</text>
${gauge(210, 520, 92, 52, ORANGE, "WordPress")}
${gauge(540, 520, 92, 58, ORANGE, "PrestaShop")}
<polygon points="870,520 660,185 765,150" fill="#4ade80" opacity="0.10"/>
<polygon points="870,520 985,150 1068,215" fill="#4ade80" opacity="0.10"/>
${gauge(870, 520, 100, 100, GREEN, "Web a medida", 16, true)}
<text x="540" y="770" font-family="Liberation Sans" font-size="32" fill="#e0d5ff" text-anchor="middle">Lighthouse: el faro que ilumina tu presencia en internet.</text>
<text x="540" y="818" font-family="Liberation Sans" font-size="29" fill="#8b83a8" text-anchor="middle">Wix, plantillas y webs del Kit Digital: mismo techo.</text>
<rect x="240" y="880" width="600" height="106" rx="53" fill="#25D366"/>
${whatsapp(286, 906, 2.2)}
<text x="590" y="947" font-family="Liberation Sans" font-size="38" font-weight="bold" fill="white" text-anchor="middle">Mide tu web GRATIS</text>
<text x="540" y="1036" font-family="Liberation Sans" font-size="26" fill="#a5b4fc" text-anchor="middle">Sin compromiso · Escríbeme por WhatsApp</text>
</svg>`;

// ═══ REEL 1080×1920 ═══
const reel = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
${defs}
<rect width="1080" height="1920" fill="url(#bg)"/>
<rect width="1080" height="1920" fill="url(#glow)"/>
${dots(1080, 1920, 88)}
${rocket(80, 150, 2)}
<text x="185" y="212" font-family="Liberation Sans" font-size="42" font-weight="bold" fill="#c4b5fd">jorgecalleja.dev</text>
<text x="540" y="420" font-family="Liberation Sans" font-size="78" font-weight="bold" fill="white" text-anchor="middle">Hay un nivel al que</text>
<text x="540" y="518" font-family="Liberation Sans" font-size="78" font-weight="bold" fill="#fbbf24" text-anchor="middle">las plantillas</text>
<text x="540" y="616" font-family="Liberation Sans" font-size="78" font-weight="bold" fill="#fbbf24" text-anchor="middle">no llegan.</text>
<polygon points="540,1180 180,740 320,680" fill="#4ade80" opacity="0.10"/>
<polygon points="540,1180 760,680 900,740" fill="#4ade80" opacity="0.10"/>
${gauge(295, 870, 105, 52, ORANGE, "WordPress", 15)}
${gauge(785, 870, 105, 58, ORANGE, "PrestaShop", 15)}
${gauge(540, 1180, 130, 100, GREEN, "Web a medida", 19, true)}
<text x="540" y="1305" font-size="1" fill="none">.</text>
<text x="540" y="1440" font-family="Liberation Sans" font-size="35" fill="#e0d5ff" text-anchor="middle">Lighthouse: el faro que ilumina tu presencia en internet.</text>
<text x="540" y="1492" font-family="Liberation Sans" font-size="31" fill="#8b83a8" text-anchor="middle">Wix, plantillas y webs del Kit Digital: mismo techo.</text>
<rect x="220" y="1555" width="640" height="130" rx="65" fill="#25D366"/>
${whatsapp(268, 1590, 2.6)}
<text x="600" y="1635" font-family="Liberation Sans" font-size="42" font-weight="bold" fill="white" text-anchor="middle">Mide tu web GRATIS</text>
<text x="540" y="1755" font-family="Liberation Sans" font-size="30" fill="#a5b4fc" text-anchor="middle">Sin compromiso · Escríbeme por WhatsApp</text>
</svg>`;

await sharp(Buffer.from(sq)).png().toFile("/tmp/ads/out/anuncio-7-lighthouse-100.png");
await sharp(Buffer.from(reel)).png().toFile("/tmp/ads/out/reel-7-lighthouse-100.png");
console.log("OK lighthouse");
