// ============================================
// CONFIGURACIÓN DEL SITIO
// Cambia aquí tu número de WhatsApp si hace falta
// ============================================

export const WHATSAPP_NUMBER = "34624572707"; // prefijo país + número, sin "+" ni espacios

export const CONTACT_EMAIL = "hola@jorgecalleja.dev";

// Enlace para dejar reseña en Google
export const GOOGLE_REVIEW_URL = "https://g.page/r/CWeblad9pUMcEBM/review";

// Valoración de Google (actualízala a mano cuando cambie).
// rating = nota media (0-5), count = número de reseñas. Si count es 0, no se muestra el badge.
export const GOOGLE_RATING = { rating: 5.0, count: 2 };

// Meta Pixel (Facebook) — se carga solo tras consentimiento de cookies
export const META_PIXEL_ID = "2021817168707788";

// URL pública del sitio
export const SITE_URL = "https://jorgecalleja.dev";

// Datos del titular para textos legales
export const LEGAL = {
  name: "Jorge Calleja Pérez",
  nif: "31865985Z",
  city: "Málaga, España",
  email: CONTACT_EMAIL,
  phone: "+34 624 57 27 07",
};

export const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Registra un contacto por WhatsApp como conversión en Meta Pixel.
// Solo hace algo si el visitante aceptó cookies (fbq existe).
export const trackLead = () => {
  if (typeof window !== "undefined" && (window as any).fbq) {
    (window as any).fbq("track", "Lead", { content_name: "WhatsApp" });
  }
};
