// Fuente única del contenido markdown del sitio.
// Lo sirven /llms.txt (text/plain) y /md (text/markdown para agentes).
export const LLMS_CONTENT = `# Jorge Calleja — Desarrollo Web

> Desarrollador web en Málaga (España) especializado en rescatar webs del Kit Digital que no generan clientes: webs rápidas (99/100 en PageSpeed), con estructura SEO, optimizadas para buscadores con IA (GEO) y pensadas para vender. Auditoría gratuita en 24 horas.

## Secciones principales

- [El problema](https://jorgecalleja.dev/#pain-points): por qué las webs del Kit Digital no aparecen en Google ni convierten
- [Servicios](https://jorgecalleja.dev/#services): rescate de webs del Kit Digital, webs nuevas, SEO técnico y velocidad
- [Cómo trabajo](https://jorgecalleja.dev/#process): proceso de trabajo en 4 pasos
- [Trabajos reales](https://jorgecalleja.dev/#projects): proyectos en producción (abogados, transfers, eventos, SaaS)
- [Analizador de webs](https://jorgecalleja.dev/#analizar): análisis PageSpeed/Lighthouse gratuito e instantáneo
- [Contacto](https://jorgecalleja.dev/#contact): WhatsApp, email y formulario de auditoría

## APIs para agentes

- [API catalog (RFC 9727)](https://jorgecalleja.dev/.well-known/api-catalog): catálogo de servicios en formato linkset
- \`POST https://jorgecalleja.dev/api/analizar\` — body \`{"url": "https://ejemplo.com"}\` → puntuaciones de rendimiento, accesibilidad, buenas prácticas y SEO
- \`POST https://jorgecalleja.dev/api/audit\` — body \`{"website": "https://ejemplo.com", "email": "tu@email.com"}\` → solicita una auditoría manual (respuesta en 24h)

## Otros recursos

- [Sitemap](https://jorgecalleja.dev/sitemap.xml)
- [Webs para músicos](https://jorgecalleja.dev/musicos): landing sectorial
- [Analiza tu web](https://jorgecalleja.dev/analiza): página del analizador
- [Privacidad](https://jorgecalleja.dev/privacidad) · [Cookies](https://jorgecalleja.dev/cookies)

## Contacto

- Email: hola@jorgecalleja.dev
- WhatsApp: +34 624 57 27 07
- Ubicación: Málaga, España (trabajo en remoto para toda España)
`;
