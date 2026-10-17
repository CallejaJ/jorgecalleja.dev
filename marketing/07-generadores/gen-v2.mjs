// Generador v2 — estética renovada (oscuro editorial, Space Grotesk + Instrument Serif).
// Uso: node marketing/07-generadores/gen-v2.mjs [id ...]
// Requiere playwright (global en el entorno) y las fuentes de ./fonts.
import { createRequire } from "node:module";
import { readFileSync, mkdirSync, mkdtempSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { execFileSync } from "node:child_process";
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

// Imagen embebida: ruta en public/images, o "m:" + ruta dentro de marketing/
const img64 = (p) => {
  const file = p.startsWith("m:") ? join(root, p.slice(2)) : join(root, "..", "public", "images", p);
  const ext = p.split(".").pop().toLowerCase();
  return `data:image/${ext === "jpg" ? "jpeg" : ext};base64,${readFileSync(file).toString("base64")}`;
};

// Proyecto real en un navegador
const shot = (img, url, flat = false) => `
<div class="card browser${flat ? " flat" : ""}">
  <div class="url"><span class="dots"><i></i><i></i><i></i></span><span class="u">${url}</span></div>
  <img src="${img64(img)}">
</div>`;

const tone = (v) => (v < 50 ? "bad" : v < 90 ? "mid" : "good");
const scores = (arr) => `<div class="rings">${arr.map(([v, l]) => ring(v, l, tone(v))).join("")}</div>`;

// Opinión de cliente
const quote = (t, n, r) => `
<div class="card quote">
  <div class="q-m">“</div><div class="stars q-s">★★★★★</div>
  <p>${t}</p>
  <div class="q-a"><div class="q-av">${n.split(" ").map((x) => x[0]).join("")}</div><div><b>${n}</b><span>${r}</span></div></div>
</div>`;

// Lista con ✓ / ✗
const checks = ({ title, items, ok, foot }) => `
<div class="card kit">${title ? `<div class="k-h">${title}</div>` : ""}
  ${items.map((t) => `<div class="k-r"><span>${t}</span><b class="${ok ? "ok" : "ko"}"${ok ? ' style="background:rgba(52,211,153,.14)"' : ""}>${ok ? ICON_OK : ICON_KO}</b></div>`).join("")}
  ${foot ? `<div class="k-f">${ICON_OK} ${foot}</div>` : ""}
</div>`;

const IC = {
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/>',
  music: '<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
  home: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',
  star: '<path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9z"/>',
  tag: '<path d="M3 12V4a1 1 0 011-1h8l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M6 6.5h.01M8.5 6.5h.01"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M10 9l5 3-5 3z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M21 16l-5-5-9 9"/>',
  bag: '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 016 0v2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
};
const icon = (k, s = 40) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${IC[k]}</svg>`;

// Rejilla de secciones de una web
const grid6 = (labels) => `<div class="g6">${["music", "video", "calendar", "image", "bag", "mail"]
  .map((k, i) => `<div class="card g6-t">${icon(k, 46)}<span>${labels[i]}</span></div>`).join("")}</div>`;

// Plataformas desperdigadas
const scatter = (labels) => {
  const pos = [[20, 30, -8], [400, 0, 6], [170, 150, -3], [500, 170, 9], [10, 290, 5], [320, 320, -7], [540, 420, 4], [100, 450, -5]];
  return `<div class="scat">${labels.map((l, i) => `<div class="chip" style="left:${pos[i][0]}px;top:${pos[i][1]}px;transform:rotate(${pos[i][2]}deg)">${l}</div>`).join("")}</div>`;
};

const price = (pre, amount) => `<div class="price"><span>${pre}</span><b>${amount}</b></div>`;
const bigNum = (n) => `<div class="bignum">${n}</div>`;
const stars = (t) => `<div class="card" style="padding:44px 64px;text-align:center"><div class="stars" style="font-size:84px;letter-spacing:8px">★★★★★</div><div style="font-size:28px;color:var(--mut);margin-top:10px">${t}</div></div>`;

// Portada de destacado
const hl = (k, label, sub) => `<div class="hl"><div class="hl-c">${icon(k, 210)}</div><div class="hl-l">${label}</div>${sub ? `<div class="hl-s">${sub}</div>` : ""}</div>`;
const bigLogo = (s) => `<div class="biglogo" style="width:${s}px;height:${s}px">${logo}</div>`;

// Captura de proyecto a pantalla completa con su nombre
const showcase = (img, url, name) => `<div style="text-align:center;width:1180px">${shot(img, url, true)}<div class="sc-n">${name}</div></div>`;

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

// Avatar de marca: el faro del banner, centrado y con los dos haces (pensado para recorte circular)
const avatar = (s = 720) => {
  seed = 11;
  const st = Array.from({ length: 46 }, () => {
    const x = rnd() * 720, y = rnd() * 520, r = 0.8 + rnd() * 2.2, o = 0.25 + rnd() * 0.6;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${rnd() > 0.7 ? "#22d3ee" : "#ffffff"}" opacity="${o.toFixed(2)}"/>`;
  }).join("");
  return `<svg viewBox="0 0 720 720" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg" style="display:block">
<defs>
  <radialGradient id="av-bg" cx=".5" cy=".38" r=".75"><stop offset="0" stop-color="#2a1a5e"/><stop offset=".55" stop-color="#140d2e"/><stop offset="1" stop-color="#08060f"/></radialGradient>
  <radialGradient id="av-halo" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5eead4" stop-opacity=".75"/><stop offset=".35" stop-color="#22d3ee" stop-opacity=".25"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>
  <linearGradient id="av-bl" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#5eead4" stop-opacity=".9"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></linearGradient>
  <linearGradient id="av-br" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5eead4" stop-opacity=".9"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></linearGradient>
  <linearGradient id="av-tower" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4f7cf7"/><stop offset="1" stop-color="#8b3ff0"/></linearGradient>
  <linearGradient id="av-roof" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5b7cf6"/><stop offset="1" stop-color="#8b3ff0"/></linearGradient>
  <filter id="av-blur" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="7"/></filter>
</defs>
<rect width="720" height="720" fill="url(#av-bg)"/>
${st}
<g transform="translate(155 78) scale(.9)">
  <polygon points="228,150 -140,70 -140,250" fill="url(#av-bl)" filter="url(#av-blur)" opacity=".7"/>
  <polygon points="228,152 -140,96 -140,224" fill="url(#av-bl)" opacity=".6"/>
  <polygon points="228,150 596,70 596,250" fill="url(#av-br)" filter="url(#av-blur)" opacity=".7"/>
  <polygon points="228,152 596,96 596,224" fill="url(#av-br)" opacity=".6"/>
  <circle cx="228" cy="159" r="120" fill="url(#av-halo)"/>
  <path d="M150 120 L228 46 L306 120 Z" fill="url(#av-roof)"/>
  <rect x="172" y="120" width="112" height="78" rx="14" fill="#1a1440"/>
  <circle cx="228" cy="159" r="27" fill="#5eead4"/><circle cx="228" cy="159" r="42" fill="#5eead4" opacity=".28"/>
  <rect x="150" y="196" width="156" height="20" rx="10" fill="#3b2f86"/>
  <path d="M172 216 L284 216 L318 532 L138 532 Z" fill="url(#av-tower)"/>
  <path d="M168 262 L288 262 L293 306 L163 306 Z" fill="#c9c6f7" opacity=".75"/>
  <path d="M158 360 L298 360 L303 404 L153 404 Z" fill="#c9c6f7" opacity=".6"/>
  <path d="M150 450 L306 450 L310 482 L146 482 Z" fill="#c9c6f7" opacity=".35"/>
  <rect x="210" y="444" width="36" height="58" rx="18" fill="#3b2f86"/>
  <rect x="114" y="526" width="228" height="32" rx="16" fill="#2a2266"/>
  <path d="M40 596 Q90 566 140 596" stroke="#2fb5c9" stroke-width="12" fill="none" stroke-linecap="round"/>
  <path d="M316 596 Q366 566 416 596" stroke="#2fb5c9" stroke-width="12" fill="none" stroke-linecap="round"/>
</g>
</svg>`;
};

