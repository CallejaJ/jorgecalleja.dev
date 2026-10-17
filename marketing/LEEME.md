# Material de marketing — jorgecalleja.dev

Todo organizado por tipo de contenido. Aquí tienes qué hay en cada carpeta y para qué usarlo.

> **Nueva rama de negocio:** el material de la campaña "CVs que pasan los ATS" está en `cv-ats/` (con su propio LEEME).

> **Estilo actual (octubre 2026):** todas las piezas salen de `07-generadores/gen-v2.mjs` con la estética oscura editorial (Space Grotesk + Instrument Serif, violeta y cyan, el faro de marca). Donde encaja se usan las fotos de `public/images` (personas en sus negocios, capturas de proyectos, músicos).

## 01-posts-cuadrados (1080×1350, 4:5)
Imágenes para el **feed de Instagram y Facebook**.
- `foto-1..4` — los 4 dolores con foto real: Kit Digital, Google, móvil, velocidad.
- `sol-1..4` — las 4 soluciones con foto real: web que funciona, mensajes, primero en Google, más clientes.
- `anuncio-5-ticket-perdidas` — la factura silenciosa (coste de no actuar).
- `anuncio-6-antes-despues` — comparativa antes/después.
- `anuncio-7-lighthouse-100` — plantilla 58 vs a medida 99.
- `anuncio-8-visibilidad` — el faro ("Si tu negocio no se ve, no existe").

## 02-posts-verticales (1080×1920)
Versiones verticales para **Stories o Reels como imagen fija**.
- `reel-5..8` — factura, antes/después, lighthouse, visibilidad.
- `frames-de-reels/` — fotogramas sueltos de los reels `dolores-locales` y `lighthouse`.

## 03-reels-video (MP4, 1080×1920)
Vídeos listos para **Reels**. Se generan con `gen-v2.mjs video:all` a partir de las mismas escenas.
- `dolor-solucion.mp4`, `dolores-locales.mp4`, `motivos.mp4`, `solucion.mp4`, `lighthouse.mp4`, `analisis.mp4` / `analisis-musica.mp4`.
- Músicos: `reel-musicos-es.mp4`, `reel-musicos-en.mp4`, `reel-7claves-musicos-es.mp4`.
NOTA: conservan la música que ya llevaban (guardada en `07-generadores/audio/`). Instagram puede detectarla; si un reel despunta, resúbelo desde el móvil con audio de la biblioteca de la app. `analisis.mp4` y el de 7 claves van sin audio.

## 04-carrusel (1080×1350)
Carrusel "3 motivos" para Instagram. Sube las 5 slides en orden (slide-0 a slide-4).

## 05-historias (1080×1920)
- `story-1-dolor` — "¿Tu web no te trae clientes?" (con foto).
- `story-2-visibilidad` — "Si no te ven, no existes".
- `story-3-oferta` — "Auditoría gratis en 24 h".

## 06-facebook
- `facebook-perfil-faro.jpg` — foto de perfil (el faro).
- `facebook-portada-faro.jpg` — portada "Webs que sí traen clientes".
- `facebook-portada.jpg` — portada alternativa del Kit Digital.

## 07-generadores
`gen-v2.mjs` genera todas las piezas y vídeos: `node marketing/07-generadores/gen-v2.mjs` (todo), con ids concretos (`gb-2 story-1`) o `video:motivos`. Necesita Playwright y `ffmpeg`. Las fuentes están en `fonts/`, el audio de los reels en `audio/` y las capturas originales de las webs en `capturas/`.

## 08-capturas-webs
Las webs de clientes y proyectos presentadas con marco de navegador y su nombre, listas para enseñar. Las capturas en bruto están en `07-generadores/capturas/`.

## 09-marca
- `landcapejorgcallejadev.jpg` — banner de marca (el faro iluminando tu negocio).
- `faro-preview.jpg` — el faro en pequeño.
- `jorgecallejadev.png` — avatar voxel de Jorge (ilustración propia, sin cambios).

## 10-analizador · 10-destacados
- `post-analizador.jpg` (1080×1080) y `fondo-reel.jpg` (1080×1920) para promocionar el analizador.
- `destacado-*.jpg` — portadas de los destacados de Instagram: Analiza, Artistas, Kit Digital, Opiniones, Promos, Trabajos.

## 11 a 16 · Historias y anuncios
- `11-historias-trabajos` — 4 proyectos reales (abogados, transfers, bachata, luz).
- `12-historias-kitdigital` — secuencia de 4 historias del Kit Digital.
- `13-historias-opiniones` — opiniones de Ana y Carlos, y la petición de reseña.
- `14-milanuncios` — 7 cuadrados para el anuncio de Milanuncios.
- `15-musicos-dm` — piezas para artistas en español e inglés (desde 199 €).
- `16-historias-promos` — promo para artistas y auditoría gratis.

## 18-google-business (1200×900)
`gb-2` a `gb-14`, una por publicación de Google Business (textos en su `LEEME.md`).

## Raíz
`patreon-kit-digital.jpg`, `og-preview.jpg` y miniaturas (`*-prev.jpg`, `ra1`, `ra3`) generadas a partir de las piezas anteriores.
