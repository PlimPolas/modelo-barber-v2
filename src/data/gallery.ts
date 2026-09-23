export type GalleryLanguage = 'pt' | 'en' | 'es';

export interface GalleryCategory {
  id: string;
  name: Record<GalleryLanguage, string>;
  description: Record<GalleryLanguage, string>;
  images: Array<{
    src: string;
    alt: Record<GalleryLanguage, string>;
  }>;
}

/**
 * Single source of truth for the Barber V2 portfolio carousel.
 * For a new demo, replace only category names/descriptions/images here.
 * Each category supports up to four images: one active image + three thumbnails.
 */
export const galleryCategories: GalleryCategory[] = [
  {
    id: 'mid-fade',
    name: { pt: 'Mid Fade', en: 'Mid Fade', es: 'Mid Fade' },
    description: {
      pt: 'Precisão em cada detalhe',
      en: 'Precision in every detail',
      es: 'Precisión en cada detalle',
    },
    images: [
      { src: '/images/gallery/mid-fade.jpeg', alt: { pt: 'Mid fade em destaque', en: 'Featured mid fade', es: 'Mid fade destacado' } },
      { src: '/images/gallery/placeholders/02.svg', alt: { pt: 'Mid fade com acabamento preciso', en: 'Precision mid fade', es: 'Mid fade de acabado preciso' } },
      { src: '/images/gallery/placeholders/03.svg', alt: { pt: 'Mid fade contemporâneo', en: 'Contemporary mid fade', es: 'Mid fade contemporáneo' } },
      { src: '/images/gallery/placeholders/04.svg', alt: { pt: 'Mid fade finalizado', en: 'Finished mid fade', es: 'Mid fade finalizado' } },
    ],
  },
  {
    id: 'low-fade',
    name: { pt: 'Low Fade', en: 'Low Fade', es: 'Low Fade' },
    description: {
      pt: 'Transição limpa. Acabamento preciso.',
      en: 'Clean transition. Precise finish.',
      es: 'Transición limpia. Acabado preciso.',
    },
    images: [
      { src: '/images/gallery/low-fade.jpeg', alt: { pt: 'Low fade em destaque', en: 'Featured low fade', es: 'Low fade destacado' } },
      { src: '/images/gallery/placeholders/02.svg', alt: { pt: 'Low fade com acabamento limpo', en: 'Clean low fade', es: 'Low fade de acabado limpio' } },
      { src: '/images/gallery/placeholders/03.svg', alt: { pt: 'Low fade moderno', en: 'Modern low fade', es: 'Low fade moderno' } },
      { src: '/images/gallery/placeholders/04.svg', alt: { pt: 'Low fade finalizado', en: 'Finished low fade', es: 'Low fade finalizado' } },
    ],
  },
  {
    id: 'barba',
    name: { pt: 'Barba', en: 'Beard', es: 'Barba' },
    description: {
      pt: 'Forma, contorno e presença.',
      en: 'Shape, definition and presence.',
      es: 'Forma, contorno y presencia.',
    },
    images: [
      { src: '/images/gallery/barba.jpeg', alt: { pt: 'Barba em destaque', en: 'Featured beard grooming', es: 'Barba destacada' } },
      { src: '/images/gallery/placeholders/02.svg', alt: { pt: 'Acabamento de barba', en: 'Beard finishing detail', es: 'Acabado de barba' } },
      { src: '/images/gallery/placeholders/03.svg', alt: { pt: 'Contorno de barba', en: 'Beard line-up', es: 'Perfilado de barba' } },
      { src: '/images/gallery/placeholders/04.svg', alt: { pt: 'Barba finalizada', en: 'Finished beard grooming', es: 'Barba finalizada' } },
    ],
  },
  {
    id: 'outros',
    name: { pt: 'Outros', en: 'Others', es: 'Otros' },
    description: {
      pt: 'Mais que um corte. Uma identidade.',
      en: 'More than a cut. An identity.',
      es: 'Más que un corte. Una identidad.',
    },
    images: [
      { src: '/images/gallery/outros.jpeg', alt: { pt: 'Trabalho da barbearia em destaque', en: 'Featured barbershop work', es: 'Trabajo destacado de la barbería' } },
      { src: '/images/gallery/placeholders/02.svg', alt: { pt: 'Atendimento na barbearia', en: 'Barbershop service', es: 'Servicio en la barbería' } },
      { src: '/images/gallery/placeholders/03.svg', alt: { pt: 'Corte e finalização', en: 'Cut and styling', es: 'Corte y acabado' } },
      { src: '/images/gallery/placeholders/04.svg', alt: { pt: 'Detalhe de acabamento', en: 'Finishing detail', es: 'Detalle de acabado' } },
    ],
  },
];