// ───────── plantilla ─────────

const page = ({ w, h, eyebrow, title, visual = "", cta, layout, size = 96, mt = 70, note = "Escríbeme por WhatsApp", z, sub, photo, pad, tag = "Diseño web · Málaga" }) => `<!doctype html><html><head><meta charset="utf-8"><style>
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
.wrap{position:absolute;inset:0;padding:${pad ?? (layout === "wide" ? "64px 72px" : "72px 72px 64px")};display:flex;flex-direction:column}
.photo{position:absolute;inset:0;background:url(${photo ? img64(photo) : ""}) center/cover;filter:saturate(.55) contrast(1.05) brightness(.8)}
.tint{position:absolute;inset:0;background:#4c1d95;mix-blend-mode:color;opacity:.45}
.shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,7,20,.7) 0%,rgba(10,7,20,.1) 22%,rgba(10,7,20,.25) 45%,rgba(10,7,20,.88) 68%,#0a0714 86%)}
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
.sub{color:#cfc8e6;line-height:1.35;margin-top:26px;max-width:920px;letter-spacing:-.005em}
.ring.mid .val{stroke:#fbbf24}.ring.mid .num{color:#fcd34d}
.browser.flat{transform:none;width:1180px}
.sc-n{margin-top:34px;font-size:40px;font-weight:600;letter-spacing:-.02em}
.quote{width:780px;padding:56px 56px 44px;position:relative}
.q-m{position:absolute;top:-34px;right:44px;font-family:"IS";font-size:230px;line-height:1;color:var(--cy);opacity:.55}
.q-s{font-size:34px}
.quote p{font-size:37px;line-height:1.35;margin:24px 0 34px;letter-spacing:-.01em}
.q-a{display:flex;gap:18px;align-items:center;border-top:1px solid var(--line);padding-top:28px}
.q-av{width:64px;height:64px;border-radius:50%;display:grid;place-items:center;font-weight:600;font-size:24px;background:linear-gradient(135deg,#8b5cf6,#22d3ee)}
.q-a b{display:block;font-size:26px;font-weight:600}.q-a span{font-size:20px;color:var(--mut)}
.g6{display:grid;grid-template-columns:repeat(3,200px);gap:18px}
.g6-t{height:170px;display:flex;flex-direction:column;justify-content:space-between;padding:26px;color:var(--cy)}
.g6-t span{color:var(--fg);font-size:25px;font-weight:500}
.scat{position:relative;width:780px;height:530px}
.chip{position:absolute;padding:18px 30px;border-radius:999px;font-size:30px;font-weight:500;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);white-space:nowrap;box-shadow:0 20px 50px -20px rgba(0,0,0,.8)}
.chip:nth-child(3n+1){border-color:rgba(34,211,238,.5);color:#a5f3fc}.chip:nth-child(3n+2){border-color:rgba(196,181,253,.5);color:#ddd6fe}
.price{display:flex;flex-direction:column;align-items:center;padding:44px 80px 50px;border-radius:44px;border:1px solid rgba(196,181,253,.45);
  background:linear-gradient(135deg,rgba(139,92,246,.32),rgba(34,211,238,.1));box-shadow:0 30px 110px -30px rgba(139,92,246,.95)}
.price span{font-size:26px;letter-spacing:.16em;text-transform:uppercase;color:var(--mut)}
.price b{font-size:150px;font-weight:600;letter-spacing:-.05em;line-height:1.05;background:linear-gradient(95deg,#fff,#c4b5fd 50%,#22d3ee);-webkit-background-clip:text;color:transparent}
.bignum{font-family:"IS";font-style:italic;font-size:560px;line-height:.85;padding:0 .12em;background:linear-gradient(160deg,#c4b5fd,#22d3ee);-webkit-background-clip:text;color:transparent;filter:drop-shadow(0 30px 80px rgba(139,92,246,.55))}
.hl{display:flex;flex-direction:column;align-items:center;text-align:center}
.hl-c{width:430px;height:430px;border-radius:50%;display:grid;place-items:center;color:#fff;
  background:radial-gradient(circle at 30% 25%,rgba(139,92,246,.6),rgba(34,211,238,.12) 72%);border:2px solid rgba(196,181,253,.5);
  box-shadow:0 0 0 20px rgba(139,92,246,.08),0 40px 120px -30px rgba(139,92,246,.95)}
.hl-c svg{filter:drop-shadow(0 0 26px rgba(34,211,238,.7))}
.hl-l{margin-top:54px;font-size:78px;font-weight:600;letter-spacing:-.03em}
.hl-s{font-family:"IS";font-style:italic;font-size:56px;margin-top:4px;background:linear-gradient(95deg,#c4b5fd,#22d3ee);-webkit-background-clip:text;color:transparent}
.biglogo svg{width:100%;height:100%;filter:drop-shadow(0 0 70px rgba(34,211,238,.35))}
.bs{position:relative}.bs-t{position:absolute;left:470px;right:40px;top:70px}
.bs-t h1{font-size:84px;margin-top:14px}
</style></head><body>
<div class="bg"></div><div class="grid"></div>${photo ? `<div class="photo"></div><div class="tint"></div><div class="shade"></div>` : ""}<div class="grain"></div>
${layout === "cover" ? `<div class="wrap" style="padding:0;align-items:center;justify-content:center"><div style="zoom:${z ?? 1}">${visual}</div></div>` : `
<div class="wrap">
  <div class="top"><div class="brand">${logo}<span>jorgecalleja.dev</span></div><div class="tag">${tag}</div></div>
  ${layout === "bottom"
    ? `<div style="flex:1;display:flex;align-items:center;justify-content:center"><div style="zoom:${z ?? 1}">${visual}</div></div>
       <div style="margin-bottom:${mt}px"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:${size}px">${title}</h1>${sub ? `<p class="sub" style="font-size:${Math.max(26, Math.round(size * 0.32))}px">${sub}</p>` : ""}</div>`
    : layout === "wide"
    ? `<div style="display:flex;gap:56px;align-items:center;flex:1;margin-top:10px">
         <div style="flex:1.05"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:${size === 96 ? 72 : size}px">${title}</h1>${sub ? `<p class="sub" style="font-size:26px">${sub}</p>` : ""}</div>
         <div style="flex:1;display:flex;justify-content:center"><div style="zoom:${z ?? 1}">${visual}</div></div></div>`
    : `<div style="margin-top:${mt}px"><div class="eyebrow">${eyebrow}</div><h1 style="font-size:${size}px">${title}</h1>${sub ? `<p class="sub" style="font-size:${Math.max(26, Math.round(size * 0.32))}px">${sub}</p>` : ""}</div>
       <div style="flex:1;display:flex;align-items:center;justify-content:center"><div style="zoom:${z ?? 1}">${visual}</div></div>`}
  <div class="foot">${cta ? `<div class="cta">${cta}</div>` : "<div></div>"}<div class="site">${note}</div></div>
