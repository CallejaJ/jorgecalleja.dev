import sharp from "sharp";
import { readFileSync } from "fs";

const SRC = "/sessions/busy-inspiring-curie/mnt/portfolio/public/images/pain-points";

// ── 1) PERFIL: cohete transparente 720×720 ──
await sharp("/tmp/faro.svg", { density: 1200 })
  .resize(720, 720, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("/tmp/ads/out/facebook-perfil-faro.png");
console.log("OK perfil");

// ── 2) PORTADA 1640×624 con collage de pain-points ──
const imgs = {};
for (const n of ["stagnant", "invisibility", "obsolete", "loading-slow"]) {
  const buf = await sharp(`${SRC}/${n}.png`).resize(480, 480).jpeg({ quality: 72 }).toBuffer();
  imgs[n] = `data:image/jpeg;base64,${buf.toString("base64")}`;
}

const card = (href, x, y, size, rot) => `
<g transform="translate(${x},${y}) rotate(${rot})">
  <rect x="-10" y="-10" width="${size + 20}" height="${size + 20}" rx="22" fill="#0d0818" opacity="0.55"/>
  <rect x="-6" y="-6" width="${size + 12}" height="${size + 12}" rx="20" fill="url(#brand)"/>
  <clipPath id="c${x}${y}"><rect width="${size}" height="${size}" rx="16"/></clipPath>
  <image href="${href}" width="${size}" height="${size}" clip-path="url(#c${x}${y})" preserveAspectRatio="xMidYMid slice"/>
</g>`;

const cover = `<svg xmlns="http://www.w3.org/2000/svg" width="1640" height="624">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#150d26"/><stop offset="0.6" stop-color="#251444"/><stop offset="1" stop-color="#1e1b4b"/>
  </linearGradient>
  <linearGradient id="rg" x1="14" y1="4" x2="36" y2="34" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/>
  </linearGradient>
  <radialGradient id="glow" cx="0.3" cy="0.4" r="0.7">
    <stop offset="0" stop-color="#9333ea" stop-opacity="0.28"/><stop offset="1" stop-color="#9333ea" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="1640" height="624" fill="url(#bg)"/>
<rect width="1640" height="624" fill="url(#glow)"/>

<!-- haces de faro desde la esquina -->
<polygon points="60,80 620,540 700,470" fill="#22d3ee" opacity="0.06"/>
<polygon points="60,80 900,290 940,190" fill="#22d3ee" opacity="0.06"/>

<!-- cohete + marca -->
<g transform="translate(200,90) scale(1.7)">
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
</g>
<text x="295" y="145" font-family="Liberation Sans" font-size="40" font-weight="bold" fill="#c4b5fd">jorgecalleja.dev</text>

<text x="200" y="265" font-family="Liberation Sans" font-size="60" font-weight="bold" fill="white">¿Tu web del Kit Digital</text>
<text x="200" y="330" font-family="Liberation Sans" font-size="60" font-weight="bold" fill="#fbbf24">no te trae clientes?</text>
<text x="200" y="398" font-family="Liberation Sans" font-size="33" fill="#e0d5ff">Auditoría gratuita en 24h</text>

<rect x="200" y="442" width="300" height="76" rx="38" fill="#25D366"/>
<g transform="translate(228,460) scale(1.7)">
  <path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
</g>
<text x="382" y="492" font-family="Liberation Sans" font-size="30" font-weight="bold" fill="white" text-anchor="middle">624 57 27 07</text>

<!-- collage pain-points -->
${card(imgs["stagnant"], 850, 105, 230, -5)}
${card(imgs["invisibility"], 1130, 70, 230, 4)}
${card(imgs["obsolete"], 985, 330, 230, 3)}
${card(imgs["loading-slow"], 1275, 320, 230, -4)}
</svg>`;

await sharp(Buffer.from(cover)).png().toFile("/tmp/ads/out/facebook-portada.png");
console.log("OK portada");
