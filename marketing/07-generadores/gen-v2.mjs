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

// Búsqueda donde tu negocio no aparece (lo encuentran a otro)
const searchLost = (query) => `
<div class="card search">
  <div class="bar"><span class="g">G</span><span class="q">${query}</span><span class="mag">⌕</span></div>
  ${["La competencia", "Otra empresa", "Una cadena"].map((n, i) => `
  <div class="res comp"><div class="rank">${i + 1}</div><div><div class="rt sm">${n}</div><div class="rs"><span class="stars">★★★★☆</span> Web · Llamar</div></div></div>`).join("")}
  <div class="lost"><span>Tu negocio</span><em>página 3</em></div>
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


const ICON_OK = `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const ICON_KO = `<svg viewBox="0 0 24 24" width="22" height="22"><path d="M7 7l10 10M17 7L7 17" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>`;

// Móvil: web bien hecha o rota
const phone = (state) => `
<div class="phone ${state}">
  <div class="notch"></div>
  <div class="scr">
    <div class="p-nav"><i></i><b></b><b></b><b></b></div>
    <div class="p-hero"><div class="ln p1"></div><div class="ln p2"></div><div class="ln p3"></div><div class="p-btn">Pedir cita</div></div>
    <div class="p-cards"><div></div><div></div></div>
    <div class="ln p2" style="margin-top:18px"></div><div class="ln p3"></div>
  </div>
  <div class="badge">${state === "good" ? ICON_OK + " Perfecta en móvil" : ICON_KO + " Hay que hacer zoom"}</div>
</div>`;
const phones = () => `<div class="phones">${phone("bad")}${phone("good")}</div>`;

// Carga lenta
const loader = () => `
<div class="card loader">
  <div class="url"><span class="dots"><i></i><i></i><i></i></span><span class="u">tunegocio.es</span></div>
  <div class="spin"></div>
  <div class="secs">8,4<small> s</small></div>
  <div class="prog"><div></div></div>
  <div class="cap">Cargando… <b>53 %</b> de las visitas se va antes de 3 s</div>
</div>`;

// Antes / después
const beforeAfter = () => {
  const row = (k, v, ok) => `<div class="ba-r"><span>${k}</span><b class="${ok ? "ok" : "ko"}">${ok ? ICON_OK : ICON_KO}${v}</b></div>`;
  return `<div class="ba">
  <div class="card ba-c"><div class="ba-h ko">Tu web hoy</div>${row("Carga", "8 s")}${row("Google", "pág. 7")}${row("Móvil", "botones rotos")}${row("Clientes", "0")}</div>
  <div class="card ba-c good"><div class="ba-h ok">En unas semanas</div>${row("Carga", "0,9 s", 1)}${row("Google", "pág. 1", 1)}${row("Móvil", "perfecta", 1)}${row("Lighthouse", "99/100", 1)}</div>
</div>`;
};

// Mensajes de clientes al despertar
const notifs = () => `
<div class="notifs">
  <div class="n-time">07:42</div><div class="n-date">martes, buenos días</div>
  ${[
    ["Laura M.", "Hola, te encontré en Google. ¿Tienes hueco esta semana?", "06:58"],
    ["Pedro · Reformas", "¿Me pasas presupuesto? Sin compromiso", "06:31"],
    ["Carmen R.", "Me encanta vuestra web. ¿Hacéis envíos?", "02:14"],
  ].map(([n, t, h]) => `<div class="card n"><div class="n-ic">${n[0]}</div><div class="n-b"><div class="n-n">${n}<span>${h}</span></div><div class="n-t">${t}</div></div></div>`).join("")}
</div>`;

// La factura silenciosa
const receipt = () => `
<div class="receipt">
  <div class="r-h">Factura silenciosa<span>cada mes</span></div>
  ${[["Visitas que no cargan", "−340 €"], ["Llamadas que no salen", "−280 €"], ["Formularios perdidos", "−120 €"], ["Clientes que se van a otro", "−560 €"]]
    .map(([k, v]) => `<div class="r-r"><span>${k}</span><b>${v}</b></div>`).join("")}
  <div class="r-t"><span>Total</span><b>−1.300 €</b></div>
  <div class="r-f">Ejemplo orientativo · te calculo el tuyo gratis</div>
</div>`;

