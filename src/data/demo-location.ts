type DemoLanguage = 'pt' | 'en' | 'es';

const mapQuery = 'Golden Hands Barber Shop, Galeria Via Veneto, Av. João XXI 72B, Loja 7, 1000-300 Lisboa, Portugal';

/** Contact and map details supplied for the Golden Hands demo. */
export const demoLocation = {
  businessName: 'Golden Hands Barber Shop',
  address: {
    line1: 'Galeria Via Veneto, Av. João XXI 72B, Loja 7',
    line2: '1000-300 Lisboa, Portugal',
    full: 'Galeria Via Veneto, Av. João XXI 72B, Loja 7, 1000-300 Lisboa, Portugal',
  },
  phone: {
    display: '+351 217 931 653',
    e164: '+351217931653',
    href: 'tel:+351217931653',
  },
  hours: {
    pt: 'Seg–Sex 10h–20h · Sáb: confirmar · Dom fechado',
    en: 'Mon–Fri 10am–8pm · Sat: confirm · Sun closed',
    es: 'Lun–Vie 10–20h · Sáb: confirmar · Dom cerrado',
  } satisfies Record<DemoLanguage, string>,
  googleMaps: {
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=16&output=embed`,
    placeUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`,
  },
} as const;
