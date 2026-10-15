import sharp from "sharp";

// Faro grande, protagonista
const faroBig = (x, y, s) => `
<g transform="translate(${x},${y}) scale(${s})">
  <linearGradient id="fb-t" x1="24" y1="4" x2="24" y2="40" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <path d="M18.5 10 L29.5 10 L24 3.5 Z" fill="url(#fb-t)"/>
  <rect x="20" y="10" width="8" height="5.5" rx="1.2" fill="#0f0a1e"/>
  <circle cx="24" cy="12.8" r="2.1" fill="#22d3ee"/>
  <rect x="17.8" y="15.2" width="12.4" height="1.8" rx="0.9" fill="#e9e4f8" opacity="0.3"/>
  <path d="M19 17 L29 17 L31.5 40 L16.5 40 Z" fill="url(#fb-t)"/>
  <path d="M18.45 22 L29.55 22 L30 26 L18 26 Z" fill="#e9e4f8" opacity="0.9"/>
  <path d="M17.5 31 L30.5 31 L30.95 35 L17.05 35 Z" fill="#e9e4f8" opacity="0.9"/>
  <rect x="22.4" y="35.5" width="3.2" height="4.5" rx="1.5" fill="#0f0a1e"/>
  <rect x="14.5" y="40" width="19" height="3" rx="1.5" fill="#e9e4f8" opacity="0.35"/>
</g>`;

// Tiendecita (el negocio del cliente) iluminada por el haz
const shop = (x, y, s, lit) => `
<g transform="translate(${x},${y}) scale(${s})" opacity="${lit ? 1 : 0.35}">
  <rect x="4" y="14" width="40" height="26" rx="3" fill="${lit ? "#e9e4f8" : "#3a3352"}"/>
  <path d="M2 8 L46 8 L44 16 L4 16 Z" fill="${lit ? "#9333ea" : "#4c4368"}"/>
  <path d="M4 8 L10 8 L9 16 L4.5 16 Z M16 8 L22 8 L21.5 16 L15.5 16 Z M28 8 L34 8 L34.5 16 L27.5 16 Z M40 8 L46 8 L44 16 L39.5 16 Z" fill="${lit ? "#22d3ee" : "#5b5177"}"/>
  <rect x="9" y="22" width="12" height="12" rx="1.5" fill="${lit ? "#1e1b4b" : "#2a2440"}"/>
  <rect x="27" y="22" width="10" height="18" rx="1.5" fill="${lit ? "#1e1b4b" : "#2a2440"}"/>
</g>`;

const whatsapp = (x, y, s) => `
<g transform="translate(${x},${y}) scale(${s})">
  <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
</g>`;

const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#150d26"/><stop offset="0.6" stop-color="#251444"/><stop offset="1" stop-color="#1e1b4b"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.5" cy="0.4" r="0.7">
    <stop offset="0" stop-color="#9333ea" stop-opacity="0.25"/><stop offset="1" stop-color="#9333ea" stop-opacity="0"/>
  </radialGradient>
</defs>`;

// ═══ CUADRADO: el faro ilumina al negocio ═══
const sq = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
${defs}
<rect width="1080" height="1080" fill="url(#bg)"/>
<rect width="1080" height="1080" fill="url(#glow)"/>
<text x="540" y="200" font-family="Liberation Sans" font-size="76" font-weight="bold" fill="white" text-anchor="middle">Si tu negocio no se ve,</text>
<text x="540" y="295" font-family="Liberation Sans" font-size="76" font-weight="bold" fill="#fbbf24" text-anchor="middle">no existe.</text>

<!-- haz de luz iluminando la tienda -->
<polygon points="325,460 660,615 660,765 325,500" fill="#22d3ee" opacity="0.20"/>
<polygon points="322,460 160,540 160,640 322,500" fill="#22d3ee" opacity="0.08"/>
${faroBig(210, 400, 4.7)}
${shop(640, 590, 4.2, true)}
<text x="745" y="850" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="#22d3ee" text-anchor="middle">TU NEGOCIO</text>

<text x="540" y="925" font-size="1" fill="none">.</text>
<rect x="240" y="880" width="600" height="106" rx="53" fill="#25D366"/>
${whatsapp(286, 906, 2.2)}
<text x="590" y="947" font-family="Liberation Sans" font-size="37" font-weight="bold" fill="white" text-anchor="middle">Hazte visible: GRATIS</text>
<text x="540" y="1036" font-family="Liberation Sans" font-size="26" fill="#a5b4fc" text-anchor="middle">Google · Móvil · IAs · WhatsApp 624 57 27 07</text>
</svg>`;

// ═══ REEL ═══
const reel = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920">
${defs}
<rect width="1080" height="1920" fill="url(#bg)"/>
<rect width="1080" height="1920" fill="url(#glow)"/>
<text x="540" y="400" font-family="Liberation Sans" font-size="84" font-weight="bold" fill="white" text-anchor="middle">Si tu negocio</text>
<text x="540" y="505" font-family="Liberation Sans" font-size="84" font-weight="bold" fill="white" text-anchor="middle">no se ve,</text>
<text x="540" y="610" font-family="Liberation Sans" font-size="84" font-weight="bold" fill="#fbbf24" text-anchor="middle">no existe.</text>

<polygon points="440,810 800,1070 800,1260 440,855" fill="#22d3ee" opacity="0.20"/>
<polygon points="438,810 240,910 240,1030 438,855" fill="#22d3ee" opacity="0.08"/>
${faroBig(310, 740, 5.5)}
${shop(790, 1040, 4.6, true)}
<text x="900" y="1330" font-family="Liberation Sans" font-size="32" font-weight="bold" fill="#22d3ee" text-anchor="middle">TU NEGOCIO</text>

<text x="540" y="1480" font-family="Liberation Sans" font-size="34" fill="#a5b4fc" text-anchor="middle">Google, móvil e IAs: que te encuentren en todas partes</text>
<rect x="220" y="1555" width="640" height="130" rx="65" fill="#25D366"/>
${whatsapp(268, 1590, 2.6)}
<text x="600" y="1635" font-family="Liberation Sans" font-size="40" font-weight="bold" fill="white" text-anchor="middle">Hazte visible: GRATIS</text>
<text x="540" y="1755" font-family="Liberation Sans" font-size="30" fill="#a5b4fc" text-anchor="middle">Sin compromiso · WhatsApp 624 57 27 07</text>
</svg>`;

await sharp(Buffer.from(sq)).png().toFile("/tmp/ads/out/anuncio-8-visibilidad.png");
await sharp(Buffer.from(reel)).png().toFile("/tmp/ads/out/reel-8-visibilidad.png");
console.log("OK visibilidad");