// Proyecto real en un navegador
const shot = (img, url) => `
<div class="card browser">
  <div class="url"><span class="dots"><i></i><i></i><i></i></span><span class="u">${url}</span></div>
  <img src="data:image/webp;base64,${readFileSync(join(root, "..", "public", "images", img)).toString("base64")}">
</div>`;

// Contactos al mes subiendo
const chart = () => {
  const pts = [3, 4, 4, 7, 9, 14, 18, 27];
  const W = 460, H = 230, x = (i) => 20 + i * ((W - 40) / (pts.length - 1)), y = (v) => H - 20 - (v / 30) * (H - 40);
  const d = pts.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  return `<div class="card chart">
  <div class="c-h"><span>Contactos desde la web</span><b>+800 %</b></div>
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".35"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></linearGradient>
    <linearGradient id="ln" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8b5cf6"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs>
    ${[0, 1, 2, 3].map((i) => `<line x1="0" x2="${W}" y1="${20 + i * 63}" y2="${20 + i * 63}" stroke="rgba(255,255,255,.07)"/>`).join("")}
    <path d="${d} L${x(pts.length - 1)} ${H} L${x(0)} ${H} Z" fill="url(#ar)"/>
    <path d="${d}" fill="none" stroke="url(#ln)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${x(pts.length - 1)}" cy="${y(27)}" r="9" fill="#22d3ee"/><circle cx="${x(pts.length - 1)}" cy="${y(27)}" r="20" fill="#22d3ee" opacity=".2"/>
  </svg>
  <div class="c-x"><span>Antes</span><span>Web nueva</span><span>8 meses</span></div>
</div>`;
};

// Checklist de la web del Kit Digital
const kit = () => `
<div class="card kit">
  <div class="k-h">Tu web del Kit Digital</div>
  ${["Estructura para Google", "Velocidad", "Funciona en el móvil", "Textos que venden"].map((t) => `<div class="k-r"><span>${t}</span><b class="ko">${ICON_KO}</b></div>`).join("")}
  <div class="k-f">${ICON_OK} Se rescata, sin empezar de cero</div>
</div>`;

// Portada del carrusel: índice de motivos
const motivos = () => `<div class="mot">${["No funciona en el móvil", "Tarda demasiado en cargar", "En Google no aparece"]
  .map((t, i) => `<div class="mot-r"><b>0${i + 1}</b><span>${t}</span></div>`).join("")}</div>`;

// Web abandonada: cero contactos
const flat = () => `
<div class="card chart">
  <div class="c-h"><span>Contactos desde la web</span><b class="zero">0</b></div>
  <svg width="460" height="200" viewBox="0 0 460 200">
    ${[0, 1, 2].map((i) => `<line x1="0" x2="460" y1="${30 + i * 60}" y2="${30 + i * 60}" stroke="rgba(255,255,255,.07)"/>`).join("")}
    <path d="M20 180 L440 180" stroke="#fb923c" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 14"/>
  </svg>
  <div class="c-x"><span>Entregada</span><span>6 meses</span><span>14 meses</span></div>
</div>`;

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

