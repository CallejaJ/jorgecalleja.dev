# jorgecalleja.dev

<div align="center">
    <img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=nextdotjs" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/shadcn/ui-Radix-000000?style=for-the-badge&logo=shadcnui" alt="shadcn/ui" />
    <img src="https://img.shields.io/badge/Framer_Motion-latest-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/PageSpeed_Insights-API-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="PageSpeed Insights" />
    <img src="https://img.shields.io/badge/Resend-Email-000000?style=for-the-badge&logo=resend" alt="Resend" />
    <img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel" alt="Vercel" />
</div>

<p align="center">
    <i>Lead-generation site for Jorge Calleja, a web developer in Málaga who rescues underperforming Kit Digital websites for small businesses, with a built-in PageSpeed analyzer and content optimized for both search engines and AI assistants.</i>
</p>

## Service Offering

The site sells four services to small businesses and freelancers in Spain, most of whom received a website through the government **Kit Digital** programme that brings them no clients. Every engagement starts with a free audit delivered within 24 hours.

| Service | Problem It Solves | Deliverable |
|---|---|---|
| **Kit Digital Rescue** | A delivered site that is slow, broken on mobile and invisible on Google | Audit, reuse of domain and content, rebuilt structure and speed |
| **Sales-Focused New Website** | No site, or one that does not turn visits into contacts | New mobile-first site with a direct path to WhatsApp or a call |
| **SEO and Speed** | Low ranking and slow load times | Technical SEO, structured content and a 99/100 speed score with a before/after report |
| **GEO (AI Visibility)** | Customers asking ChatGPT or Perplexity instead of Google | Structured data and citable content so AI assistants recommend the business |

## Pages and Routes

The home page is a single long-form landing; the rest of the routes support conversion, compliance and machine readability.

| Route | Purpose |
|---|---|
| `/` | Landing: pain points, before/after, services, process, case study, testimonials, FAQ, free checklist and contact |
| `/analiza` | Public website analyzer backed by Google PageSpeed Insights |
| `/musicos` | Dedicated landing for musicians and bands |
| `/privacidad`, `/cookies` | Privacy and cookie policies |
| `/api/analizar` | Runs the PageSpeed analysis for a submitted URL |
| `/api/audit` | Receives free-audit requests and forwards them by email |
| `/llms.txt`, `/md` | Markdown representation of the site for AI agents |
| `/sitemap.xml`, `/robots.txt` | Crawl configuration, with AI bots explicitly allowed |

## Website Analyzer

The analyzer turns a technical Lighthouse report into a verdict a non-technical business owner can read, and acts as the main lead magnet. `app/api/analizar/route.ts` normalizes the URL, calls the **PageSpeed Insights v5** API with the `mobile` strategy and returns four category scores plus five plain-language checks.

| Check | Source |
|---|---|
| **Scores** | Lighthouse performance, accessibility, best practices and SEO categories |
| **HTTPS** | `is-on-https` audit |
| **Mobile ready** | `viewport` audit |
| **Google title and description** | `document-title` and `meta-description` audits |
| **Fast load** | Largest Contentful Paint under 2.5 s |

## Search and AI Visibility

The site is built to be understood by Google and by AI assistants as well as by people. Metadata targets commercial search intent, and the same content is exposed in machine-friendly formats.

| Mechanism | Implementation |
|---|---|
| **Structured data** | `ProfessionalService` and `FAQPage` JSON-LD in `app/layout.tsx` |
| **llms.txt** | Static route generated from `lib/llms-content.ts` |
| **Markdown negotiation** | `middleware.ts` rewrites `/` to `/md` when a request sends `Accept: text/markdown` |
| **Crawl rules** | `public/robots.txt` and `app/sitemap.ts` |

## System Architecture

| Component | Role |
|---|---|
| **Next.js App Router** | Renders the landing pages and serves the API and static text routes |
| **Landing components** | Section components in `components/` composed by `app/page.tsx` |
| **Content layer** | `lib/translations.ts`, `lib/projects-data.ts` and `lib/site-config.ts` hold copy, portfolio data and contact settings |
| **Analyzer API** | `app/api/analizar` wraps Google PageSpeed Insights and simplifies its output |
| **Audit API** | `app/api/audit` validates audit requests and sends them through Resend |
| **Middleware** | Serves the markdown version of the home page to agents that ask for it |
| **Consent manager** | `components/cookie-consent.tsx` loads the Meta Pixel only after the visitor accepts |
| **Vercel** | Hosting, preview deployments per pull request and Web Analytics |

## Technology Stack

- **Frontend**: Next.js 15.2 (App Router), React 19, TypeScript 5
- **Styling and UI**: Tailwind CSS 3.4, shadcn/ui on Radix UI, Framer Motion, Lucide icons, Geist and Space Grotesk fonts
- **Forms**: React Hook Form, Zod
- **External Services**: Google PageSpeed Insights API v5, Resend, Meta Pixel (consent-gated)
- **Analytics**: Vercel Web Analytics
- **Deployment**: Vercel

## Key Features

1. **Instant website analyzer** — any visitor can score their own site and get a plain-language verdict before talking to anyone.
2. **AI-assistant visibility** — `llms.txt`, markdown content negotiation and JSON-LD make the business citable by ChatGPT, Perplexity and similar tools.
3. **WhatsApp-first conversion** — floating button, mobile CTA bar and tracked links route every call to action to a single chat.
4. **Email audit fallback** — visitors without WhatsApp can request the free audit through a validated form.
5. **Niche landing for musicians** — a separate page with its own metadata and Open Graph image for a second audience.
6. **Consent-gated tracking** — the Meta Pixel loads only after explicit cookie consent, in line with GDPR.
7. **Free downloadable checklist** — a Kit Digital website checklist PDF captures visitors who are not ready to buy.
8. **Light and dark themes** — theme toggle backed by `next-themes`.

## Testing Strategy

There is no automated test suite. Every pull request gets a **Vercel preview deployment**, which is the place to check changes manually before merging. Performance, accessibility and SEO are measured with **Lighthouse / PageSpeed Insights**, the same engine the public analyzer uses.

## Localization

The home page copy lives in `lib/translations.ts` with **Spanish** (default) and **English** dictionaries, switched from the header. The analyzer, the musicians landing and the legal pages are Spanish only, matching the target market.

## Project Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```env
   # Website analyzer (works without a key, with lower rate limits)
   PAGESPEED_API_KEY=your_pagespeed_api_key

   # Free audit by email
   RESEND_API_KEY=your_resend_api_key
   AUDIT_TO_EMAIL=hola@jorgecalleja.dev
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`

Contact details, the WhatsApp number, the public URL and the Google rating are edited in `lib/site-config.ts`.

---

Built for small businesses in Spain at [jorgecalleja.dev](https://jorgecalleja.dev).
