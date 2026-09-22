import type { LanguageCode } from '@/i18n';

type HeroLocale = {
  eyebrow: string;
  headline: readonly [string, string, string];
  description: string;
  directions: string;
  call: string;
  marqueeItems: readonly string[];
};

export const heroConfig = {
  image: {
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=88',
    srcSet: [
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=84 900w',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1400&q=86 1400w',
      'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1800&q=88 1800w',
    ].join(', '),
    alt: {
      pt: 'Barbeiro realizando um corte preciso na Atelier Barbers',
      en: 'Barber creating a precision haircut at Atelier Barbers',
      es: 'Barbero realizando un corte preciso en Atelier Barbers',
    },
  },
  locales: {
    pt: {
      eyebrow: 'Barbearia premium · Melbourne',
      headline: ['CORTE COM', 'PRECISÃO', '& IDENTIDADE'],
      description: 'Cortes precisos. Linhas limpas. Entre e saia com o seu melhor visual — sempre.',
      directions: 'Como chegar',
      call: 'Ligar agora',
      marqueeItems: ['CORTES', 'DEGRADÊS', 'BARBA', 'PRECISÃO', 'ESTILO', 'ATELIER'],
    },
    en: {
      eyebrow: 'Premium Barbers · Melbourne',
      headline: ['CUT WITH', 'PRECISION', '& IDENTITY'],
      description: 'Sharp cuts. Clean lines. Walk in, walk out looking your best — every single time.',
      directions: 'Get Directions',
      call: 'Call Now',
      marqueeItems: ['HAIRCUTS', 'FADES', 'BEARD', 'PRECISION', 'STYLE', 'ATELIER'],
    },
    es: {
      eyebrow: 'Barbería premium · Melbourne',
      headline: ['CORTE CON', 'PRECISIÓN', '& IDENTIDAD'],
      description: 'Cortes precisos. Líneas limpias. Entra y sal con tu mejor imagen — siempre.',
      directions: 'Cómo llegar',
      call: 'Llamar ahora',
      marqueeItems: ['CORTES', 'DEGRADADOS', 'BARBA', 'PRECISIÓN', 'ESTILO', 'ATELIER'],
    },
  } satisfies Record<LanguageCode, HeroLocale>,
} as const;