</div>`}</body></html>`;

// ───────── piezas ─────────

const GB = { w: 1200, h: 900, layout: "wide", size: 66, cta: "Auditoría gratis en 24 h <b>→</b>", note: "jorgecalleja.dev" };
const IG = { w: 1080, h: 1350, size: 92, mt: 64, z: 1.6 };
const gb = (name, o) => ({ ...GB, out: `18-google-business/${name}.jpg`, ...o });
const ig = (dir, name, o) => ({ ...IG, out: `${dir}/${name}.jpg`, ...o });

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


// ── Formatos adicionales ──
const WA = "Escríbeme por WhatsApp <b>→</b>";
const ST = { w: 1080, h: 1920, size: 104, mt: 110, z: 1.7, pad: "150px 80px 200px" };
const SQ = { w: 1080, h: 1080, size: 74, mt: 40, z: 1.1 };
// Si el botón ya dice WhatsApp, el pie muestra la web en lugar de repetirlo
const pie = (o) => (o.cta === WA && !o.note ? { ...o, note: "jorgecalleja.dev" } : o);
const st = (dir, name, o) => pie({ ...ST, out: `${dir}/${name}.jpg`, ...o });
const sq = (dir, name, o) => pie({ ...SQ, out: `${dir}/${name}.jpg`, ...o });
const add = (o) => Object.assign(pieces, o);

const FOTO = { layout: "bottom", mt: 30, note: "jorgecalleja.dev" };
const MES = { tag: "Webs para artistas", eyebrow: "Para artistas", cta: "Desde 199 € <b>→</b>", note: "Escríbeme por DM" };
const MEN = { tag: "Websites for artists", eyebrow: "For artists", cta: "From €199 <b>→</b>", note: "DM me" };
const DEMO = ["music-template.webp", "musicartistdj.vercel.app"];
const SCORES = [[42, "Velocidad"], [58, "SEO"], [49, "Móvil"]];
const ANA = ["Necesitaba una web seria y que mis clientes pudieran reservar sin llamar. Jorge la hizo rápido y me lo explicó todo sin tecnicismos.", "Ana Rodríguez", "Ana Rodríguez Abogados · Toledo"];
const CARLOS = ["Nunca pensé que internet me generaría tantos clientes. Se han multiplicado los interesados en mis clases. Muy feliz con el resultado.", "Carlos Yépez", "Bachata al Aire Libre · Málaga"];

// Posts "foto"/"sol" del feed y carrusel con fotos reales de public/images
const conFoto = (id, photo) => (pieces[id] = { ...pieces[id], ...FOTO, note: pieces[id].note ?? "Escríbeme por WhatsApp", photo, visual: "" });
[["ig-foto-1", "pain-points/stagnant.jpg"], ["ig-foto-2", "pain-points/invisible.png"], ["ig-foto-3", "pain-points/obsolete.jpg"], ["ig-foto-4", "pain-points/loading-slow.jpg"],
  ["ig-sol-1", "success/it-works.png"], ["ig-sol-2", "success/clients-messages.png"], ["ig-sol-3", "success/first-google.png"], ["ig-sol-4", "success/customer-success.png"],
  ["car-1", "pain-points/leaving.png"], ["car-2", "pain-points/impatient.png"], ["car-3", "pain-points/deception.png"]].forEach(([id, f]) => conFoto(id, f));

// ── 02 · Posts verticales (1080×1920) ──
const RINGS = `<div class="rings">${ring(58, "Plantilla", "bad")}<div class="vs">vs</div>${ring(99, "A medida", "good")}</div>`;
add({
  "reel-5": st("02-posts-verticales", "reel-5-ticket-perdidas", { eyebrow: "Lo que cuesta una web mala", title: "Una web que falla <em>también pasa factura.</em>", visual: receipt(), z: 1.6, cta: "Calcula la tuya gratis <b>→</b>" }),
  "reel-6": st("02-posts-verticales", "reel-6-antes-despues", { eyebrow: "Antes y después", title: "Tener web vs. <em>una web que vende.</em>", visual: beforeAfter(), z: 1.6, cta: "Te enseño la tuya <b>→</b>" }),
  "reel-7": st("02-posts-verticales", "reel-7-lighthouse-100", { eyebrow: "Velocidad · Google Lighthouse", title: "Las plantillas se quedan en 60.<br><em>A medida, en 99.</em>", size: 96, visual: RINGS, z: 1.5, cta: "Mide tu web gratis <b>→</b>" }),
  "reel-8": st("02-posts-verticales", "reel-8-visibilidad", { eyebrow: "Visibilidad local", title: "Si tu negocio<br>no se ve, <em>no existe.</em>", visual: scene({ w: 1000, h: 558 }), z: 1, cta: "Hazte visible <b>→</b>" }),
});

