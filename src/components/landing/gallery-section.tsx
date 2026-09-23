'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { galleryCategories, type GalleryCategory } from '@/data/gallery';
import { useI18n, type LanguageCode } from '@/i18n';

import './gallery-section.css';

const galleryCopy: Record<LanguageCode, { eyebrow: string; title: string; subtitle: string; cta: string; quote: string; aria: string }> = {
  pt: {
    eyebrow: 'Trabalhos selecionados',
    title: 'Cortes & detalhes',
    subtitle: 'Estilo em cada ângulo. Qualidade em cada detalhe.',
    cta: 'Ver todos os serviços',
    quote: 'Mais que um corte. É uma identidade.',
    aria: 'Portfólio de cortes da barbearia',
  },
  en: {
    eyebrow: 'Selected work',
    title: 'Cuts & details',
    subtitle: 'Style from every angle. Quality in every detail.',
    cta: 'View all services',
    quote: 'More than a cut. It is an identity.',
    aria: 'Barbershop haircut portfolio',
  },
  es: {
    eyebrow: 'Trabajos seleccionados',
    title: 'Cortes y detalles',
    subtitle: 'Estilo desde cada ángulo. Calidad en cada detalle.',
    cta: 'Ver todos los servicios',
    quote: 'Más que un corte. Es una identidad.',
    aria: 'Portafolio de cortes de la barbería',
  },
};

const wrap = (index: number, length: number) => (index + length) % length;
const pad = (value: number) => String(value).padStart(2, '0');

function getThumbnailIndexes(category: GalleryCategory, activeIndex: number) {
  if (category.images.length <= 3) return category.images.map((_, index) => index);

  return [
    activeIndex,
    wrap(activeIndex + 1, category.images.length),
    wrap(activeIndex + 2, category.images.length),
  ];
}