const page = ({ w, h, eyebrow, title, visual, cta, layout, size = 96, mt = 70, note = "Escríbeme por WhatsApp", z }) => `<!doctype html><html><head><meta charset="utf-8"><style>
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
.search{padding:26px;width:520px}
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
.ring{position:relative;width:230px;text-align:center}
.ring .track{fill:none;stroke:rgba(255,255,255,.08);stroke-width:16}
.ring .val{fill:none;stroke-width:16;stroke-linecap:round}
.ring.bad .val{stroke:#fb923c}.ring.good .val{stroke:url(#gg);stroke:#34d399}
.ring .num{position:absolute;top:0;left:0;width:230px;height:230px;display:grid;place-items:center;font-size:74px;font-weight:600;letter-spacing:-.04em}
.ring.bad .num{color:#fdba74}.ring.good .num{color:#6ee7b7}
.ring .lbl{margin-top:16px;font-size:20px;color:var(--mut);letter-spacing:.06em;text-transform:uppercase}
.ring.good{transform:scale(1.12);transform-origin:bottom center}
.vs{font-family:"IS";font-style:italic;font-size:40px;color:var(--mut);padding-bottom:120px}

.rt.sm{font-size:22px}
.comp{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03)}
.lost{margin-top:18px;display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-radius:16px;border:1px dashed rgba(251,146,60,.6);color:#fdba74;font-size:21px}
.lost em{font-style:normal;font-size:16px;letter-spacing:.12em;text-transform:uppercase;background:rgba(251,146,60,.15);padding:6px 12px;border-radius:999px}
/* phone */
.phones{display:flex;gap:34px;align-items:flex-end}
.phone{position:relative;width:250px;height:500px;border-radius:44px;padding:14px;background:#14102a;border:2px solid rgba(255,255,255,.14);box-shadow:0 40px 90px -30px rgba(0,0,0,.9),inset 0 0 0 6px #0b0818}
.notch{position:absolute;top:22px;left:50%;transform:translateX(-50%);width:80px;height:20px;border-radius:12px;background:#000;z-index:2}
.scr{height:100%;border-radius:32px;background:linear-gradient(180deg,#f5f3ff,#e9e5fb);padding:52px 18px 18px;overflow:hidden}
.p-nav{display:flex;gap:8px;align-items:center}.p-nav i{width:26px;height:26px;border-radius:8px;background:#8b5cf6}.p-nav b{height:8px;flex:1;border-radius:4px;background:#cfc8ea}
.p-hero{margin-top:22px;padding:18px;border-radius:18px;background:linear-gradient(135deg,#7c3aed,#4f46e5)}
.scr .ln{background:rgba(255,255,255,.75);height:11px}.p1{width:85%}.p2{width:65%}.p3{width:45%}
.scr>.ln{background:#cfc8ea}
.p-btn{margin-top:14px;display:inline-block;background:#22d3ee;color:#06121a;font-size:14px;font-weight:600;padding:9px 16px;border-radius:999px}
.p-cards{display:flex;gap:10px;margin-top:16px}.p-cards div{flex:1;height:80px;border-radius:14px;background:#fff;box-shadow:0 6px 16px -8px rgba(60,40,120,.3)}
.badge{position:absolute;left:50%;bottom:-22px;transform:translateX(-50%);white-space:nowrap;display:flex;gap:8px;align-items:center;padding:10px 16px;border-radius:999px;font-size:17px;font-weight:600}
.phone.good .badge{background:#34d399;color:#04201a}.phone.bad .badge{background:#fb923c;color:#2a1104}
.phone.bad{transform:rotate(-4deg);opacity:.92}
.phone.bad .p-hero{transform:translateX(46px) rotate(3deg);width:290px}
.phone.bad .p-btn{transform:translate(120px,8px)}
.phone.bad .p-cards div:first-child{transform:translate(-30px,20px) rotate(-6deg)}
.phone.bad .p-nav{transform:translateX(30px)}
.phone.good{box-shadow:0 0 0 1px rgba(52,211,153,.4),0 40px 100px -30px rgba(52,211,153,.45)}
/* loader */
.loader{width:520px;padding:26px 30px 30px;text-align:center}
.url{display:flex;align-items:center;gap:16px;background:rgba(255,255,255,.06);border-radius:12px;padding:10px 14px;font-size:17px;color:var(--mut)}
.dots{display:flex;gap:7px}.dots i{width:11px;height:11px;border-radius:50%;background:rgba(255,255,255,.25)}
.url .u{flex:1;text-align:left}
.spin{width:66px;height:66px;margin:34px auto 6px;border-radius:50%;border:6px solid rgba(255,255,255,.1);border-top-color:#fb923c}
.secs{font-size:120px;font-weight:600;letter-spacing:-.05em;color:#fdba74;line-height:1}.secs small{font-size:46px;color:var(--mut)}
.prog{height:12px;border-radius:6px;background:rgba(255,255,255,.08);margin:24px 0 16px;overflow:hidden}.prog div{width:28%;height:100%;background:linear-gradient(90deg,#fb923c,#fbbf24)}
.cap{font-size:19px;color:var(--mut)}.cap b{color:#fff}
/* before/after */
.ba{display:flex;gap:18px}.ba-c{width:255px;padding:24px}
.ba-c.good{border-color:rgba(52,211,153,.45);box-shadow:0 30px 80px -30px rgba(52,211,153,.45)}
.ba-h{font-size:15px;letter-spacing:.14em;text-transform:uppercase;font-weight:600;margin-bottom:12px}
.ok{color:#6ee7b7}.ko{color:#fdba74}
.ba-r{padding:13px 0;border-top:1px solid rgba(255,255,255,.08)}
.ba-r span{display:block;font-size:15px;color:var(--mut)}
.ba-r b{display:flex;align-items:center;gap:6px;font-size:23px;font-weight:600;margin-top:2px}
/* notifs */
.notifs{width:520px;text-align:center}
.n-time{font-size:110px;font-weight:300;letter-spacing:-.05em;line-height:1}.n-date{font-size:20px;color:var(--mut);margin:6px 0 26px}
.n{display:flex;gap:16px;text-align:left;padding:18px 20px;margin-top:12px;border-radius:22px}
.n-ic{width:48px;height:48px;border-radius:14px;flex:none;display:grid;place-items:center;font-weight:600;font-size:20px;background:#25D366;color:#04210f}
.n-n{font-weight:600;font-size:19px;display:flex;justify-content:space-between}.n-n span{font-weight:400;color:var(--mut);font-size:16px}
.n-t{font-size:18px;color:#d9d3ee;margin-top:4px;line-height:1.3}
/* receipt */
.receipt{width:460px;background:#f6f3ec;color:#1a1626;border-radius:6px;padding:32px 34px 26px;transform:rotate(-2.5deg);
  box-shadow:0 40px 90px -30px rgba(0,0,0,.9);font-family:"SG";
  -webkit-mask:radial-gradient(circle 9px at 50% 100%,#0000 98%,#000) 0 0/26px 100% repeat-x}
.r-h{font-size:26px;font-weight:700;letter-spacing:-.02em;display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px dashed #cfc7b6;padding-bottom:16px}
.r-h span{font-size:14px;letter-spacing:.14em;text-transform:uppercase;color:#7a7266;font-weight:500}
.r-r{display:flex;justify-content:space-between;padding:12px 0;font-size:18px;border-bottom:1px dotted #d8d0bf}.r-r b{color:#c2410c}
.r-t{display:flex;justify-content:space-between;padding-top:16px;font-size:30px;font-weight:700}.r-t b{color:#c2410c}
.r-f{margin-top:14px;font-size:13px;color:#7a7266;letter-spacing:.06em;text-transform:uppercase;padding-bottom:12px}
/* browser */
.browser{width:540px;padding:12px;transform:perspective(1400px) rotateY(-8deg)}
.browser img{display:block;width:100%;border-radius:12px;margin-top:10px}
/* chart */
.chart{width:520px;padding:26px 30px}
.c-h{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:14px}.c-h span{font-size:18px;color:var(--mut)}
.c-h b{font-size:44px;font-weight:600;letter-spacing:-.03em;color:#6ee7b7}.c-h b.zero{color:#fdba74;font-size:64px}
.c-x{display:flex;justify-content:space-between;font-size:15px;color:var(--mut);margin-top:8px;letter-spacing:.06em;text-transform:uppercase}
.mot{width:936px}.mot-r{display:flex;align-items:baseline;gap:28px;padding:26px 0;border-top:1px solid rgba(255,255,255,.1);font-size:40px;font-weight:500;letter-spacing:-.02em}
.mot-r b{font-family:"IS";font-style:italic;font-weight:400;font-size:46px;color:var(--cy)}
/* kit */
.kit{width:500px;padding:28px 30px}
.k-h{font-size:24px;font-weight:600;margin-bottom:12px}
.k-r{display:flex;justify-content:space-between;align-items:center;padding:15px 0;border-top:1px solid rgba(255,255,255,.08);font-size:21px;color:#d9d3ee}
.k-r b{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;background:rgba(251,146,60,.14)}
.k-f{margin-top:16px;display:flex;align-items:center;gap:10px;padding:14px 18px;border-radius:14px;background:rgba(52,211,153,.14);color:#6ee7b7;font-weight:600;font-size:19px}
</style></head><body>
<div class="bg"></div><div class="grid"></div><div class="grain"></div>
<div class="wrap">
  <div class="top"><div class="brand">${logo}<span>jorgecalleja.dev</span></div><div class="tag">Diseño web · Málaga</div></div>
  ${layout === "wide"
    ? `<div style="display:flex;gap:56px;align-items:center;flex:1;margin-top:10px">
         <div style="flex:1.05"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:${size === 96 ? 72 : size}px">${title}</h1></div>
         <div style="flex:1;display:flex;justify-content:center"><div style="zoom:${z ?? 1}">${visual}</div></div></div>`
    : `<div style="margin-top:${mt}px"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:${size}px">${title}</h1></div>
       <div style="flex:1;display:flex;align-items:center;justify-content:center"><div style="zoom:${z ?? 1}">${visual}</div></div>`}
  <div class="foot"><div class="cta">${cta}</div><div class="site">${note}</div></div>
</div></body></html>`;