// ── Escenas de los vídeos (1080×1920) ──
const vf = (o) => ({ ...ST, note: "jorgecalleja.dev", ...o });
const cierre = (title, sub, cta = WA) => vf({ eyebrow: "Auditoría gratis", title, sub, visual: scene({ w: 1000, h: 558 }), z: 1, cta });
const FR = "02-posts-verticales/frames-de-reels";

const scenes = {
  "dolores-locales": [
    vf({ eyebrow: "¿Te suena?", title: "Tienes negocio. Tienes web.<br><em>¿Y los clientes?</em>", size: 96, sub: "Algo no cuadra.", visual: flat() }),
    vf({ ...FOTO, photo: "pain-points/stagnant.jpg", eyebrow: "Kit Digital", title: "Te la dieron <em>y ahí se quedó.</em>" }),
    vf({ ...FOTO, photo: "pain-points/invisible.png", eyebrow: "En Google", title: "Nadie <em>te encuentra.</em>" }),
    vf({ ...FOTO, photo: "pain-points/leaving.png", eyebrow: "En el móvil", title: "El cliente <em>se va.</em>" }),
    vf({ ...FOTO, photo: "pain-points/impatient.png", eyebrow: "Velocidad", title: "Tarda, <em>y se cansa.</em>" }),
    vf({ ...FOTO, photo: "success/customer-success.png", eyebrow: "La solución", title: "Una web que sí <em>trae clientes.</em>" }),
    cierre("Te la reviso <em>gratis en 24 h.</em>", "Sin compromiso."),
  ],
  lighthouse: [
    vf({ eyebrow: "Google Lighthouse", title: "¿Sabes qué nota le pone Google <em>a tu web?</em>", size: 96, sub: "Se llama Lighthouse. Compruébalo.", visual: bigNum("?"), z: 1 }),
    vf({ eyebrow: "Plantillas", title: "Las plantillas <em>no llegan aquí.</em>", sub: "WordPress, Wix, Kit Digital… mismo techo.", visual: scores([[52, "WordPress"], [58, "PrestaShop"]]), z: 1.6 }),
    vf({ eyebrow: "A medida", title: "Una web a medida: <em>100.</em>", sub: "100/100 en velocidad.", visual: ring(100, "A medida", "good"), z: 2.1 }),
    cierre("¿Qué nota <em>saca la tuya?</em>", "Te la mido gratis en 24 h.", "Mide tu web gratis <b>→</b>"),
  ],
  analisis: [
    vf({ eyebrow: "Analizador gratis", title: "¿Sabes qué nota le pone Google <em>a tu web?</em>", size: 96, sub: "Descúbrelo gratis.", visual: bigNum("?"), z: 1 }),
    vf({ eyebrow: "La realidad", title: "Muchas webs <em>están así.</em>", sub: "Rojo = pierdes clientes.", visual: scores(SCORES), z: 1.25 }),
    vf({ eyebrow: "Analizador", title: "Análisis <em>gratuito</em> de tu web.", sub: "30 segundos · sin registro.", visual: checks({ title: "Tu informe", items: ["Velocidad", "SEO", "Móvil", "Accesibilidad"], ok: true, foot: "Con el estándar real de Google" }), z: 1.6 }),
    vf({ eyebrow: "Pruébalo", title: "Analiza tu web <em>gratis, ahora.</em>", sub: "El estándar real de Google.", visual: scene({ w: 1000, h: 558 }), z: 1, cta: "Pruébalo · link en la bio <b>→</b>" }),
  ],
  "dolor-solucion": [
    vf({ eyebrow: "Kit Digital", title: "¿Te hicieron la web con el Kit Digital <em>y no llegan clientes?</em>", size: 88, sub: "No eres el único.", visual: kit(), z: 1.5 }),
    vf({ ...FOTO, photo: "pain-points/stagnant.jpg", eyebrow: "El problema", title: "Te dieron la web <em>y ahí se quedó.</em>" }),
    vf({ ...FOTO, photo: "pain-points/invisibility.jpg", eyebrow: "El problema", title: "En Google <em>no apareces.</em>" }),
    vf({ ...FOTO, photo: "pain-points/obsolete.jpg", eyebrow: "El problema", title: "En el móvil, <em>nada funciona.</em>" }),
    vf({ ...FOTO, photo: "success/it-works.png", eyebrow: "La solución", title: "Una web que sí <em>trabaja para ti.</em>" }),
    cierre("Te la reviso <em>gratis.</em>", "Y te digo qué falla, sin tecnicismos."),
  ],
  motivos: [
    vf({ eyebrow: "Guía rápida", title: "Tu web no te trae clientes <em>por 3 motivos.</em>", visual: motivos(), z: 1 }),
    vf({ ...FOTO, photo: "pain-points/obsolete.jpg", eyebrow: "Motivo 1", title: "No funciona <em>en el móvil.</em>" }),
    vf({ ...FOTO, photo: "pain-points/loading-slow.jpg", eyebrow: "Motivo 2", title: "Tarda tanto <em>que se van.</em>" }),
    vf({ ...FOTO, photo: "pain-points/deception.png", eyebrow: "Motivo 3", title: "Google <em>no la ve.</em>" }),
    vf({ ...FOTO, photo: "success/first-google.png", eyebrow: "La solución", title: "Rápida, visible <em>y lista para vender.</em>" }),
    cierre("Mándame tu web. <em>Te digo qué falla, gratis.</em>"),
  ],
  solucion: [
    vf({ eyebrow: "Así se ve", title: "Así trabaja <em>una web bien hecha.</em>", sub: "Mientras tú haces lo tuyo.", visual: phone("good"), z: 1.6 }),
    vf({ ...FOTO, photo: "success/it-works.png", eyebrow: "En el móvil", title: "Lista <em>para vender.</em>" }),
    vf({ ...FOTO, photo: "success/clients-messages.png", eyebrow: "WhatsApp", title: "Te llegan <em>mensajes.</em>" }),
    vf({ ...FOTO, photo: "success/first-google.png", eyebrow: "Google", title: "Sales <em>el primero.</em>" }),
    vf({ ...FOTO, photo: "success/customer-success2.png", eyebrow: "Resultados", title: "Más clientes <em>en tu puerta.</em>" }),
    cierre("¿La quieres <em>así?</em>", "Te la reviso gratis en 24 h."),
  ],
  "reel-7claves-musicos-es": [
    vf({ ...MES, note: "jorgecalleja.dev", title: "7 claves para tu web <em>que casi nadie aprovecha.</em>", size: 96, visual: shot(...DEMO), z: 1.55 }),
    ...[
      "Tu música, <em>en un solo link.</em>", "No dependas <em>del algoritmo.</em>", "De mil enlaces <em>a uno.</em>", "Imagen pro <em>ante promotores.</em>",
      "Vende merch <em>sin comisiones.</em>", "En Google, <em>no solo en redes.</em>", "Lista <em>en pocos días.</em>",
    ].map((t, i) => vf({ ...MES, note: "jorgecalleja.dev", eyebrow: `Clave ${i + 1} de 7`, title: t, visual: bigNum(i + 1), z: 1 })),
    vf({ ...MES, title: "Tu web a medida <em>para artistas.</em>", visual: price("Desde", "199 €"), z: 1.3 }),
  ],
  "reel-musicos-es": [
    vf({ ...MES, note: "jorgecalleja.dev", title: "Tu música vive <em>dispersa.</em>", sub: "Spotify, Insta, YouTube…", visual: scatter(["Spotify", "Instagram", "YouTube", "TikTok", "Bandcamp", "SoundCloud", "Linktree", "Beatport"]), z: 1.2 }),
    vf({ ...MES, ...FOTO, cta: undefined, photo: "music-pain-2.webp", title: "No dependas <em>del algoritmo.</em>", sub: "Tu web es tuya. Para siempre." }),
    vf({ ...MES, note: "jorgecalleja.dev", title: "Una web. <em>Tuya.</em>", visual: shot(...DEMO), z: 1.55 }),
    vf({ ...MES, note: "jorgecalleja.dev", title: "Todo <em>en un link.</em>", sub: "Un link que tú controlas.", visual: grid6(["Música", "Vídeos", "Bolos", "Galería", "Tienda", "Contacto"]), z: 1.4 }),
    vf({ ...MES, title: "Webs <em>para artistas.</em>", visual: price("Desde", "199 €"), z: 1.3 }),
  ],
  "reel-musicos-en": [
    vf({ ...MEN, note: "jorgecalleja.dev", title: "Your music lives <em>scattered.</em>", sub: "Spotify, Insta, YouTube…", visual: scatter(["Spotify", "Instagram", "YouTube", "TikTok", "Bandcamp", "SoundCloud", "Linktree", "Beatport"]), z: 1.2 }),
    vf({ ...MEN, ...FOTO, cta: undefined, photo: "music-pain-2.webp", title: "Don't depend <em>on the algorithm.</em>", sub: "Your website is yours. Forever." }),
    vf({ ...MEN, note: "jorgecalleja.dev", title: "One site. <em>Yours.</em>", visual: shot(...DEMO), z: 1.55 }),
    vf({ ...MEN, note: "jorgecalleja.dev", title: "All <em>in one link.</em>", sub: "One link you control.", visual: grid6(["Music", "Videos", "Gigs", "Gallery", "Store", "Contact"]), z: 1.4 }),
    vf({ ...MEN, title: "Websites <em>for artists.</em>", visual: price("From", "€199"), z: 1.3 }),
  ],
};
// Fotogramas que también se guardan como imágenes sueltas
scenes["dolores-locales"].forEach((p, i) => (pieces[`frame-dolores-${i + 1}`] = { ...p, out: `${FR}/dolores-locales/0${i + 1}.jpg` }));
scenes.lighthouse.forEach((p, i) => (pieces[`frame-lighthouse-${i + 1}`] = { ...p, out: `${FR}/lighthouse/0${i + 1}.jpg` }));

