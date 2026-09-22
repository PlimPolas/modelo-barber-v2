'use client';

import { useI18n, type LanguageCode } from '@/i18n';

const pricingCopy: Record<LanguageCode, { eyebrow: string; title: string; description: string; columns: string[][][] }> = {
  pt: {
    eyebrow: 'O que oferecemos',
    title: 'Nossos preços',
    description: 'Uma experiência de grooming premium com serviços pensados para você. Preços claros e alinhados ao valor entregue.',
    columns: [
      [['Corte personalizado', '$25'], ['Degradê moderno', '$30'], ['Barba e desenho', '$20'], ['Barbear com toalha quente', '$35'], ['Grooming executivo', '$45'], ['Cor e mechas', '$50'], ['Tratamento capilar', '$25']],
      [['Facial refrescante', '$40'], ['Realce de cor', '$35'], ['Lavagem e escova', '$25'], ['Corte infantil (até 12)', '$20'], ['Especial sênior', '$15'], ['Raspagem completa', '$20'], ['Consultoria personalizada', 'Grátis']],
    ],
  },
  en: {
    eyebrow: 'What We Offer',
    title: 'Our Prices',
    description: 'Experience luxury grooming with our diverse services designed just for you. Discover clear pricing aligned with the value you get.',
    columns: [
      [['Tailored Haircuts', '$25'], ['Modern Fade', '$30'], ['Beard Trim and Sculpt', '$20'], ['Hot Towel Razor Shave', '$35'], ['Executive Grooming', '$45'], ['Color and Highlights', '$50'], ['Hair Treatment', '$25']],
      [['Refreshing Facial', '$40'], ['Hair Color Enhancement', '$35'], ['Shampoo and Blowout', '$25'], ["Kids' Cut (Under 12)", '$20'], ["Senior's Special", '$15'], ['Head Shave', '$20'], ['Custom Consultation', 'Free']],
    ],
  },
  es: {
    eyebrow: 'Lo que ofrecemos',
    title: 'Nuestros precios',
    description: 'Una experiencia de grooming premium con servicios pensados para ti. Precios claros y alineados con el valor que recibes.',
    columns: [
      [['Corte personalizado', '$25'], ['Degradado moderno', '$30'], ['Barba y diseño', '$20'], ['Afeitado con toalla caliente', '$35'], ['Grooming ejecutivo', '$45'], ['Color y mechas', '$50'], ['Tratamiento capilar', '$25']],
      [['Facial refrescante', '$40'], ['Realce de color', '$35'], ['Lavado y secado', '$25'], ['Corte infantil (hasta 12)', '$20'], ['Especial senior', '$15'], ['Afeitado de cabeza', '$20'], ['Consulta personalizada', 'Gratis']],
    ],
  },
};

export function PricingSection() {
  const { language } = useI18n();
  const t = pricingCopy[language];

  return (
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
  );
}
