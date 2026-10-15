import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";

// Tipografía display para titulares (h1-h3, ver globals.css)
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
import { ThemeProvider } from "@/components/theme-provider";
import ChunkErrorReloader from "@/components/chunk-error-reloader";
import { Analytics } from "@vercel/analytics/react";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site-config";
import "./globals.css";

// Datos estructurados (GEO): quién eres, qué haces y dónde,
// legible por Google y por las IAs (ChatGPT, Perplexity, etc.)
const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Jorge Calleja — Desarrollo Web",
  description:
    "Desarrollo web para pymes y autónomos: rescate de webs del Kit Digital, webs nuevas pensadas para vender, SEO técnico, velocidad 99/100 y optimización para buscadores con IA (GEO). Auditoría gratuita en 24h.",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  telephone: "+34624572707",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Málaga",
    addressCountry: "ES",
  },
  areaServed: "España",
  priceRange: "€€",
  founder: {
    "@type": "Person",
    name: "Jorge Calleja Pérez",
    jobTitle: "Desarrollador Web",
    sameAs: [
      "https://www.linkedin.com/in/callejaj",
      "https://github.com/CallejaJ",
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jorge Calleja · Arreglo webs del Kit Digital que no funcionan | Desarrollo web Málaga",
  description:
    "¿Tu web del Kit Digital no aparece en Google o los botones no funcionan en el móvil? Auditoría gratuita en 24h. Webs rápidas (99/100), con estructura SEO y pensadas para conseguir clientes.",
  openGraph: {
    title: "Jorge Calleja · Arreglo webs del Kit Digital que no funcionan",
    description:
      "¿Tu web no aparece en Google o los botones no funcionan en el móvil? Auditoría gratuita en 24h, sin compromiso.",
    url: SITE_URL,
    siteName: "Jorge Calleja — Desarrollo Web",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "jorgecalleja.dev — Desarrollo web en Málaga",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Calleja · Arreglo webs del Kit Digital que no funcionan",
    description:
      "¿Tu web no aparece en Google o los botones no funcionan en el móvil? Auditoría gratuita en 24h, sin compromiso.",
    images: ["/og-image.jpg"],
  },
  keywords: [
    "arreglar web kit digital",
    "diseño web Málaga",
    "web no aparece en Google",
    "web lenta",
    "desarrollo web pymes",
    "SEO técnico",
  ],
  generator: "v0.dev",
  icons: {
    icon: [
      {
        url: "/logo.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/logo.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={displayFont.variable}>
      <head>
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
        <link rel="manifest" href="/site.webmanifest" />
        <style>{`
          html {
            font-family: ${GeistSans.style.fontFamily};
            --font-sans: ${GeistSans.variable};
            --font-mono: ${GeistMono.variable};
          }
        `}</style>
      </head>
      <body>
        <ChunkErrorReloader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