export function GallerySection() {
  const { language } = useI18n();
  const t = galleryCopy[language];
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeByCategory, setActiveByCategory] = useState<Record<string, number>>(() =>
    Object.fromEntries(galleryCategories.map((category) => [category.id, 0])),
  );
  const touchStartX = useRef<number | null>(null);

  const total = galleryCategories.length;
  const previousIndex = wrap(activeSlide - 1, total);
  const nextIndex = wrap(activeSlide + 1, total);
  const activeCategory = galleryCategories[activeSlide];
  if (!activeCategory) return null;
  const activeImageIndex = Math.min(activeByCategory[activeCategory.id] ?? 0, activeCategory.images.length - 1);
  const activeImage = activeCategory.images[activeImageIndex];
  if (!activeImage) return null;
  const activeThumbIndexes = getThumbnailIndexes(activeCategory, activeImageIndex);

  const setCategoryImage = (categoryId: string, imageIndex: number) => {
    setActiveByCategory((current) => ({ ...current, [categoryId]: imageIndex }));
  };

  const goTo = (index: number) => setActiveSlide(wrap(index, total));
  const goPrevious = () => goTo(activeSlide - 1);
  const goNext = () => goTo(activeSlide + 1);

  const renderSideCard = (categoryIndex: number, side: 'left' | 'right') => {
    const category = galleryCategories[categoryIndex];
    if (!category) return null;
    const imageIndex = Math.min(activeByCategory[category.id] ?? 0, category.images.length - 1);
    const sideImage = category.images[imageIndex];
    if (!sideImage) return null;
    const previewIndexes = getThumbnailIndexes(category, imageIndex).slice(0, 2);

    return (
      <article
        className={`gallery-side-card gallery-side-card--${side}`}
        key={`${side}-${category.id}`}
        aria-label={category.name[language]}
        onClick={() => goTo(categoryIndex)}
      >
        <div className="gallery-side-card__media">
          <img src={sideImage.src} alt={sideImage.alt[language]} loading="lazy" />
          <span className="gallery-side-card__shade" aria-hidden="true" />
          <div className="gallery-side-card__title">
            <span aria-hidden="true" />
            <strong>{category.name[language]}</strong>
          </div>
          <button
            className="gallery-side-card__arrow"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              goTo(categoryIndex);
            }}
            aria-label={side === 'left' ? 'Previous category' : 'Next category'}
          >
            {side === 'left' ? <ArrowLeft size={21} strokeWidth={1.6} /> : <ArrowRight size={21} strokeWidth={1.6} />}
          </button>
        </div>
        <div className="gallery-side-card__thumbs" aria-hidden="true">
          {previewIndexes.map((index) => (
            category.images[index] ? <img key={`${category.id}-preview-${index}`} src={category.images[index]?.src} alt="" loading="lazy" /> : null
          ))}
        </div>
      </article>
    );
  };

  return (
    <section className="atelier-section gallery-section" id="galeria-cortes" aria-label={t.aria}>
      <div className="section-shell gallery-shell">
        <header className="gallery-heading">
          <div className="atelier-eyebrow" data-reveal="fade-up" data-reveal-delay={0}>
            <span aria-hidden="true" />
            <p>{t.eyebrow}</p>
          </div>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2>
          <p data-reveal="fade-up" data-reveal-delay={2}>{t.subtitle}</p>
        </header>
      </div>

      <div
        className="gallery-carousel-viewport"
        data-reveal="media"
        data-reveal-delay={3}
        onTouchStart={(event) => {
          touchStartX.current = event.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(event) => {
          const startX = touchStartX.current;
          const endX = event.changedTouches[0]?.clientX;
          touchStartX.current = null;
          if (startX === null || endX === undefined) return;
          const delta = endX - startX;
          if (Math.abs(delta) < 48) return;
          if (delta < 0) goNext();
          else goPrevious();
        }}
      >
        <div className="gallery-carousel-stage">
          {renderSideCard(previousIndex, 'left')}

          <article className="gallery-feature-card" key={activeCategory.id}>
            <div className="gallery-feature-card__media">
              <img
                key={`${activeCategory.id}-${activeImageIndex}`}
                className="gallery-feature-card__image"
                src={activeImage.src}
                alt={activeImage.alt[language]}
                loading="lazy"
              />
              <span className="gallery-feature-card__shade" aria-hidden="true" />

              <div className="gallery-feature-card__copy">
                <span className="gallery-feature-card__line" aria-hidden="true" />
                <h3>{activeCategory.name[language]}</h3>
                <p>{activeCategory.description[language]}</p>
              </div>

              <span className="gallery-feature-card__counter" aria-label={`Slide ${activeSlide + 1} of ${total}`}>
                {pad(activeSlide + 1)} / {pad(total)}
              </span>
            </div>

            <div className="gallery-feature-card__thumbs" aria-label={`${activeCategory.name[language]} thumbnails`}>
              {activeThumbIndexes.map((index) => {
                const item = activeCategory.images[index];
                if (!item) return null;
                const isActive = index === activeImageIndex;
                return (
                  <button
                    key={`${activeCategory.id}-thumb-${index}`}
                    type="button"
                    className={`gallery-feature-thumb ${isActive ? 'is-active' : ''}`}
                    onClick={() => setCategoryImage(activeCategory.id, index)}
                    aria-label={`${activeCategory.name[language]} ${index + 1}`}
                    aria-pressed={isActive}
                  >
                    <img src={item.src} alt="" loading="lazy" />
                    <span aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </article>

          {renderSideCard(nextIndex, 'right')}
        </div>
      </div>

      <div className="section-shell gallery-footer">
        <div className="gallery-pagination" data-reveal="fade-up" data-reveal-delay={4} aria-label="Gallery pagination">
          {galleryCategories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={index === activeSlide ? 'is-active' : ''}
              onClick={() => goTo(index)}
              aria-label={`${category.name[language]} ${index + 1}`}
              aria-current={index === activeSlide ? 'true' : undefined}
            >
              <span />
            </button>
          ))}
        </div>

        <a className="gallery-cta ghost-button" href="/services" data-reveal="fade-up" data-reveal-delay={5}>
          {t.cta} <ArrowRight size={17} strokeWidth={1.6} />
        </a>

        <div className="gallery-footer-decoration" aria-hidden="true">
          <strong>BARBER<br />SHOP</strong>
          <p>{t.quote}<span /></p>
        </div>
      </div>
    </section>
  );
}
