# Contexto — últimos cambios

_Actualizado: 5 sep 2026 · marca Metricool: **El Faro Web** (brandId 6550560, Europe/Madrid) · repo: CallejaJ/portfolio_

## Resumen

Se lanzó la campaña del nicho **músicos/artistas** en Instagram (@elfarodetuweb), apoyada en la demo `musicartistdj.vercel.app`, y se ordenó todo el calendario de Metricool al límite del plan gratuito (**15 publicaciones/mes**). Además se corrigió un error de idioma en las piezas EN y se creó un reel nuevo de "7 claves".

## 1 · Assets de música en el repo

Se subieron a `marketing/` (repo público, servidos vía `raw.githubusercontent.com` para que Metricool los descargue):

- `15-musicos-dm/` — 5 posts de feed ES + 5 EN, historia ES/EN, y `PIES-DE-FOTO.md`.
- `03-reels-video/reel-musicos-es.mp4` y `reel-musicos-en.mp4`.

## 2 · Programación en Metricool (Instagram, límite 15/mes)

Antes había 22 Threads pyme + música todo en septiembre (40+). Se reordenó así:

| Mes | Contenido | Total |
|---|---|---|
| **Septiembre** | 7 ya publicados (días 1-4) + 8 de música (7→23 sep, 18:00) | 15 |
| **Octubre** | 6 de música EN (2,5,7,9,12,14 · 18:00) + 9 Threads pyme (10:00) | 15 |
| **Noviembre** | 13 Threads pyme restantes (10:00, laborables 2→18) | 13 |

- Contenido música = 2 reels + 10 posts de feed + 2 historias (ES bloque primero, luego EN).
- **Historias** (`historia-demo` ES 11-sep y EN, movida a oct): con **autopublicación OFF** → Metricool avisa al móvil para publicarlas a mano y añadir el **sticker de enlace** a `musicartistdj.vercel.app`.
- Los Threads pyme (Kit Digital / SEO / diseño web) se movieron enteros a oct+nov para dejar sitio a la música en septiembre.

## 3 · Corrección de idioma en piezas EN

Las piezas en inglés mostraban el mockup de la plantilla **en español** ("TU PROYECTO / TU NOMBRE / Ver bolos / PRÓXIMOS DIRECTOS"). Se reconstruyó la tarjeta en inglés (YOUR PROJECT / YOUR NAME / ARTIST · DJ · PRODUCER / Listen · See shows / UPCOMING SHOWS) y se corrigieron:

- `03-reels-video/reel-musicos-en.mp4` (tarjeta reemplazada durante su aparición, sin fugas).
- `15-musicos-dm/mockup-demo-en.jpg` (post de feed).

Ambas se actualizaron en Metricool (media re-descargada con `?v=2`). Commit `a14ce4c` en `main`.

## 4 · Reel nuevo "7 claves para tu web"

`03-reels-video/reel-7claves-musicos-es.mp4` — 28s, 1080×1920, estilo de marca (violeta + glows, números lima, acento cyan). Intro → 7 claves (música en un link · no depender del algoritmo · de mil enlaces a uno · imagen pro ante promotores · vender merch sin comisiones · en Google no solo en redes · lista en pocos días) → cierre "desde 199€".

- Entregado **sin música** para añadir audio en tendencia nativo en la app.

**Pie sugerido:** _Tu música no debería vivir repartida en mil plataformas. 7 claves para tener una web que sea 100% tuya 👇 Web a medida para artistas desde 199€. Escríbeme por DM. #músicaindependiente #artistaindependiente #webparamúsicos #djs #productores_

## 5 · Destacados (Highlights)

Portadas ya creadas en `10-destacados/`. Para el nicho música: **`destacado-artistas.jpg`** (nota musical). Guardar ahí las historias de música (demo, encuesta, antes/después, precio, proceso, testimonio).

## Pendientes de Jorge

- Poner el enlace de la demo en la **bio** de Instagram (los posts dirigen ahí).
- Para usar audios en tendencia: **cambiar la cuenta de Business a Creador** (Ajustes → Tipo de cuenta) — las cuentas de empresa tienen catálogo musical limitado.
- Publicar las 2 historias desde el aviso del móvil añadiendo el sticker de enlace.
- Subir/programar el reel "7 claves" (requiere commit + push para la URL si va por Metricool; o subirlo a mano con audio nativo).