// Vídeos: duración total y audio (07-generadores/audio/<nombre>.m4a si existe)
const videos = {
  "dolores-locales": { scenes: scenes["dolores-locales"], dur: 20.3 },
  lighthouse: { scenes: scenes.lighthouse, dur: 14.5 },
  analisis: { scenes: scenes.analisis, dur: 13.6 },
  "analisis-musica": { scenes: scenes.analisis, dur: 13.6 },
  "dolor-solucion": { scenes: scenes["dolor-solucion"], dur: 18.9 },
  motivos: { scenes: scenes.motivos, dur: 18.9 },
  solucion: { scenes: scenes.solucion, dur: 17.4 },
  "reel-7claves-musicos-es": { scenes: scenes["reel-7claves-musicos-es"], dur: 28 },
  "reel-musicos-es": { scenes: scenes["reel-musicos-es"], dur: 12 },
  "reel-musicos-en": { scenes: scenes["reel-musicos-en"], dur: 12 },
};

// ── 05 · Historias ──
add({
  "story-1": st("05-historias", "story-1-dolor", { ...FOTO, photo: "pain-points/deception.png", eyebrow: "¿Te suena?", title: "¿Tu web no <em>te trae clientes?</em>", cta: "Escríbeme aquí <b>→</b>" }),
  "story-2": st("05-historias", "story-2-visibilidad", { eyebrow: "Visibilidad", title: "Si no te ven, <em>no existes.</em>", sub: "Google · Móvil · IAs", visual: searchLost("tu servicio + málaga"), z: 1.6, cta: "Hazte visible: gratis <b>→</b>" }),
  "story-3": st("05-historias", "story-3-oferta", { eyebrow: "Sin compromiso", title: "Auditoría gratis <em>en 24 h.</em>", sub: "Te digo qué falla y cómo arreglarlo.", visual: scene({ w: 1000, h: 558 }), z: 1, cta: "Toca para escribirme <b>→</b>" }),
});

// ── 06 · Facebook ──
const FBC = { w: 1640, h: 624, layout: "wide", pad: "44px 96px", size: 62, note: "jorgecalleja.dev", cta: WA };
add({
  "fb-perfil": { w: 720, h: 720, layout: "cover", visual: avatar(720), out: "06-facebook/facebook-perfil-faro.jpg" },
  "fb-portada-faro": { ...FBC, eyebrow: "El Faro de tu Web", title: "Webs que sí <em>traen clientes.</em>", sub: "Rescato webs del Kit Digital · SEO · 99/100", visual: scene({ w: 620, h: 346 }), out: "06-facebook/facebook-portada-faro.jpg" },
  "fb-portada": { ...FBC, eyebrow: "Kit Digital", title: "¿Tu web del Kit Digital <em>no te trae clientes?</em>", sub: "Auditoría gratuita en 24 h.", visual: beforeAfter(), z: 0.78, out: "06-facebook/facebook-portada.jpg" },
});

