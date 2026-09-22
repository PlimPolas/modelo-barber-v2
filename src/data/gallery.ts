export type GalleryLanguage = 'pt' | 'en' | 'es';

export interface GalleryCategory {
  id: string;
  name: Record<GalleryLanguage, string>;
  images: Array<{
    src: string;
    alt: Record<GalleryLanguage, string>;
  }>;
}

const image = (name: string, params = 'scale-down-to=2048') =>
  `https://framerusercontent.com/images/${name}.jpg?${params}`;

/**
 * Reusable gallery content for Barber V2 demos.
 * Replace only this array when personalizing a new barbershop.
 * Each category supports one main image plus up to three additional images.
 */
export const galleryCategories: GalleryCategory[] = [
  {
    id: 'mid-fade',
    name: { pt: 'Mid Fade', en: 'Mid Fade', es: 'Mid Fade' },
    images: [
      { src: image('N2WiUItXHzq3pVso0NMy3nJfbw'), alt: { pt: 'Mid fade em destaque', en: 'Featured mid fade', es: 'Mid fade destacado' } },
      { src: image('8kU6qS7pkNXrrBcNtOdv1qorU'), alt: { pt: 'Mid fade com acabamento preciso', en: 'Precision mid fade', es: 'Mid fade de acabado preciso' } },
      { src: image('L7O72RaIUlKcUL0Ee0w8GWHWTdw'), alt: { pt: 'Mid fade contemporâneo', en: 'Contemporary mid fade', es: 'Mid fade contemporáneo' } },
      { src: image('KKaVDUSPNEebhUYqUAQHmKgYM'), alt: { pt: 'Mid fade finalizado', en: 'Finished mid fade', es: 'Mid fade finalizado' } },
    ],
  },
  {
    id: 'low-fade',
    name: { pt: 'Low Fade', en: 'Low Fade', es: 'Low Fade' },
    images: [
      { src: image('L7O72RaIUlKcUL0Ee0w8GWHWTdw'), alt: { pt: 'Low fade em destaque', en: 'Featured low fade', es: 'Low fade destacado' } },
      { src: image('N2WiUItXHzq3pVso0NMy3nJfbw'), alt: { pt: 'Low fade com acabamento limpo', en: 'Clean low fade', es: 'Low fade de acabado limpio' } },
      { src: image('KKaVDUSPNEebhUYqUAQHmKgYM'), alt: { pt: 'Low fade moderno', en: 'Modern low fade', es: 'Low fade moderno' } },
      { src: image('8kU6qS7pkNXrrBcNtOdv1qorU'), alt: { pt: 'Low fade finalizado', en: 'Finished low fade', es: 'Low fade finalizado' } },
    ],
  },
  {
    id: 'barba',
    name: { pt: 'Barba', en: 'Beard', es: 'Barba' },
    images: [
      { src: image('KKaVDUSPNEebhUYqUAQHmKgYM'), alt: { pt: 'Barba em destaque', en: 'Featured beard grooming', es: 'Barba destacada' } },
      { src: image('PaN26fmUFDFXpMRknfRImO1iv0'), alt: { pt: 'Acabamento de barba', en: 'Beard finishing detail', es: 'Acabado de barba' } },
      { src: image('8kU6qS7pkNXrrBcNtOdv1qorU'), alt: { pt: 'Contorno de barba', en: 'Beard line-up', es: 'Perfilado de barba' } },
      { src: image('N2WiUItXHzq3pVso0NMy3nJfbw'), alt: { pt: 'Barba finalizada', en: 'Finished beard grooming', es: 'Barba finalizada' } },
    ],
  },
  {
    id: 'outros',
    name: { pt: 'Outros', en: 'Others', es: 'Otros' },
    images: [
      { src: image('PaN26fmUFDFXpMRknfRImO1iv0'), alt: { pt: 'Trabalho da barbearia em destaque', en: 'Featured barbershop work', es: 'Trabajo destacado de la barbería' } },
      { src: image('odHeYERnwVXDnc8B02KIbADP4'), alt: { pt: 'Atendimento na barbearia', en: 'Barbershop service', es: 'Servicio en la barbería' } },
      { src: image('L7O72RaIUlKcUL0Ee0w8GWHWTdw'), alt: { pt: 'Corte e finalização', en: 'Cut and styling', es: 'Corte y acabado' } },
      { src: image('KKaVDUSPNEebhUYqUAQHmKgYM'), alt: { pt: 'Detalhe de acabamento', en: 'Finishing detail', es: 'Detalle de acabado' } },
    ],
  },
];
