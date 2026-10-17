// Generador v2 — estética renovada (oscuro editorial, Space Grotesk + Instrument Serif).
// Uso: node marketing/07-generadores/gen-v2.mjs [id ...]
// Requiere playwright (global en el entorno) y las fuentes de ./fonts.
import { createRequire } from "node:module";
import { readFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = require("playwright"));
} catch {
  ({ chromium } = require("/opt/node22/lib/node_modules/playwright"));
}

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..");
const font = (f) => readFileSync(join(here, "fonts", f)).toString("base64");
const logo = readFileSync(join(root, "..", "public", "logo.svg"), "utf8");

const fontCss = `
@font-face{font-family:"SG";src:url(data:font/woff2;base64,${font("SpaceGrotesk-normal.woff2")}) format("woff2");font-weight:300 700}
@font-face{font-family:"IS";font-style:italic;src:url(data:font/woff2;base64,${font("InstrumentSerif-italic.woff2")}) format("woff2")}
`;

// ───────── piezas visuales ─────────

const search = (query, top) => `
<div class="card search">
  <div class="bar"><span class="g">G</span><span class="q">${query}</span><span class="mag">⌕</span></div>
  <div class="res hit">
    <div class="rank">1</div>
    <div>
      <div class="rt">${top}</div>
      <div class="rs"><span class="stars">★★★★★</span> 4,9 · Abierto ahora</div>
    </div>
  </div>
  <div class="res dim"><div class="rank">2</div><div><div class="ln w70"></div><div class="ln w45"></div></div></div>
  <div class="res dim"><div class="rank">3</div><div><div class="ln w60"></div><div class="ln w35"></div></div></div>
</div>`;

const ring = (v, label, tone) => {
  const r = 92, c = 2 * Math.PI * r, off = c * (1 - v / 100);
  return `
<div class="ring ${tone}">
  <svg width="230" height="230" viewBox="0 0 230 230">
    <circle cx="115" cy="115" r="${r}" class="track"/>
    <circle cx="115" cy="115" r="${r}" class="val" stroke-dasharray="${c}" stroke-dashoffset="${off}" transform="rotate(-90 115 115)"/>
  </svg>
  <div class="num">${v}</div>
  <div class="lbl">${label}</div>
</div>`;
};


