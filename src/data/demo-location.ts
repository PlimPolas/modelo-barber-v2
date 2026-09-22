type DemoLanguage = 'pt' | 'en' | 'es';

const latitude = -37.8136;
const longitude = 144.9631;
const coordinateQuery = `${latitude},${longitude}`;

/**
 * Single source of truth for location/contact data used by the reusable demo.
 * Replace this object when personalizing a new barbershop; the section, map,
 * directions links and contact details update without rebuilding the layout.
 *
 * The current coordinates intentionally point to Melbourne CBD because
 * "Atelier Barbers / 12 Barber St" is placeholder demo content rather than a
 * verified real business. For a client demo, replace lat/lng with the salon's
 * verified Google Maps coordinates.
 */
export const demoLocation = {
  businessName: 'Atelier Barbers',
  address: {
    line1: '12 Barber St',
    line2: 'Melbourne VIC 3000',
    full: '12 Barber St, Melbourne VIC 3000',
  },
  phone: {
    display: '0412 345 678',
    e164: '+61412345678',
    href: 'tel:+61412345678',
  },
  hours: {
    pt: 'Seg–Sex 10h–18h · Sáb 10h–16h · Dom Fechado',
    en: 'Mon–Fri 10am–6pm · Sat 10am–4pm · Sun Closed',
    es: 'Lun–Vie 10–18h · Sáb 10–16h · Dom Cerrado',
  } satisfies Record<DemoLanguage, string>,
  coordinates: {
    latitude,
    longitude,
  },
  googleMaps: {
    embedUrl: `https://www.google.com/maps?q=${encodeURIComponent(coordinateQuery)}&z=16&output=embed`,
    placeUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(coordinateQuery)}`,
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coordinateQuery)}`,
  },
} as const;
