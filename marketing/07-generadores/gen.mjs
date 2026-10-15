import sharp from "sharp";

const W = 1080, H = 1080;

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

const whatsapp = (x, y, s, color = "white") => `
<g transform="translate(${x},${y}) scale(${s})">
  <path fill="${color}" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
</g>`;

const frame = (headline, visual) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#150d26"/><stop offset="0.6" stop-color="#251444"/><stop offset="1" stop-color="#1e1b4b"/>
  </linearGradient>
  <linearGradient id="rg" x1="14" y1="4" x2="36" y2="34" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.35" r="0.7">
    <stop offset="0" stop-color="#9333ea" stop-opacity="0.25"/><stop offset="1" stop-color="#9333ea" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
${rocket(60, 48, 1.5)}
<text x="140" y="95" font-family="Liberation Sans" font-size="34" font-weight="bold" fill="#c4b5fd">jorgecalleja.dev</text>
${headline}
${visual}
<rect x="240" y="870" width="600" height="110" rx="55" fill="#25D366"/>
${whatsapp(288, 897, 2.3)}
<text x="590" y="940" font-family="Liberation Sans" font-size="38" font-weight="bold" fill="white" text-anchor="middle">Auditoría GRATIS en 24h</text>
<text x="540" y="1032" font-family="Liberation Sans" font-size="27" fill="#a5b4fc" text-anchor="middle">Sin compromiso · WhatsApp 624 57 27 07</text>
</svg>`;

const hl = (lines, y0, size = 74, lh = 1.22) =>
  lines.map((l, i) =>
    `<text x="540" y="${y0 + i * size * lh}" font-family="Liberation Sans" font-size="${size}" font-weight="bold" fill="${l.c || "white"}" text-anchor="middle">${l.t}</text>`
  ).join("");

// ── AD 1: Kit Digital abandonado ──
const ad1 = frame(
  hl([
    { t: "¿Te hicieron la web" },
    { t: "con el Kit Digital…" },
    { t: "…y ahí se quedó?", c: "#fbbf24" },
  ], 210),
  `
  <g transform="translate(240,480)">
    <rect width="600" height="300" rx="18" fill="#1a1030" stroke="#3f2d6b" stroke-width="2"/>
    <rect width="600" height="52" rx="18" fill="#241743"/>
    <circle cx="34" cy="26" r="8" fill="#ef4444"/><circle cx="62" cy="26" r="8" fill="#fbbf24"/><circle cx="90" cy="26" r="8" fill="#22c55e"/>
    <rect x="40" y="90" width="380" height="26" rx="13" fill="#3f2d6b" opacity="0.7"/>
    <rect x="40" y="140" width="520" height="16" rx="8" fill="#3f2d6b" opacity="0.45"/>
    <rect x="40" y="170" width="480" height="16" rx="8" fill="#3f2d6b" opacity="0.45"/>
    <rect x="40" y="200" width="510" height="16" rx="8" fill="#3f2d6b" opacity="0.45"/>
    <rect x="360" y="243" width="215" height="40" rx="20" fill="#78350f"/>
    <text x="467" y="270" font-family="Liberation Sans" font-size="22" font-weight="bold" fill="#fbbf24" text-anchor="middle">Actualizada: 2023</text>
  </g>
  <text x="540" y="835" font-family="Liberation Sans" font-size="33" fill="#e0d5ff" text-anchor="middle">Sin estructura. Sin visitas. Sin clientes.</text>`
);

// ── AD 2: Invisible en Google ──
const ad2 = frame(
  hl([
    { t: "Tu cliente te busca." },
    { t: "Y encuentra a", c: "#fbbf24" },
    { t: "tu competencia.", c: "#fbbf24" },
  ], 200),
  `
  <g transform="translate(215,470)">
    <rect width="650" height="70" rx="35" fill="white"/>
    <circle cx="42" cy="35" r="14" fill="none" stroke="#4285f4" stroke-width="5"/>
    <line x1="52" y1="46" x2="64" y2="58" stroke="#4285f4" stroke-width="5" stroke-linecap="round"/>
    <text x="90" y="46" font-family="Liberation Sans" font-size="30" fill="#333">tu servicio en tu ciudad</text>
    <g transform="translate(20,110)">
      <text x="0" y="0" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="#8ab4f8">1. Tu competencia</text>
      <text x="0" y="52" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="#8ab4f8">2. Tu competencia</text>
      <text x="0" y="104" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="#8ab4f8">3. Tu competencia</text>
      <line x1="0" y1="140" x2="610" y2="140" stroke="#3f2d6b" stroke-width="2"/>
      <text x="0" y="190" font-family="Liberation Sans" font-size="34" font-weight="bold" fill="#fbbf24">Tú: en la página 7</text>
      <text x="610" y="190" font-family="Liberation Sans" font-size="30" fill="#a5b4fc" text-anchor="end">(donde nadie mira)</text>
    </g>
  </g>`
);

// ── AD 3: Botones rotos en móvil ──
const ad3 = frame(
  hl([
    { t: "7 de cada 10 clientes" },
    { t: "entran desde el móvil." },
    { t: "¿Tus botones funcionan?", c: "#fbbf24" },
  ], 200),
  `
  <g transform="translate(415,455)">
    <rect width="250" height="380" rx="34" fill="#1a1030" stroke="#3f2d6b" stroke-width="3"/>
    <rect x="88" y="16" width="74" height="10" rx="5" fill="#3f2d6b"/>
    <rect x="30" y="60" width="190" height="18" rx="9" fill="#3f2d6b" opacity="0.6"/>
    <rect x="30" y="94" width="150" height="18" rx="9" fill="#3f2d6b" opacity="0.45"/>
    <rect x="35" y="160" width="180" height="64" rx="32" fill="#25D366" opacity="0.85"/>
    <text x="125" y="200" font-family="Liberation Sans" font-size="26" font-weight="bold" fill="white" text-anchor="middle">LLAMAR</text>
    <g transform="translate(195,155)">
      <circle r="42" fill="#ef4444" opacity="0.95"/>
      <line x1="-17" y1="-17" x2="17" y2="17" stroke="white" stroke-width="9" stroke-linecap="round"/>
      <line x1="17" y1="-17" x2="-17" y2="17" stroke="white" stroke-width="9" stroke-linecap="round"/>
    </g>
    <text x="125" y="300" font-family="Liberation Sans" font-size="24" font-weight="bold" fill="#ef4444" text-anchor="middle">no responde</text>
  </g>
  <text x="540" y="30" font-size="1" fill="none">.</text>`
);

// ── AD 4: Web lenta ──
const ad4 = frame(
  hl([
    { t: "Tu web tarda 8 segundos." },
    { t: "Tu cliente se va a los 3.", c: "#fbbf24" },
  ], 215, 70),
  `
  <g transform="translate(540,600)">
    <circle r="130" fill="none" stroke="#3f2d6b" stroke-width="16"/>
    <path d="M 0 -130 A 130 130 0 0 1 112.6 -65" fill="none" stroke="#22d3ee" stroke-width="16" stroke-linecap="round"/>
    <text x="0" y="28" font-family="Liberation Sans" font-size="96" font-weight="bold" fill="#22d3ee" text-anchor="middle">3s</text>
    <text x="0" y="70" font-family="Liberation Sans" font-size="26" fill="#a5b4fc" text-anchor="middle">cargando…</text>
  </g>
  <text x="540" y="815" font-family="Liberation Sans" font-size="33" fill="#e0d5ff" text-anchor="middle">La mitad de tus visitas no llegan a ver tu web.</text>`
);

const ads = { "anuncio-1-kit-digital": ad1, "anuncio-2-invisible-google": ad2, "anuncio-3-botones-movil": ad3, "anuncio-4-web-lenta": ad4 };
for (const [name, svg] of Object.entries(ads)) {
  await sharp(Buffer.from(svg)).png().toFile(`/tmp/ads/out/${name}.png`);
  console.log("OK", name);
}