// Escena de marca: el faro ilumina tu negocio (redibujo vectorial de ls-prev.jpg)
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const scene = ({ stars = true, w = 1200, h = 670 } = {}) => {
  seed = 7;
  const st = stars
    ? Array.from({ length: 70 }, () => {
        const x = rnd() * 1200, y = rnd() * 640, r = 0.8 + rnd() * 2.2, o = 0.25 + rnd() * 0.6;
        const c = rnd() > 0.75 ? "#22d3ee" : rnd() > 0.5 ? "#c4b5fd" : "#ffffff";
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="${o.toFixed(2)}"/>`;
      }).join("")
    : "";
  const tiles = Array.from({ length: 4 }, (_, row) => {
    const y = 380 + row * 16, x0 = 905 - row * 6, x1 = 1095 + row * 6, n = 12 + row;
    const step = (x1 - x0) / n;
    return Array.from({ length: n }, (_, i) =>
      `<path d="M${(x0 + i * step).toFixed(1)} ${y} q${(step / 2).toFixed(1)} 14 ${step.toFixed(1)} 0" fill="none" stroke="#9a3412" stroke-width="2.4" opacity=".55"/>`
    ).join("");
  }).join("");
  return `<svg viewBox="0 0 1200 670" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" style="display:block;overflow:visible">
<defs>
  <linearGradient id="sc-tower" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f7cf7"/><stop offset="1" stop-color="#8b3ff0"/></linearGradient>
  <linearGradient id="sc-roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b7cf6"/><stop offset="1" stop-color="#8b3ff0"/></linearGradient>
  <linearGradient id="sc-beam" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#5eead4" stop-opacity=".95"/><stop offset=".55" stop-color="#22d3ee" stop-opacity=".45"/><stop offset="1" stop-color="#22d3ee" stop-opacity=".05"/>
  </linearGradient>
  <radialGradient id="sc-glow" cx=".5" cy=".55" r=".5"><stop offset="0" stop-color="#22d3ee" stop-opacity=".55"/><stop offset=".55" stop-color="#22d3ee" stop-opacity=".18"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>
  <linearGradient id="sc-tile" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ea7a4f"/><stop offset="1" stop-color="#c2502b"/></linearGradient>
  <linearGradient id="sc-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#dfe7f5"/></linearGradient>
  <linearGradient id="sc-glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3b4a7a"/><stop offset="1" stop-color="#1e2547"/></linearGradient>
  <filter id="sc-blur" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>
${st}
<!-- haz -->
<polygon points="248,188 905,300 1010,610 248,232" fill="url(#sc-beam)" filter="url(#sc-blur)" opacity=".9"/>
<polygon points="248,196 905,318 990,590 248,224" fill="url(#sc-beam)" opacity=".75"/>
<!-- faro -->
<path d="M150 120 L228 46 L306 120 Z" fill="url(#sc-roof)"/>
<rect x="172" y="120" width="112" height="78" rx="14" fill="#1a1440"/>
<circle cx="228" cy="159" r="27" fill="#5eead4"/><circle cx="228" cy="159" r="40" fill="#5eead4" opacity=".25"/>
<rect x="150" y="196" width="156" height="20" rx="10" fill="#3b2f86"/>
<path d="M172 216 L284 216 L318 532 L138 532 Z" fill="url(#sc-tower)"/>
<path d="M168 262 L288 262 L293 306 L163 306 Z" fill="#c9c6f7" opacity=".75"/>
<path d="M158 360 L298 360 L303 404 L153 404 Z" fill="#c9c6f7" opacity=".6"/>
<path d="M150 450 L306 450 L310 482 L146 482 Z" fill="#c9c6f7" opacity=".35"/>
<rect x="210" y="444" width="36" height="58" rx="18" fill="#3b2f86"/>
<rect x="114" y="526" width="228" height="32" rx="16" fill="#2a2266"/>
<path d="M60 600 Q110 568 160 600" stroke="#2fb5c9" stroke-width="12" fill="none" stroke-linecap="round"/>
<path d="M300 600 Q350 568 400 600" stroke="#2fb5c9" stroke-width="12" fill="none" stroke-linecap="round"/>
<!-- casa -->
<ellipse cx="1000" cy="470" rx="230" ry="210" fill="url(#sc-glow)"/>
<rect x="912" y="420" width="176" height="148" fill="url(#sc-wall)"/>
<path d="M888 424 L1112 424 L1092 360 L908 360 Z" fill="url(#sc-tile)"/>
${tiles}
<rect x="884" y="420" width="232" height="10" rx="5" fill="#a63f20"/>
<!-- puerta -->
<rect x="930" y="452" width="56" height="116" rx="4" fill="#7c3f1d"/>
<rect x="938" y="462" width="17" height="40" rx="2" fill="#5b8bd6" opacity=".8"/><rect x="961" y="462" width="17" height="40" rx="2" fill="#5b8bd6" opacity=".8"/>
<circle cx="977" cy="520" r="3.5" fill="#fbbf24"/>
<!-- toldo + escaparate -->
<path d="M1002 448 L1086 448 L1094 474 L996 474 Z" fill="#ef4444"/>
${[0,1,2,3,4,5].map(i=>`<path d="M${1002+i*14} 448 L${1009+i*14} 448 L${1008+i*16} 474 L${999+i*16} 474 Z" fill="${i%2?"#22d3ee":"#ffffff"}" opacity="${i%2?.9:.95}"/>`).join("")}
<rect x="1004" y="480" width="78" height="54" rx="3" fill="url(#sc-glass)" stroke="#8b5a3c" stroke-width="5"/>
<path d="M1014 488 L1030 488 L1018 526 Z" fill="#ffffff" opacity=".18"/>
<rect x="1000" y="534" width="86" height="7" rx="3" fill="#8b5a3c"/>
<!-- planta -->
<path d="M1082 548 q-14 -30 -4 -52 q8 22 4 52 M1082 548 q10 -28 26 -38 q-6 26 -26 38 M1082 548 q-22 -14 -30 -30 q22 4 30 30" fill="#22c55e"/>
<path d="M1068 546 L1098 546 L1094 572 L1072 572 Z" fill="#c2502b"/>
<rect x="896" y="566" width="208" height="8" rx="4" fill="#1e1b4b" opacity=".6"/>
</svg>`;
};

// ───────── plantilla ─────────

const page = ({ w, h, eyebrow, title, visual, cta, layout, size = 96, mt = 70, note = "Escríbeme por WhatsApp" }) => `<!doctype html><html><head><meta charset="utf-8"><style>
${fontCss}
*{box-sizing:border-box;margin:0;padding:0}
:root{--ink:#0a0714;--fg:#f4f1fb;--mut:#a59fbd;--vio:#8b5cf6;--cy:#22d3ee;--line:rgba(255,255,255,.09)}
body{width:${w}px;height:${h}px;background:var(--ink);color:var(--fg);font-family:"SG",sans-serif;overflow:hidden;position:relative}
.bg{position:absolute;inset:0;
  background:
    radial-gradient(60% 55% at 85% 8%, rgba(139,92,246,.42), transparent 70%),
    radial-gradient(45% 40% at 5% 95%, rgba(34,211,238,.16), transparent 70%),
    linear-gradient(180deg,#0d0a1c,#08060f)}
.grid{position:absolute;inset:0;opacity:.35;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:60px 60px;mask-image:radial-gradient(70% 60% at 70% 30%,#000,transparent)}
.grain{position:absolute;inset:0;opacity:.07;mix-blend-mode:overlay;
  background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")}
.wrap{position:absolute;inset:0;padding:${layout === "wide" ? "64px 72px" : "72px 72px 64px"};display:flex;flex-direction:column}
.top{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:14px;font-weight:600;font-size:26px;letter-spacing:-.01em}
.brand svg{width:44px;height:44px}
.tag{font-size:18px;color:var(--mut);letter-spacing:.14em;text-transform:uppercase}
.eyebrow{display:inline-flex;align-items:center;gap:10px;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:var(--cy);font-weight:500}
.eyebrow:before{content:"";width:28px;height:2px;background:var(--cy)}
h1{font-weight:600;letter-spacing:-.035em;line-height:.98;margin-top:22px}
h1 em{font-family:"IS";font-style:italic;font-weight:400;letter-spacing:-.01em;
  background:linear-gradient(95deg,#c4b5fd,#22d3ee);-webkit-background-clip:text;color:transparent;padding-right:.08em}
.foot{display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--line);padding-top:26px;margin-top:auto}
.cta{display:inline-flex;align-items:center;gap:14px;padding:16px 26px;border-radius:999px;font-size:22px;font-weight:500;
  background:linear-gradient(95deg,rgba(139,92,246,.95),rgba(99,102,241,.95));box-shadow:0 10px 40px -10px rgba(139,92,246,.8)}
.cta b{font-weight:400;opacity:.85}
.site{font-size:20px;color:var(--mut)}
/* search */
.card{background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.12);
  border-radius:26px;backdrop-filter:blur(10px);box-shadow:0 30px 80px -30px rgba(0,0,0,.8)}
.search{padding:26px;width:100%}
.bar{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.95);color:#1f1b2e;border-radius:999px;padding:14px 22px;font-size:22px}
.bar .g{font-weight:700;color:#4f46e5}.bar .q{flex:1}.bar .mag{font-size:26px;color:#6b6780}
.res{display:flex;gap:18px;align-items:center;padding:20px 14px;border-radius:18px;margin-top:14px}
.rank{width:40px;height:40px;border-radius:12px;display:grid;place-items:center;font-weight:600;font-size:19px;background:rgba(255,255,255,.07);color:var(--mut);flex:none}
.hit{background:linear-gradient(95deg,rgba(139,92,246,.28),rgba(34,211,238,.10));border:1px solid rgba(196,181,253,.45);
  box-shadow:0 0 0 6px rgba(139,92,246,.10),0 20px 60px -20px rgba(139,92,246,.9)}
.hit .rank{background:var(--cy);color:#06121a}
.rt{font-size:27px;font-weight:600;letter-spacing:-.01em}
.rs{font-size:18px;color:#cfc8e6;margin-top:6px}.stars{color:#fbbf24;letter-spacing:2px}
.dim{opacity:.45}.ln{height:12px;border-radius:6px;background:rgba(255,255,255,.18);margin:7px 0}
.w70{width:340px}.w45{width:220px}.w60{width:290px}.w35{width:170px}
/* rings */
.rings{display:flex;gap:40px;justify-content:center;align-items:flex-end}
.rings{transform:scale(1.25)}
.ring{position:relative;width:230px;text-align:center}
.ring .track{fill:none;stroke:rgba(255,255,255,.08);stroke-width:16}
.ring .val{fill:none;stroke-width:16;stroke-linecap:round}
.ring.bad .val{stroke:#fb923c}.ring.good .val{stroke:url(#gg);stroke:#34d399}
.ring .num{position:absolute;top:0;left:0;width:230px;height:230px;display:grid;place-items:center;font-size:74px;font-weight:600;letter-spacing:-.04em}
.ring.bad .num{color:#fdba74}.ring.good .num{color:#6ee7b7}
.ring .lbl{margin-top:16px;font-size:20px;color:var(--mut);letter-spacing:.06em;text-transform:uppercase}
.ring.good{transform:scale(1.12);transform-origin:bottom center}
.vs{font-family:"IS";font-style:italic;font-size:40px;color:var(--mut);padding-bottom:120px}
</style></head><body>
<div class="bg"></div><div class="grid"></div><div class="grain"></div>
<div class="wrap">
  <div class="top"><div class="brand">${logo}<span>jorgecalleja.dev</span></div><div class="tag">Diseño web · Málaga</div></div>
  ${layout === "wide"
    ? `<div style="display:flex;gap:56px;align-items:center;flex:1;margin-top:10px">
         <div style="flex:1.05"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:78px">${title}</h1></div>
         <div style="flex:1">${visual}</div></div>`
    : `<div style="margin-top:${mt}px"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:${size}px">${title}</h1></div>
       <div style="flex:1;display:flex;align-items:center;justify-content:center">${visual}</div>`}
  <div class="foot"><div class="cta">${cta}</div><div class="site">${note}</div></div>
</div></body></html>`;

// ───────── piezas ─────────

const pieces = {
  "gb-2-oferta-auditoria": {
    out: "18-google-business/v2/gb-2-oferta-auditoria.jpg", w: 1200, h: 900, size: 70, mt: 36,
    eyebrow: "Visibilidad local",
    title: "Si tu negocio no se ve,<br><em>no existe.</em>",
    visual: scene({ w: 760, h: 424 }),
    note: "jorgecalleja.dev",
    cta: "Auditoría gratis en 24 h <b>→</b>",
  },
  "ig-visibilidad": {
    out: "01-posts-cuadrados/v2/anuncio-8-visibilidad.jpg", w: 1080, h: 1350, size: 100, mt: 64,
    eyebrow: "Visibilidad local",
    title: "Si tu negocio no se ve,<br><em>no existe.</em>",
    visual: scene({ w: 1000, h: 558 }),
    cta: "Hazte visible <b>→</b>",
  },
  "ig-lighthouse": {
    out: "01-posts-cuadrados/v2/anuncio-7-lighthouse-100.jpg", w: 1080, h: 1350,
    eyebrow: "Velocidad · Google Lighthouse",
    title: "Las plantillas se quedan en 60.<br><em>A medida, en 99.</em>",
    visual: `<div class="rings">${ring(58, "Plantilla", "bad")}<div class="vs">vs</div>${ring(99, "A medida", "good")}</div>`,
    cta: "Mide tu web gratis <b>→</b>",
  },
  "gb-search": {
    out: "18-google-business/v2/gb-9-google.jpg", w: 1200, h: 900, layout: "wide",
    eyebrow: "SEO local",
    title: "El primero que aparece <em>se lleva la llamada.</em>",
    visual: search("diseño web málaga", "Tu negocio"),
    cta: "Auditoría gratis en 24 h <b>→</b>",
    note: "jorgecalleja.dev",
  },
};

const ids = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(pieces);
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
for (const id of ids) {
  const p = pieces[id];
  const tab = await ctx.newPage();
  await tab.setViewportSize({ width: p.w, height: p.h });
  await tab.setContent(page(p), { waitUntil: "load" });
  await tab.evaluate(() => document.fonts.ready);
  const out = join(root, p.out);
  mkdirSync(dirname(out), { recursive: true });
  await tab.screenshot({ path: out, type: "jpeg", quality: 92 });
  console.log("✓", p.out);
  await tab.close();
}
await browser.close();
