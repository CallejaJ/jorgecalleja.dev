import sharp from "sharp";
import { readFileSync } from "fs";

const SRC = "/sessions/busy-inspiring-curie/mnt/portfolio/public/images/pain-points";

// ── 1) PERFIL: cohete transparente 720×720 ──
await sharp("/sessions/busy-inspiring-curie/mnt/portfolio/public/logo.svg", { density: 1200 })
  .resize(720, 720, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile("/tmp/ads/out/facebook-perfil-cohete.png");
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
  <path d="M21.5 34 L24 45 L26.5 34 Z" fill="#22d3ee"/>
  <path d="M17 25 C13.5 27 11 31 10.5 35 C13.5 33.5 16 31.5 17.5 29.5 Z" fill="#9333ea"/>
  <path d="M31 25 C34.5 27 37 31 37.5 35 C34.5 33.5 32 31.5 30.5 29.5 Z" fill="#9333ea"/>
  <path d="M24 3 C29.5 7.5 32 15 32 21.5 C32 26.5 30 30.5 28 33 L20 33 C18 30.5 16 26.5 16 21.5 C16 15 18.5 7.5 24 3 Z" fill="url(#rg)"/>
  <circle cx="24" cy="17" r="4.2" fill="#0f0a1e"/>
  <circle cx="24" cy="17" r="2.8" fill="#22d3ee"/>
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
