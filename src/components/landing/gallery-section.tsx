'use client';

import { galleryCategories } from '@/data/gallery';
import { useI18n, type LanguageCode } from '@/i18n';

import './gallery-section.css';

const galleryCopy: Record<LanguageCode, { eyebrow: string; title: string; subtitle: string; aria: string }> = {
  pt: {
    eyebrow: 'Trabalhos selecionados',
    title: 'Cortes & detalhes',
    subtitle: 'Estilo em cada ângulo. Qualidade em cada detalhe.',
    aria: 'Portfólio de cortes da barbearia',
  },
  en: {
    eyebrow: 'Selected work',
    title: 'Cuts & details',
    subtitle: 'Style from every angle. Quality in every detail.',
    aria: 'Barbershop haircut portfolio',
  },
  es: {
    eyebrow: 'Trabajos seleccionados',
    title: 'Cortes y detalles',
    subtitle: 'Estilo desde cada ángulo. Calidad en cada detalle.',
    aria: 'Portafolio de cortes de la barbería',
  },
};

const galleryLayout = [
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 0],
  [0, 1],
] as const;

export function GallerySection() {
  const { language } = useI18n();
  const t = galleryCopy[language];

  const items = galleryLayout.flatMap(([categoryIndex, imageIndex], position) => {
    const category = galleryCategories[categoryIndex];
    const image = category?.images[imageIndex];
    if (!category || !image) return [];

    return [{
      id: `${category.id}-${imageIndex}-${position}`,
      category,
      image,
    }];
  });

  if (!items.length) return null;

  return (
    <section className="atelier-section gallery-section" id="galeria-cortes" aria-label={t.aria}>
      <div className="gallery-section-shell">
        <header className="gallery-heading">
          <div className="atelier-eyebrow gallery-eyebrow" data-reveal="fade-up" data-reveal-delay={0}>
            <span aria-hidden="true" />
            <p>{t.eyebrow}</p>
            <span aria-hidden="true" />
          </div>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2>
          <p data-reveal="fade-up" data-reveal-delay={2}>{t.subtitle}</p>
        </header>

        <div className="gallery-reference-grid" aria-label={t.aria}>
          {items.map(({ id, category, image }, index) => (
            <figure
              className="gallery-reference-item"
              data-reveal="media"
              data-reveal-delay={Math.min(index + 2, 5)}
              key={id}
            >
              <img src={image.src} alt={image.alt[language]} loading="lazy" />
              <figcaption className="gallery-reference-overlay">
                <span>{category.name[language]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