// ── 08 · Capturas de webs (fuentes en 07-generadores/capturas) ──
[
  ["anarodriguezabogados.vercel.app_", "anarodriguezabogados.vercel.app", "Ana Rodríguez Abogados"],
  ["lexty.vercel.app_", "lexty.vercel.app", "Lexty"],
  ["malagapremiumtransfers.com_", "malagapremiumtransfers.com", "Málaga Premium Transfers"],
  ["memento-academy.com_es", "memento-academy.com/es", "Memento Academy"],
  ["retrogamehub.vercel.app_", "retrogamehub.vercel.app", "Retro Game Hub"],
  ["timebankonchain-six.vercel.app_about", "timebankonchain-six.vercel.app/about", "TimeBank on-chain"],
  ["timebankonchain-six.vercel.app_about2", "timebankonchain-six.vercel.app/about", "TimeBank on-chain"],
  ["tuvozamiga.vercel.app_", "tuvozamiga.vercel.app", "Tu Voz Amiga"],
  ["www.analizotucv.com_", "analizotucv.com", "Analizo tu CV"],
  ["www.bachataalairelibre.com_", "bachataalairelibre.com", "Bachata al Aire Libre"],
  ["www.outdoorbachatamalaga.eu_", "outdoorbachatamalaga.eu", "Outdoor Bachata Málaga"],
  ["www.precioluzhora.online_", "precioluzhora.online", "Precio Luz Hora"],
].forEach(([f, url, name]) => (pieces[`cap-${f}`] = { w: 1400, h: 1300, layout: "cover", visual: showcase(`m:07-generadores/capturas/${f}.png`, url, name), out: `08-capturas-webs/${f}.jpg` }));

// ── 09 · Marca ──
add({
  "marca-banner": { w: 1376, h: 768, scale: 2, layout: "cover", out: "09-marca/landcapejorgcallejadev.jpg",
    visual: `<div class="bs">${scene({ w: 1376, h: 768 })}<div class="bs-t"><div class="eyebrow">jorgecalleja.dev</div><h1>Webs que sí <em>traen clientes.</em></h1></div></div>` },
  "marca-faro": { w: 320, h: 320, layout: "cover", visual: avatar(320), out: "09-marca/faro-preview.jpg" },
});

// ── 10 · Analizador y destacados ──
add({
  "an-post": sq("10-analizador", "post-analizador", { eyebrow: "Analizador gratis", title: "¿Qué nota le pone Google <em>a tu web?</em>", size: 70, visual: scores(SCORES), z: 1.15, cta: "Pruébalo · link en la bio <b>→</b>", note: "Gratis · sin registro" }),
  "an-reel": st("10-analizador", "fondo-reel", { eyebrow: "Analizador gratis", title: "¿Qué nota saca tu web <em>en Google?</em>", sub: "Analízalo gratis en mi web.", visual: ring(52, "Tu web", "mid"), z: 2.2, cta: "Pruébalo · link en la bio <b>→</b>", note: "Gratis · sin registro" }),
});
[["analiza", "search", "Analiza", "tu web gratis"], ["artistas", "music", "Artistas", "webs para músicos"], ["kit-digital", "home", "Kit Digital"],
  ["opiniones", "star", "Opiniones"], ["promos", "tag", "Promos", "precio de lanzamiento"], ["trabajos", "browser", "Trabajos"]]
  .forEach(([f, k, l, s]) => (pieces[`hl-${f}`] = { w: 1080, h: 1080, layout: "cover", visual: hl(k, l, s), out: `10-destacados/destacado-${f}.jpg` }));

// ── 11 · Historias de trabajos ──
add({
  "tr-1": st("11-historias-trabajos", "01-abogados", { eyebrow: "Proyecto real", title: "Despacho <em>de abogados.</em>", sub: "Reservas online 24/7.", visual: shot("ana.webp", "anarodriguezabogados.vercel.app"), z: 1.6, cta: "¿Hacemos la tuya? <b>→</b>", note: "jorgecalleja.dev" }),
  "tr-2": st("11-historias-trabajos", "02-transfers", { eyebrow: "Proyecto real", title: "Transporte <em>privado.</em>", sub: "1ª página de Google.", visual: shot("malaga-premium-transfers.webp", "malagapremiumtransfers.com"), z: 1.6, cta: "¿Hacemos la tuya? <b>→</b>", note: "jorgecalleja.dev" }),
  "tr-3": st("11-historias-trabajos", "03-bachata", { eyebrow: "Proyecto real", title: "Clases <em>de baile.</em>", sub: "Carga instantánea.", visual: shot("bachataalairelibre.webp", "bachataalairelibre.com"), z: 1.6, cta: "¿Hacemos la tuya? <b>→</b>", note: "jorgecalleja.dev" }),
  "tr-4": st("11-historias-trabajos", "04-luz", { eyebrow: "Proyecto real", title: "Precio <em>de la luz.</em>", sub: "Miles de visitas.", visual: shot("precio-luz-hora.webp", "precioluzhora.online"), z: 1.6, cta: "¿Hacemos la tuya? <b>→</b>", note: "jorgecalleja.dev" }),
});

// ── 12 · Historias Kit Digital ──
add({
  "kd-1": st("12-historias-kitdigital", "01-que-paso", { eyebrow: "Kit Digital", title: "¿Qué pasó <em>con tu web?</em>", sub: "Muchas agencias hicieron webs en cadena: plantilla, tus datos con prisa, y a otra cosa.", visual: kit(), z: 1.55, cta: WA }),
  "kd-2": st("12-historias-kitdigital", "02-sintomas", { eyebrow: "¿Te suena?", title: "No sale <em>en Google.</em>", sub: "Sin estructura ni textos que te posicionen. Quien te busca encuentra a la competencia.", visual: searchLost("tu servicio + málaga"), z: 1.5, cta: WA }),
  "kd-3": st("12-historias-kitdigital", "03-movil", { eyebrow: "¿Te suena?", title: "En el móvil, <em>no funciona.</em>", sub: "Botones que no responden. Y 7 de cada 10 clientes entran desde el móvil.", visual: phone("bad"), z: 1.4, cta: WA }),
  "kd-4": st("12-historias-kitdigital", "04-solucion", { eyebrow: "La buena noticia", title: "Casi todo <em>se rescata.</em>", sub: "Conservo tu dominio, textos y fotos. Reconstruyo lo que falla.", visual: beforeAfter(), z: 1.55, cta: "Auditoría gratis en 24 h <b>→</b>" }),
});

