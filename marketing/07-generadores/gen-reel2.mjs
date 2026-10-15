import sharp from "sharp";
const AN = "/sessions/busy-inspiring-curie/mnt/portfolio/public/images/pain-points";
const SU = "/sessions/busy-inspiring-curie/mnt/portfolio/public/images/success";
const OUT = "/tmp/ads/frames2";
const W = 1080, H = 1920;

const faro = (x, y, s, op=1) => `<g transform="translate(${x},${y}) scale(${s})" opacity="${op}">
  <linearGradient id="fl" x1="24" y1="4" x2="24" y2="40" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#3b82f6"/><stop offset="1" stop-color="#9333ea"/></linearGradient>
  <path d="M20 13 L2 5 L2 12 Z" fill="#22d3ee" opacity="0.55"/><path d="M28 13 L46 5 L46 12 Z" fill="#22d3ee" opacity="0.55"/>
  <path d="M18.5 10 L29.5 10 L24 3.5 Z" fill="url(#fl)"/><rect x="20" y="10" width="8" height="5.5" rx="1.2" fill="#0f0a1e"/><circle cx="24" cy="12.8" r="2.1" fill="#22d3ee"/>
  <rect x="17.8" y="15.2" width="12.4" height="1.8" rx="0.9" fill="#e9e4f8" opacity="0.3"/><path d="M19 17 L29 17 L31.5 40 L16.5 40 Z" fill="url(#fl)"/>
  <path d="M18.45 22 L29.55 22 L30 26 L18 26 Z" fill="#e9e4f8" opacity="0.9"/><path d="M17.5 31 L30.5 31 L30.95 35 L17.05 35 Z" fill="#e9e4f8" opacity="0.9"/>
  <rect x="22.4" y="35.5" width="3.2" height="4.5" rx="1.5" fill="#0f0a1e"/><rect x="14.5" y="40" width="19" height="3" rx="1.5" fill="#e9e4f8" opacity="0.35"/></g>`;

const wa = (x,y,s)=>`<g transform="translate(${x},${y}) scale(${s})"><path fill="white" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></g>`;

const lines = (a,y0,size,color)=>a.map((l,i)=>`<text x="540" y="${y0+i*size*1.15}" font-family="Liberation Sans" font-size="${size}" font-weight="bold" fill="${l.c||color}" text-anchor="middle">${l.t}</text>`).join("");

async function photoScene({ src, tint, name, tag, tagColor, headline, pos="centre" }) {
  const base = await sharp(src).resize(W, H, { fit:"cover", position:pos }).modulate({saturation:0.2, brightness:0.92}).tint(tint).toBuffer();
  const ov = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#150d26" stop-opacity="0.25"/><stop offset="0.5" stop-color="#150d26" stop-opacity="0.5"/><stop offset="1" stop-color="#150d26" stop-opacity="0.95"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#d)"/>
    ${faro(453.6, 120, 3.6, 0.45)}
    <rect x="${540-(tag.length*16+50)/2}" y="1120" width="${tag.length*16+50}" height="58" rx="29" fill="${tagColor}"/>
    <text x="540" y="1158" font-family="Liberation Sans" font-size="28" font-weight="bold" fill="#0f0a1e" text-anchor="middle">${tag}</text>
    ${lines(headline, 1280, 78, "white")}</svg>`;
  await sharp(base).composite([{input:Buffer.from(ov),top:0,left:0}]).png().toFile(`${OUT}/${name}.png`);
  console.log("OK", name);
}

async function textScene({ name, headline, sub, cta }) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#150d26"/><stop offset="0.6" stop-color="#251444"/><stop offset="1" stop-color="#1e1b4b"/></linearGradient>
    <radialGradient id="gl" cx="0.5" cy="0.4" r="0.7"><stop offset="0" stop-color="#9333ea" stop-opacity="0.3"/><stop offset="1" stop-color="#9333ea" stop-opacity="0"/></radialGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/><rect width="${W}" height="${H}" fill="url(#gl)"/>
    ${faro(429.6, 170, 4.6, 0.55)}
    ${lines(headline, 820, 84, "white")}
    ${sub?`<text x="540" y="${820+headline.length*97+40}" font-family="Liberation Sans" font-size="38" fill="#c4b5fd" text-anchor="middle">${sub}</text>`:""}
    ${cta?`<rect x="240" y="1560" width="600" height="130" rx="65" fill="#25D366"/>${wa(300,1595,2.6)}<text x="590" y="1642" font-family="Liberation Sans" font-size="44" font-weight="bold" fill="white" text-anchor="middle">${cta}</text><text x="540" y="1760" font-family="Liberation Sans" font-size="32" fill="#a5b4fc" text-anchor="middle">Gratis en 24h · WhatsApp 624 57 27 07</text>`:""}</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${OUT}/${name}.png`);
  console.log("OK", name);
}

const V={r:124,g:58,b:237}, C={r:34,g:120,b:180};
await textScene({ name:"01-gancho", headline:[{t:"Tu web no te"},{t:"trae clientes"},{t:"por 3 motivos."}], sub:"Y los tres tienen arreglo." });
await photoScene({ src:`${AN}/obsolete.jpg`, name:"02", tint:V, tag:"MOTIVO 1", tagColor:"#fbbf24", headline:[{t:"No funciona"},{t:"en el móvil.",c:"#fbbf24"}] });
await photoScene({ src:`${AN}/loading-slow.jpg`, name:"03", tint:V, tag:"MOTIVO 2", tagColor:"#fbbf24", headline:[{t:"Tarda tanto"},{t:"que se van.",c:"#fbbf24"}] });
await photoScene({ src:`${AN}/invisibility.jpg`, name:"04", tint:V, tag:"MOTIVO 3", tagColor:"#fbbf24", headline:[{t:"Google"},{t:"no la ve.",c:"#fbbf24"}] });
await photoScene({ src:`${SU}/first-google.png`, name:"05", tint:C, tag:"LA SOLUCIÓN", tagColor:"#22d3ee", headline:[{t:"Rápida, visible"},{t:"y lista para vender.",c:"#4ade80"}] });
await textScene({ name:"06-cierre", headline:[{t:"Mándame tu web."},{t:"Te digo qué"},{t:"falla, gratis."}], cta:"Escríbeme" });
