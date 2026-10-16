# jorgecalleja.dev

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-deploy-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

Código de **[jorgecalleja.dev](https://jorgecalleja.dev)**, la web de Jorge Calleja Pérez, desarrollador web en Málaga.

Es una landing de captación para pymes y autónomos: rescate de webs del Kit Digital, webs nuevas pensadas para vender, SEO técnico, velocidad 99/100 y optimización para buscadores con IA (GEO), con auditoría gratuita en 24h.

## Qué incluye

- **Home** (`/`): problemas típicos, antes/después, servicios, proceso, casos, testimonios, FAQ y llamada a la acción por WhatsApp.
- **Analizador de webs** (`/analiza`): mide cualquier URL con Google PageSpeed Insights (Lighthouse) a través de `/api/analizar`.
- **Auditoría por email** (`/api/audit`): formulario que envía la solicitud con Resend.
- **Landing para músicos** (`/musicos`).
- **Páginas legales**: `/privacidad` y `/cookies`, con banner de consentimiento (el Meta Pixel solo se carga tras aceptar).
- **SEO y GEO**: metadata por página, JSON-LD (`ProfessionalService` + `FAQPage`), `sitemap.xml`, `robots.txt` con bots de IA permitidos y `llms.txt`.
- **Markdown para agentes**: si un cliente pide `/` con `Accept: text/markdown`, el middleware sirve la versión en markdown (`/md`).
- Tema claro/oscuro y Vercel Analytics.

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Estilos**: Tailwind CSS, shadcn/ui (Radix UI), Framer Motion, Lucide
- **Formularios y validación**: React Hook Form, Zod
- **Servicios externos**: Google PageSpeed Insights API, Resend
- **Despliegue**: Vercel

## Estructura

```
jorgecalleja.dev/
├── app/                 # Rutas (App Router): home, analiza, musicos, legales, api, llms.txt, md, sitemap
├── components/          # Secciones de la landing y componentes ui/ (shadcn)
├── hooks/               # Hooks de React
├── lib/                 # Configuración del sitio, textos, datos y utilidades
├── public/              # Imágenes, iconos, descargas, robots.txt y manifest
├── marketing/           # Material de redes sociales y sus generadores
├── scripts/             # Scripts de apoyo
└── middleware.ts        # Negociación de contenido markdown para agentes
```

Los datos de contacto, el número de WhatsApp, la URL pública y la valoración de Google se cambian en `lib/site-config.ts`.

## Desarrollo local

Requisitos: Node.js 18 o superior.

```bash
git clone https://github.com/CallejaJ/jorgecalleja.dev.git
cd jorgecalleja.dev
npm install
npm run dev
```

La web queda en `http://localhost:3000`.

### Variables de entorno

Crea un `.env.local` con:

| Variable | Para qué sirve |
| --- | --- |
| `PAGESPEED_API_KEY` | Analizador de webs. Funciona sin ella, pero con límites más bajos. |
| `RESEND_API_KEY` | Envío de las solicitudes de auditoría por email. |
| `AUDIT_TO_EMAIL` | Dirección que recibe las solicitudes (por defecto `hola@jorgecalleja.dev`). |

### Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build |

## Despliegue

Se despliega en Vercel desde este repositorio: cada push a `main` publica en producción y cada PR genera una preview. Las variables de entorno de arriba se configuran en el proyecto de Vercel.

## Contacto

**Jorge Calleja Pérez** · Málaga, España

- Web: [jorgecalleja.dev](https://jorgecalleja.dev)
- Email: [hola@jorgecalleja.dev](mailto:hola@jorgecalleja.dev)
- LinkedIn: [linkedin.com/in/callejaj](https://www.linkedin.com/in/callejaj)
- GitHub: [github.com/CallejaJ](https://github.com/CallejaJ)