// ── 13 · Historias de opiniones ──
add({
  "op-1": st("13-historias-opiniones", "01-ana", { eyebrow: "Opiniones", title: "Lo que dicen <em>mis clientes.</em>", size: 92, visual: quote(...ANA), z: 1.25, cta: "¿Tu opinión? Escríbeme <b>→</b>" }),
  "op-2": st("13-historias-opiniones", "02-pide-la-tuya", { eyebrow: "Opiniones", title: "¿Trabajamos <em>juntos?</em>", sub: "Me ayudarías mucho dejando tu reseña en Google. Escríbeme y te paso el enlace.", visual: stars("Tu reseña en Google"), z: 1.4, cta: WA }),
  "op-3": st("13-historias-opiniones", "03-carlos", { eyebrow: "Opiniones", title: "Lo que dicen <em>mis clientes.</em>", size: 92, visual: quote(...CARLOS), z: 1.25, cta: "¿Tu opinión? Escríbeme <b>→</b>" }),
});

// ── 14 · Milanuncios (1080×1080) ──
const MA = "14-milanuncios";
add({
  "ma-1": sq(MA, "1-portada", { eyebrow: "Diseño web en Málaga", title: "Rescato webs <em>del Kit Digital.</em>", visual: scene({ w: 900, h: 502 }), z: 1, cta: "Auditoría gratis en 24 h <b>→</b>", note: "jorgecalleja.dev" }),
  "ma-2": sq(MA, "2-problema", { eyebrow: "Kit Digital", title: "¿Te hicieron la web con el Kit Digital <em>y no te trae clientes?</em>", size: 62, sub: "No es culpa tuya. Le pasó a miles.", visual: flat(), z: 1.25, cta: WA, note: "jorgecalleja.dev" }),
  "ma-3": sq(MA, "3-sintomas", { eyebrow: "¿Te suena?", title: "Señales de que <em>tu web falla.</em>", visual: checks({ items: ["No aparece en Google", "No funciona en el móvil", "Tarda mucho en cargar", "Nadie contesta la agencia"] }), z: 1.6, cta: WA, note: "jorgecalleja.dev" }),
  "ma-4": sq(MA, "4-solucion", { eyebrow: "La solución", title: "La reconstruyo <em>para que sí venda.</em>", visual: checks({ items: ["Rápida: 99/100 en velocidad", "Sale en Google", "Funciona en el móvil"], ok: true }), z: 1.6, cta: WA, note: "jorgecalleja.dev" }),
  "ma-5": sq(MA, "5-analizador", { eyebrow: "Análisis gratis", title: "Te analizo tu web <em>gratis.</em>", sub: "Con el estándar real de Google.", visual: scores(SCORES), z: 1.1, cta: WA, note: "jorgecalleja.dev" }),
  "ma-6": sq(MA, "6-confianza", { eyebrow: "Trato directo", title: "Hablas conmigo, <em>sin intermediarios.</em>", size: 66, visual: quote(...ANA), z: 0.88, cta: WA, note: "jorgecalleja.dev" }),
  "ma-7": sq(MA, "7-cta", { eyebrow: "Sin compromiso", title: "Auditoría gratuita <em>en 24 h.</em>", visual: scene({ w: 900, h: 502 }), z: 1, cta: WA, note: "jorgecalleja.dev" }),
});

// ── 15 · Músicos (ES / EN) ──
const MU = "15-musicos-dm";
const PLAT = ["Spotify", "Instagram", "YouTube", "TikTok", "Bandcamp", "SoundCloud", "Linktree", "Beatport"];
add({
  "mu-hist-es": st(MU, "historia-demo-es", { ...MES, title: "Tu música, <em>un solo link.</em>", sub: "Música · Vídeos · Bolos · Tienda", visual: shot(...DEMO), z: 1.55 }),
  "mu-hist-en": st(MU, "historia-demo-en", { ...MEN, title: "Your music, <em>one link.</em>", sub: "Music · Videos · Gigs · Store", visual: shot(...DEMO), z: 1.55 }),
  "mu-mock-es": sq(MU, "mockup-demo-es", { ...MES, title: "Tu música, <em>un solo link.</em>", visual: shot(...DEMO), z: 1.4 }),
  "mu-mock-en": sq(MU, "mockup-demo-en", { ...MEN, title: "Your music, <em>one link.</em>", visual: shot(...DEMO), z: 1.4 }),
  "mu-alg-es": sq(MU, "post-algoritmo-es", { ...MES, ...FOTO, cta: MES.cta, photo: "music-pain-1.webp", size: 72, title: "No alquiles tu carrera <em>a un algoritmo.</em>", sub: "Spotify e Insta mandan sobre ti. Tu web es tuya para siempre." }),
  "mu-alg-en": sq(MU, "post-algorithm-en", { ...MEN, ...FOTO, cta: MEN.cta, photo: "music-pain-1.webp", size: 72, title: "Don't rent your career <em>to an algorithm.</em>", sub: "Spotify and Insta control you. Your website is yours forever." }),
  "mu-disp-es": sq(MU, "post-disperso-es", { ...MES, size: 66, title: "Tu música vive repartida <em>en mil plataformas.</em>", visual: scatter(PLAT), z: 1 }),
  "mu-disp-en": sq(MU, "post-scattered-en", { ...MEN, size: 66, title: "Your music is scattered <em>across ten platforms.</em>", visual: scatter(PLAT), z: 1 }),
  "mu-pro-es": sq(MU, "post-pro-es", { ...MES, ...FOTO, cta: MES.cta, photo: "music-pain-3.webp", size: 72, title: "Un link de perfil <em>no es una web propia.</em>", sub: "Da la imagen que tu proyecto merece." }),
  "mu-pro-en": sq(MU, "post-pro-en", { ...MEN, ...FOTO, cta: MEN.cta, photo: "music-pain-3.webp", size: 72, title: "A profile link <em>isn't a real website.</em>", sub: "Look as professional as your music." }),
  "mu-todo-es": sq(MU, "post-todo-es", { ...MES, title: "Una web. <em>Todo tu mundo.</em>", visual: grid6(["Música", "Vídeos", "Bolos", "Galería", "Tienda", "Contacto"]), z: 1.05 }),
  "mu-todo-en": sq(MU, "post-features-en", { ...MEN, title: "One site. <em>Your whole world.</em>", visual: grid6(["Music", "Videos", "Gigs", "Gallery", "Store", "Contact"]), z: 1.05 }),
});

