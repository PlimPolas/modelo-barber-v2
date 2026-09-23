'use client';

import { useI18n, type LanguageCode } from '@/i18n';
import { GallerySection } from './gallery-section';

const pricingCopy: Record<LanguageCode, { eyebrow: string; title: string; description: string; columns: string[][][] }> = {
  pt: {
    eyebrow: 'O que oferecemos',
    title: 'Nossos preços',
    description: 'Serviços e preços da Golden Hands.',
    columns: [
      [['Corte & Style', '17 €'], ['Corte & Style + Barba', '22 €'], ['Corte & Style + Sobrancelha c/navalha', '20 €'], ['Corte + Barba + Sobrancelha', '25 €'], ['Corte + Barba com Toalha Quente', '27 €'], ['Patilha + Barba', '12 €']],
      [['Barba', '8 €'], ['Sobrancelha c/navalha', '6 €'], ['Patilha', '8 €'], ['Hidratação capilar', '8 €'], ['Barba com Toalha Quente', '13 €']],
    ],
  },
  en: {
    eyebrow: 'What We Offer',
    title: 'Our Prices',
    description: 'Golden Hands services and prices.',
    columns: [
      [['Corte & Style', '17 €'], ['Corte & Style + Barba', '22 €'], ['Corte & Style + Sobrancelha c/navalha', '20 €'], ['Corte + Barba + Sobrancelha', '25 €'], ['Corte + Barba com Toalha Quente', '27 €'], ['Patilha + Barba', '12 €']],
      [['Barba', '8 €'], ['Sobrancelha c/navalha', '6 €'], ['Patilha', '8 €'], ['Hidratação capilar', '8 €'], ['Barba com Toalha Quente', '13 €']],
    ],
  },
  es: {
    eyebrow: 'Lo que ofrecemos',
    title: 'Nuestros precios',
    description: 'Servicios y precios de Golden Hands.',
    columns: [
      [['Corte & Style', '17 €'], ['Corte & Style + Barba', '22 €'], ['Corte & Style + Sobrancelha c/navalha', '20 €'], ['Corte + Barba + Sobrancelha', '25 €'], ['Corte + Barba com Toalha Quente', '27 €'], ['Patilha + Barba', '12 €']],
      [['Barba', '8 €'], ['Sobrancelha c/navalha', '6 €'], ['Patilha', '8 €'], ['Hidratação capilar', '8 €'], ['Barba com Toalha Quente', '13 €']],
    ],
  },
};

export function PricingSection() {
  const { language } = useI18n();
  const t = pricingCopy[language];

  return (
    <>
      <GallerySection />
      <section className="atelier-section pricing-section" aria-labelledby="pricing-title">
        <div className="section-shell">
          <div className="pricing-header">
            <div className="pricing-heading-block">
              <p className="pricing-eyebrow" data-reveal="fade-up" data-reveal-delay={0}>{t.eyebrow}</p>
              <h2 className="pricing-title" id="pricing-title" data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2>
            </div>
            <p className="pricing-description" data-reveal="fade-up" data-reveal-delay={1}>{t.description}</p>
          </div>
          <div className="pricing-grid">
            {t.columns.map((column, columnIndex) => (
              <div className="pricing-column" key={`pricing-column-${columnIndex + 1}`}>
                {column.map(([name, price], rowIndex) => (
                  <div className="pricing-row" key={`${name}-${price}`} data-reveal="fade-up" data-reveal-delay={rowIndex}>
                    <span className="pricing-service-name">{name}</span>
                    <span className="pricing-leader" aria-hidden="true" />
                    <span className="pricing-price">{price}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