// ───────── piezas ─────────

const GB = { w: 1200, h: 900, layout: "wide", size: 66, cta: "Auditoría gratis en 24 h <b>→</b>", note: "jorgecalleja.dev" };
const IG = { w: 1080, h: 1350, size: 92, mt: 64, z: 1.6 };
const gb = (name, o) => ({ ...GB, out: `18-google-business/v2/${name}.jpg`, ...o });
const ig = (dir, name, o) => ({ ...IG, out: `${dir}/v2/${name}.jpg`, ...o });

const pieces = {
  // ── Google Business (1200×900) ──
  "gb-2": gb("gb-2-oferta-auditoria", { layout: "stack", size: 70, mt: 36, eyebrow: "Visibilidad local",
    title: "Si tu negocio no se ve,<br><em>no existe.</em>", visual: scene({ w: 760, h: 424 }) }),
  "gb-3": gb("gb-3-kit-digital", { eyebrow: "Kit Digital", title: "Tu web del Kit Digital <em>se puede rescatar.</em>", visual: kit() }),
  "gb-4": gb("gb-4-antes-despues", { eyebrow: "Antes y después", title: "Tener web no es <em>tener una web que vende.</em>", visual: beforeAfter() }),
  "gb-5": gb("gb-5-movil", { eyebrow: "Móvil", title: "7 de cada 10 clientes <em>te miran desde el móvil.</em>", visual: phones(), z: 0.82 }),
  "gb-6": gb("gb-6-proyecto-malaga", { eyebrow: "Proyecto real · Málaga", title: "Webs pensadas <em>para conseguir reservas.</em>", visual: shot("malaga-premium-transfers.webp", "malagapremiumtransfers.com"), z: 0.92 }),
  "gb-7": gb("gb-7-velocidad", { eyebrow: "Velocidad · Lighthouse", title: "Las plantillas se quedan en 60. <em>A medida, en 99.</em>", visual: `<div class="rings">${ring(58, "Plantilla", "bad")}<div class="vs">vs</div>${ring(99, "A medida", "good")}</div>`, z: 0.85 }),
  "gb-8": gb("gb-8-clientes", { eyebrow: "Resultados", title: "Más clientes, <em>menos perseguir.</em>", visual: chart() }),
  "gb-9": gb("gb-9-google", { eyebrow: "SEO local", title: "El primero que aparece <em>se lleva la llamada.</em>", visual: search("diseño web málaga", "Tu negocio") }),
  "gb-10": gb("gb-10-perdidas", { eyebrow: "Lo que cuesta una web mala", title: "Una web que falla <em>también pasa factura.</em>", visual: receipt() }),
  "gb-11": gb("gb-11-invisible", { eyebrow: "SEO local", title: "Te buscan en Google… <em>y encuentran a otro.</em>", visual: searchLost("fontanero málaga") }),
  "gb-12": gb("gb-12-mensajes", { eyebrow: "Una web que capta sola", title: "Despiertas y ya <em>tienes mensajes.</em>", visual: notifs(), z: 0.78 }),
  "gb-13": gb("gb-13-proyecto-abogada", { eyebrow: "Proyecto real · Abogados", title: "Una web seria <em>genera confianza.</em>", visual: shot("ana.webp", "anarodriguezabogados.vercel.app"), z: 0.92 }),
  "gb-14": gb("gb-14-lenta", { eyebrow: "Velocidad", title: "Más de 3 segundos <em>y ya se han ido.</em>", visual: loader() }),

  // ── Instagram feed (1080×1350) ──
  "ig-foto-1": ig("01-posts-cuadrados", "foto-1-abandonada", { eyebrow: "Kit Digital", title: "Te entregaron la web <em>y ahí se quedó.</em>", visual: flat(), cta: "Te digo qué le pasa <b>→</b>" }),
  "ig-foto-2": ig("01-posts-cuadrados", "foto-2-invisible", { eyebrow: "SEO local", title: "Tu cliente te busca <em>y encuentra a otro.</em>", visual: searchLost("peluquería málaga"), z: 1.35, cta: "Quiero aparecer <b>→</b>" }),
  "ig-foto-3": ig("01-posts-cuadrados", "foto-3-movil", { eyebrow: "Móvil", title: "Desde el móvil, <em>nada funciona.</em>", visual: phone("bad"), z: 1.25, cta: "Revisa la tuya gratis <b>→</b>" }),
  "ig-foto-4": ig("01-posts-cuadrados", "foto-4-lenta", { eyebrow: "Velocidad", title: "Tarda tanto <em>que ya se han ido.</em>", visual: loader(), cta: "Mide tu web gratis <b>→</b>" }),
  "ig-sol-1": ig("01-posts-cuadrados", "sol-1-funciona", { eyebrow: "Así se ve", title: "Una web que sí <em>trabaja para ti.</em>", visual: phone("good"), z: 1.25, cta: "La quiero así <b>→</b>" }),
  "ig-sol-2": ig("01-posts-cuadrados", "sol-2-mensajes", { eyebrow: "Una web que capta sola", title: "Despiertas y ya <em>tienes mensajes.</em>", visual: notifs(), z: 1.3, cta: "Quiero eso <b>→</b>" }),
  "ig-sol-3": ig("01-posts-cuadrados", "sol-3-google", { eyebrow: "SEO local", title: "El primero que ve <em>tu cliente: tú.</em>", visual: search("diseño web málaga", "Tu negocio"), cta: "Quiero salir arriba <b>→</b>" }),
  "ig-sol-4": ig("01-posts-cuadrados", "sol-4-clientes", { eyebrow: "Resultados", title: "Más clientes <em>en tu puerta.</em>", visual: chart(), cta: "Hablamos <b>→</b>" }),
  "ig-anuncio-5": ig("01-posts-cuadrados", "anuncio-5-ticket-perdidas", { eyebrow: "Lo que cuesta una web mala", title: "Una web que falla <em>también pasa factura.</em>", visual: receipt(), z: 1.5, cta: "Calcula la tuya gratis <b>→</b>" }),
  "ig-anuncio-6": ig("01-posts-cuadrados", "anuncio-6-antes-despues", { eyebrow: "Antes y después", title: "Tener web vs. <em>una web que vende.</em>", visual: beforeAfter(), cta: "Te enseño la tuya <b>→</b>" }),
  "ig-anuncio-7": ig("01-posts-cuadrados", "anuncio-7-lighthouse-100", { eyebrow: "Velocidad · Google Lighthouse", title: "Las plantillas se quedan en 60.<br><em>A medida, en 99.</em>", visual: `<div class="rings">${ring(58, "Plantilla", "bad")}<div class="vs">vs</div>${ring(99, "A medida", "good")}</div>`, z: 1.4, cta: "Mide tu web gratis <b>→</b>" }),
  "ig-anuncio-8": ig("01-posts-cuadrados", "anuncio-8-visibilidad", { eyebrow: "Visibilidad local", title: "Si tu negocio no se ve,<br><em>no existe.</em>", visual: scene({ w: 1000, h: 558 }), z: 1, size: 90, cta: "Hazte visible <b>→</b>" }),

  // ── Carrusel (1080×1350) ──
  "car-0": ig("04-carrusel", "slide-0", { eyebrow: "Guía rápida", size: 124, mt: 150, title: "3 motivos por los que tu web <em>no te trae clientes.</em>", visual: motivos(), z: 1, cta: "Desliza <b>→</b>", note: "1 / 5" }),
  "car-1": ig("04-carrusel", "slide-1", { eyebrow: "Motivo 1", title: "No funciona <em>en el móvil.</em>", visual: phone("bad"), z: 1.25, cta: "Desliza <b>→</b>", note: "2 / 5" }),
  "car-2": ig("04-carrusel", "slide-2", { eyebrow: "Motivo 2", title: "Tarda tanto <em>que se van.</em>", visual: loader(), cta: "Desliza <b>→</b>", note: "3 / 5" }),
  "car-3": ig("04-carrusel", "slide-3", { eyebrow: "Motivo 3", title: "En Google <em>no aparece.</em>", visual: searchLost("tu servicio + málaga"), z: 1.35, cta: "Desliza <b>→</b>", note: "4 / 5" }),
  "car-4": ig("04-carrusel", "slide-4", { eyebrow: "La buena noticia", title: "Los tres <em>tienen arreglo.</em>", visual: scene({ w: 1000, h: 558 }), z: 1, cta: "Escríbeme por WhatsApp <b>→</b>", note: "Auditoría gratis en 24 h" }),
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