// ── 16 · Historias de promos ──
add({
  "pr-artistas": st("16-historias-promos", "promo-artistas-es", { ...MES, title: "Tu web a medida <em>desde 199 €.</em>", sub: "Tu música, tus vídeos y tus bolos en un solo link tuyo.", visual: price("Precio de lanzamiento", "199 €"), z: 1.6 }),
  "pr-auditoria": st("16-historias-promos", "promo-auditoria", { eyebrow: "Gratis", title: "¿Tu web no vende? <em>Auditoría gratis en 24 h.</em>", size: 96, sub: "Te digo qué falla y cómo arreglarlo. Sin compromiso.", visual: price("Auditoría", "Gratis"), z: 1.6, cta: WA }),
});

// ── YouTube: banner del canal (2048×1152, zona segura central 1235×338) ──
add({
  youtube: { w: 2048, h: 1152, layout: "cover", out: "06-facebook/youtube-banner.jpg",
    visual: `${(() => { seed = 23; return `<svg style="position:fixed;inset:0" width="2048" height="1152">${Array.from({ length: 160 }, () => {
        const x = rnd() * 2048, y = rnd() * 1152, r = 0.8 + rnd() * 2.2, o = 0.2 + rnd() * 0.55;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${rnd() > 0.7 ? "#22d3ee" : "#ffffff"}" opacity="${o.toFixed(2)}"/>`;
      }).join("")}</svg>`; })()}
      <div style="position:fixed;left:0;right:0;top:470px;height:212px;background:radial-gradient(50% 50% at 50% 50%,rgba(139,92,246,.28),transparent 75%)"></div>
      <div style="position:relative;width:1235px;height:338px;display:flex;align-items:center;gap:40px">
      <div style="flex:1">
        <div class="brand" style="font-size:30px">${logo}<span>jorgecalleja.dev</span></div>
        <h1 style="font-size:76px;margin-top:22px">Webs que sí <em>traen clientes.</em></h1>
        <p class="sub" style="font-size:26px;margin-top:16px">Diseño web a medida · Málaga</p>
      </div>
      ${scene({ w: 560, h: 313 })}
    </div>` },
});

// ── Raíz: Patreon y miniaturas ──
add({
  patreon: { w: 1600, h: 900, layout: "wide", size: 84, eyebrow: "Lo que nadie te contó", title: "Kit Digital: <em>el gran engaño.</em>", visual: kit(), z: 1.15, cta: WA, note: "jorgecalleja.dev", out: "patreon-kit-digital.jpg" },
  og: { w: 1200, h: 630, scale: 500 / 1200, layout: "wide", size: 62, pad: "48px 64px", eyebrow: "jorgecalleja.dev", title: "Webs que sí <em>traen clientes.</em>", visual: scene({ w: 520, h: 290 }), cta: WA, note: "Diseño web · Málaga", out: "og-preview.jpg" },
});
const prev = (id, out, scale) => (pieces[`prev-${out.split(".")[0]}`] = { ...pieces[id], out, scale });
prev("patreon", "pat-prev.jpg", 520 / 1600);
prev("fb-portada-faro", "pc-prev.jpg", 700 / 1640);
prev("an-post", "an-prev.jpg", 400 / 1080);
prev("hl-analiza", "da-prev.jpg", 300 / 1080);
prev("tr-1", "ht-prev.jpg", 360 / 1080);
prev("marca-banner", "ls-prev.jpg", 600 / 1376);
pieces["prev-ra1"] = { ...scenes.analisis[0], out: "ra1.jpg", scale: 340 / 1080 };
pieces["prev-ra3"] = { ...scenes.analisis[2], out: "ra3.jpg", scale: 340 / 1080 };

// ───────── ejecución ─────────
// node gen-v2.mjs                 → todo
// node gen-v2.mjs gb-2 story-1    → piezas concretas
// node gen-v2.mjs video:motivos   → un vídeo (video:all para todos)
// node gen-v2.mjs --sin-videos    → todas las imágenes, sin vídeos
const args = process.argv.slice(2);
const soloPiezas = args.includes("--sin-videos");
const wantVideos = args.includes("video:all") ? Object.keys(videos)
  : soloPiezas ? [] : args.length ? args.filter((a) => a.startsWith("video:")).map((a) => a.slice(6)) : Object.keys(videos);
const ids = args.length && !soloPiezas ? args.filter((a) => !a.startsWith("video:")) : Object.keys(pieces);

const browser = await chromium.launch();
const ctxs = {};
const render = async (p, out) => {
  const scale = p.scale ?? 1;
  ctxs[scale] ??= await browser.newContext({ deviceScaleFactor: scale });
  const tab = await ctxs[scale].newPage();
  await tab.setViewportSize({ width: p.w, height: p.h });
  await tab.setContent(page(p), { waitUntil: "load" });
  await tab.evaluate(() => document.fonts.ready);
  mkdirSync(dirname(out), { recursive: true });
  await tab.screenshot({ path: out, type: "jpeg", quality: 92 });
  await tab.close();
};
for (const id of ids) {
  const p = pieces[id];
  if (!p) { console.log("✗ no existe:", id); continue; }
  await render(p, join(root, p.out));
  console.log("✓", p.out);
}

const fade = 0.4;
for (const name of wantVideos) {
  const v = videos[name];
  const tmp = mkdtempSync(join(tmpdir(), `reel-${name}-`));
  const n = v.scenes.length, d = (v.dur + (n - 1) * fade) / n;
  for (let i = 0; i < n; i++) await render(v.scenes[i], join(tmp, `${i}.jpg`));
  const inputs = v.scenes.flatMap((_, i) => ["-loop", "1", "-framerate", "30", "-t", d.toFixed(3), "-i", join(tmp, `${i}.jpg`)]);
  let chain = "", last = "0:v";
  for (let i = 1; i < n; i++) {
    chain += `[${last}][${i}:v]xfade=transition=fade:duration=${fade}:offset=${(i * (d - fade)).toFixed(3)}[v${i}];`;
    last = `v${i}`;
  }
  const audio = join(here, "audio", `${name}.m4a`);
  const hasAudio = existsSync(audio);
  const out = join(root, "03-reels-video", `${name}.mp4`);
  execFileSync("ffmpeg", ["-v", "error", "-y", ...inputs, ...(hasAudio ? ["-i", audio] : []),
    "-filter_complex", `${chain}[${last}]format=yuv420p[out]`, "-map", "[out]", ...(hasAudio ? ["-map", `${n}:a`, "-c:a", "aac", "-b:a", "128k"] : []),
    "-c:v", "libx264", "-preset", "medium", "-crf", "21", "-r", "30", "-t", String(v.dur), "-movflags", "+faststart", out]);
  rmSync(tmp, { recursive: true, force: true });
  console.log("✓", `03-reels-video/${name}.mp4`, hasAudio ? "(con audio)" : "(sin audio)");
}
await browser.close();
