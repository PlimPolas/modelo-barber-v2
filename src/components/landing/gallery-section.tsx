'use client';

import { useState } from 'react';

import { galleryCategories } from '@/data/gallery';
import { useI18n } from '@/i18n';

import './gallery-section.css';

export function GallerySection() {
  const { language } = useI18n();
  const [activeByCategory, setActiveByCategory] = useState<Record<string, number>>(() =>
    Object.fromEntries(galleryCategories.map((category) => [category.id, 0])),
  );

  return (
    <section className="atelier-section gallery-section" aria-label="Barber portfolio gallery">
      <div className="section-shell gallery-shell">
        <div className="gallery-heading">
          <div className="atelier-eyebrow" data-reveal="fade-up" data-reveal-delay={0}>
            <span aria-hidden="true" />
            <p>{language === 'en' ? 'Selected work' : language === 'es' ? 'Trabajos seleccionados' : 'Trabalhos selecionados'}</p>
          </div>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>
            {language === 'en' ? 'Cuts & details' : language === 'es' ? 'Cortes y detalles' : 'Cortes & detalhes'}
          </h2>
        </div>

        <div className="gallery-grid">
          {galleryCategories.map((category) => {
            const activeIndex = Math.min(activeByCategory[category.id] ?? 0, category.images.length - 1);
            const activeImage = category.images[activeIndex];
            const thumbs = category.images
              .map((image, index) => ({ image, index }))
              .filter(({ index }) => index !== activeIndex)
              .slice(0, 3);

            return (
              <article className="gallery-category" key={category.id}>
                <h3 data-reveal="fade-up" data-reveal-delay={0}>{category.name[language]}</h3>

                <div className="gallery-main" data-reveal="media" data-reveal-delay={1}>
                  <img
                    key={`${category.id}-${activeIndex}`}
                    className="gallery-main__image"
                    src={activeImage.src}
                    alt={activeImage.alt[language]}
                    loading="lazy"
                  />
                  <span className="gallery-main__edge" aria-hidden="true" />
                </div>

                {thumbs.length > 0 ? (
                  <div className="gallery-thumbs" role="list" aria-label={`${category.name[language]} thumbnails`}>
                    {thumbs.map(({ image, index }, thumbIndex) => (
                      <button
                        key={`${category.id}-${index}`}
                        className="gallery-thumb"
                        type="button"
                        onClick={() =>
                          setActiveByCategory((current) => ({ ...current, [category.id]: index }))
                        }
                        data-reveal="media"
                        data-reveal-delay={thumbIndex + 2}
                        aria-label={`${category.name[language]} ${index + 1}`}
                      >
                        <img src={image.src} alt="" loading="lazy" />
                        <span className="gallery-thumb__accent" aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
