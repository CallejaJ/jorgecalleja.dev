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

// puntos decorativos de fondo
const dots = () => {
  let s = "";
  const rnd = (seed => () => (seed = (seed * 9301 + 49297) % 233280) / 233280)(42);
  for (let i = 0; i < 40; i++) {
    const x = rnd() * W, y = rnd() * H, r = 1 + rnd() * 2.2;
    const c = rnd() > 0.5 ? "#9333ea" : "#22d3ee";
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${c}" opacity="${(0.12 + rnd() * 0.2).toFixed(2)}"/>`;
  }
  return s;
};

const frame = (headline, visual, ctaText = "Auditoría GRATIS en 24h") => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#150d26"/><stop offset="0.6" stop-color="#251444"/><stop offset="1" stop-color="#1e1b4b"/>
  </linearGradient>
  <linearGradient id="rg" x1="14" y1="4" x2="36" y2="34" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.35" r="0.7">
    <stop offset="0" stop-color="#9333ea" stop-opacity="0.25"/><stop offset="1" stop-color="#9333ea" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<rect width="${W}" height="${H}" fill="url(#glow)"/>
${dots()}
${rocket(60, 48, 1.5)}
<text x="140" y="95" font-family="Liberation Sans" font-size="34" font-weight="bold" fill="#c4b5fd">jorgecalleja.dev</text>
${headline}
${visual}
<rect x="240" y="880" width="600" height="106" rx="53" fill="#25D366"/>
${whatsapp(286, 906, 2.2)}
<text x="590" y="947" font-family="Liberation Sans" font-size="37" font-weight="bold" fill="white" text-anchor="middle">${ctaText}</text>
<text x="540" y="1036" font-family="Liberation Sans" font-size="26" fill="#a5b4fc" text-anchor="middle">Sin compromiso · WhatsApp 624 57 27 07</text>
</svg>`;

const hl = (lines, y0, size = 70, lh = 1.22) =>
  lines.map((l, i) =>
    `<text x="540" y="${y0 + i * size * lh}" font-family="Liberation Sans" font-size="${size}" font-weight="bold" fill="${l.c || "white"}" text-anchor="middle">${l.t}</text>`
  ).join("");

// ═══ AD 5: EL TICKET — coste de una web rota ═══
const ticketLine = (y, label, value, color = "#333") => `
  <text x="45" y="${y}" font-family="Liberation Mono" font-size="26" fill="${color}">${label}</text>
  <text x="515" y="${y}" font-family="Liberation Mono" font-size="26" font-weight="bold" fill="${color}" text-anchor="end">${value}</text>`;

const ad5 = frame(
  hl([
    { t: "Una web que no funciona" },
    { t: "también pasa factura.", c: "#fbbf24" },
  ], 200, 66),
  `
  <g transform="translate(540,590) rotate(-2)">
    <g transform="translate(-280,-235)">
      <rect x="10" y="12" width="560" height="470" rx="6" fill="#000" opacity="0.35"/>
      <rect width="560" height="470" rx="6" fill="#faf8f2"/>
      <text x="280" y="52" font-family="Liberation Mono" font-size="30" font-weight="bold" fill="#111" text-anchor="middle">TICKET · ESTE MES</text>
      <text x="280" y="86" font-family="Liberation Mono" font-size="22" fill="#777" text-anchor="middle">tu-web-del-kit-digital.es</text>
      <line x1="40" y1="112" x2="520" y2="112" stroke="#999" stroke-width="2" stroke-dasharray="8 6"/>
      ${ticketLine(160, "Visitas que no cargaron", "214")}
      ${ticketLine(205, "Llamadas que no salieron", "31")}
      ${ticketLine(250, "Formularios perdidos", "18")}
      ${ticketLine(295, "Clientes a la competencia", "12")}
      <line x1="40" y1="330" x2="520" y2="330" stroke="#999" stroke-width="2" stroke-dasharray="8 6"/>
      ${ticketLine(378, "TOTAL PERDIDO", "≈ 3.400€", "#dc2626")}
      <text x="280" y="435" font-family="Liberation Mono" font-size="21" fill="#777" text-anchor="middle">** Cada mes. Sin que lo veas. **</text>
    </g>
  </g>`,
  "Cuánto pierdes: GRATIS"
);

// ═══ AD 6: ANTES / DESPUÉS ═══
const row = (y, ok, label) => `
  <g transform="translate(30,${y})">
    <circle cx="14" cy="-8" r="14" fill="${ok ? "#22c55e" : "#ef4444"}"/>
    ${ok
      ? `<path d="M7 -8 L12 -3 L21 -14" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
      : `<line x1="8" y1="-14" x2="20" y2="-2" stroke="white" stroke-width="3.5" stroke-linecap="round"/><line x1="20" y1="-14" x2="8" y2="-2" stroke="white" stroke-width="3.5" stroke-linecap="round"/>`}
    <text x="42" y="0" font-family="Liberation Sans" font-size="27" font-weight="bold" fill="${ok ? "#e0d5ff" : "#8b83a8"}">${label}</text>
  </g>`;

const ad6 = frame(
  hl([
    { t: "La diferencia entre tener web" },
    { t: "y tener una web que vende.", c: "#fbbf24" },
  ], 195, 58),
  `
  <g transform="translate(85,420)">
    <rect width="390" height="380" rx="24" fill="#171021" stroke="#3a3352" stroke-width="2"/>
    <text x="195" y="58" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="#8b83a8" text-anchor="middle">TU WEB HOY</text>
    <line x1="30" y1="82" x2="360" y2="82" stroke="#3a3352" stroke-width="2"/>
    ${row(150, false, "Tarda 8 segundos")}
    ${row(220, false, "Página 7 de Google")}
    ${row(290, false, "Botones rotos en móvil")}
    <text x="195" y="352" font-family="Liberation Sans" font-size="25" fill="#6b6488" text-anchor="middle">0 clientes nuevos</text>
  </g>
  <g transform="translate(495,585)">
    <path d="M0 15 H60 M42 -5 L65 15 L42 35" fill="none" stroke="url(#brand)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <g transform="translate(605,420)">
    <rect x="-4" y="-4" width="398" height="388" rx="27" fill="url(#brand)"/>
    <rect width="390" height="380" rx="24" fill="#1d1338"/>
    <text x="195" y="58" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="#22d3ee" text-anchor="middle">EN 2 SEMANAS</text>
    <line x1="30" y1="82" x2="360" y2="82" stroke="#4c3a7d" stroke-width="2"/>
    ${row(150, true, "Carga en 0,8 segundos")}
    ${row(220, true, "1ª página de Google")}
    ${row(290, true, "Todo funciona en móvil")}
    <g transform="translate(195,340)">
      <rect x="-108" y="-26" width="216" height="42" rx="21" fill="#14532d"/>
      <text x="0" y="4" font-family="Liberation Sans" font-size="25" font-weight="bold" fill="#4ade80" text-anchor="middle">99/100 velocidad</text>
    </g>
  </g>`
);

const ads = { "anuncio-5-ticket-perdidas": ad5, "anuncio-6-antes-despues": ad6 };
for (const [name, svg] of Object.entries(ads)) {
  await sharp(Buffer.from(svg)).png().toFile(`/tmp/ads/out/${name}.png`);
  console.log("OK", name);
}
