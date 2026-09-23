'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Menu, Phone, X } from 'lucide-react';

import { demoLocation } from '@/data/demo-location';
import { heroConfig } from '@/data/hero';
import { useI18n, type LanguageCode } from '@/i18n';
import { LanguageSwitcher } from './language-switcher';
import { LocationMap } from './location-map';
import { PricingSection } from './pricing-section';
import { TeamSection } from './team-section';

const image = (name: string, params = 'scale-down-to=2048') =>
  `https://framerusercontent.com/images/${name}.jpg?${params}`;

const copy: Record<LanguageCode, any> = {
  pt: {
    nav: { home: 'Início', services: 'Serviços', about: 'Sobre', contact: 'Contato', call: 'Ligar agora', primary: 'Navegação principal', open: 'Abrir menu', close: 'Fechar menu' },
    hero: { eyebrow: 'Barbearia premium · Melbourne', tagline: 'Cortes precisos. Linhas limpas. Entre e saia com o seu melhor visual — sempre.', directions: 'Como chegar', call: 'Ligar agora', scroll: 'Role' },
    metrics: [['LISBOA', 'Portugal'], ['JOÃO XXI', 'Av. 72B'], ['SEG–SEX', '10h–20h'], ['DOMINGO', 'Encerrado']],
    services: {
      eyebrow: 'O que fazemos', title: 'Serviços Golden Hands', subtitle: 'Cada serviço é realizado com foco, técnica e cuidado.',
      items: [['01', 'Cortes', 'Corte & Style, com lavagem opcional.'], ['02', 'Degradês', 'Cortes com diferentes opções de acabamento.'], ['03', 'Barba', 'Barba alinhada, desenhada, aparada ou removida.'], ['04', 'Finalização', 'Hidratação capilar e cuidados complementares.']],
      action: 'Consultar',
    },
    experience: { eyebrow: 'A experiência', lead: 'Na Galeria Via Veneto, a Golden Hands reúne cortes, barba e cuidados masculinos em Lisboa.', features: ['Cortes de cabelo e barba', 'Coloração masculina', 'Limpeza de pele e cuidados faciais', 'Marcação online disponível'], open: 'Seg–Sex 10h–20h', welcome: 'Sábado: horário a confirmar' },
    reviews: { eyebrow: 'O que dizem', title: 'Avaliações de clientes', google: 'Avaliação Google' },
    location: { eyebrow: 'Onde estamos', title: 'Em Lisboa.', address: 'Endereço', phone: 'Telefone', hours: 'Horários', directions: 'Como chegar', map: 'Abrir Golden Hands no Maps' },
    footer: { subtitle: 'Barbers · Lisboa', copyright: 'Todos os direitos reservados.' },
  },
  en: {
    nav: { home: 'Home', services: 'Services', about: 'About', contact: 'Contact', call: 'Call Now', primary: 'Primary navigation', open: 'Open menu', close: 'Close menu' },
    hero: { eyebrow: 'Premium Barbers · Melbourne', tagline: 'Sharp cuts. Clean lines. Walk in, walk out looking your best — every single time.', directions: 'Get Directions', call: 'Call Now', scroll: 'Scroll' },
    metrics: [['LISBON', 'Portugal'], ['JOÃO XXI', 'Ave. 72B'], ['MON–FRI', '10am–8pm'], ['SUNDAY', 'Closed']],
    services: { eyebrow: 'What We Do', title: 'Golden Hands Services', subtitle: 'Every service performed with focus, craft, and care.', items: [['01', 'Haircuts', 'Cut and optional wash.'], ['02', 'Fades', 'Haircuts with a choice of finishes.'], ['03', 'Beard', 'Beard shaping, trimming or shaving.'], ['04', 'Care', 'Hair hydration and complementary services.']], action: 'Enquire' },
    experience: { eyebrow: 'The experience', lead: 'At Galeria Via Veneto, Golden Hands offers haircuts, beard grooming and men’s care in Lisbon.', features: ['Haircuts and beard grooming', 'Men’s hair coloring', 'Facial care', 'Online booking available'], open: 'Mon–Fri 10am–8pm', welcome: 'Saturday hours to be confirmed' },
    reviews: { eyebrow: 'What People Say', title: 'Customer reviews', google: 'Google Review' },
    location: { eyebrow: 'Find Us', title: 'In Lisbon.', address: 'Address', phone: 'Phone', hours: 'Hours', directions: 'Get Directions', map: 'Open Golden Hands in Maps' },
    footer: { subtitle: 'Barbers · Lisbon', copyright: 'All rights reserved.' },
  },
  es: {
    nav: { home: 'Inicio', services: 'Servicios', about: 'Nosotros', contact: 'Contacto', call: 'Llamar ahora', primary: 'Navegación principal', open: 'Abrir menú', close: 'Cerrar menú' },
    hero: { eyebrow: 'Barbería premium · Melbourne', tagline: 'Cortes precisos. Líneas limpias. Entra y sal con tu mejor imagen — siempre.', directions: 'Cómo llegar', call: 'Llamar ahora', scroll: 'Desliza' },
    metrics: [['LISBOA', 'Portugal'], ['JOÃO XXI', 'Av. 72B'], ['LUN–VIE', '10–20h'], ['DOMINGO', 'Cerrado']],
    services: { eyebrow: 'Lo que hacemos', title: 'Servicios Golden Hands', subtitle: 'Cada servicio se realiza con enfoque, técnica y cuidado.', items: [['01', 'Cortes', 'Corte con lavado opcional.'], ['02', 'Degradados', 'Cortes con diferentes acabados.'], ['03', 'Barba', 'Perfilado, recorte o afeitado.'], ['04', 'Cuidados', 'Hidratación capilar y servicios complementarios.']], action: 'Consultar' },
    experience: { eyebrow: 'La experiencia', lead: 'En la Galeria Via Veneto, Golden Hands ofrece cortes, barba y cuidados masculinos en Lisboa.', features: ['Cortes y barba', 'Coloración masculina', 'Cuidado facial', 'Reserva online disponible'], open: 'Lun–Vie 10–20h', welcome: 'Horario del sábado por confirmar' },
    reviews: { eyebrow: 'Lo que dicen', title: 'Opiniones de clientes', google: 'Reseña de Google' },
    location: { eyebrow: 'Encuéntranos', title: 'En Lisboa.', address: 'Dirección', phone: 'Teléfono', hours: 'Horario', directions: 'Cómo llegar', map: 'Abrir Golden Hands en Maps' },
    footer: { subtitle: 'Barbers · Lisboa', copyright: 'Todos los derechos reservados.' },
  },
};

const serviceImages = ['/images/services/cortes.jpeg', '/images/services/degrades.jpeg', '/images/services/barba.jpeg', '/images/services/finalizacao.jpeg'];

const reviews = [
  { quote: 'Magnífico. Com certeza voltarei para o próximo corte.', name: 'Luís' },
  { quote: 'Top top o melhor', name: 'Rafael' },
];

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;
    const isMobile = window.matchMedia('(max-width: 809px)').matches;
    const staggerStep = isMobile ? 70 : 100;
    const maxDelay = isMobile ? 280 : 500;
    nodes.forEach((node) => {
      const step = Number(node.dataset['revealDelay'] ?? 0);
      node.style.setProperty('--reveal-delay', `${Math.min(Math.max(step, 0) * staggerStep, maxDelay)}ms`);
    });
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.setAttribute('data-visible', 'true'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).setAttribute('data-visible', 'true');
        observer.unobserve(entry.target);
      });
    }, { root: null, threshold: 0.08, rootMargin: '0px 0px -8% 0px' });
    const frame = window.requestAnimationFrame(() => nodes.forEach((node) => observer.observe(node)));
    return () => { window.cancelAnimationFrame(frame); observer.disconnect(); };
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const { language } = useI18n();
  const t = copy[language].nav;
  return (
    <header className="atelier-header">
      <a className="atelier-brand" href="/" aria-label="Golden Hands, início"><img className="golden-hands-logo" src="/images/golden-hands-logo.jpeg" alt="Golden Hands Barbershop" /></a>
      <nav className="atelier-nav" aria-label={t.primary}><a href="/">{t.home}</a><a href="/services">{t.services}</a><a href="/about">{t.about}</a><a href="/contact">{t.contact}</a></nav>
      <div className="header-actions"><LanguageSwitcher /><a className="header-call" href={demoLocation.phone.href}><span>{t.call}</span><ArrowRight size={15} strokeWidth={1.8} /></a></div>
      <button className="menu-button" type="button" aria-label={open ? t.close : t.open} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`}><a href="/" onClick={() => setOpen(false)}>{t.home}</a><a href="/services" onClick={() => setOpen(false)}>{t.services}</a><a href="/about" onClick={() => setOpen(false)}>{t.about}</a><a href="/contact" onClick={() => setOpen(false)}>{t.contact}</a><a href={demoLocation.phone.href} onClick={() => setOpen(false)}>{t.call}</a></div>
    </header>
  );
}

function Eyebrow({ children, centered = false, revealDelay }: { children: React.ReactNode; centered?: boolean; revealDelay?: number }) {
  return <div className={`atelier-eyebrow ${centered ? 'is-centered' : ''}`} data-reveal={revealDelay === undefined ? undefined : 'fade-up'} data-reveal-delay={revealDelay}><span aria-hidden="true" /><p>{children}</p>{centered ? <span aria-hidden="true" /> : null}</div>;
}

function Metrics() {
  const { language } = useI18n();
  return <section className="metrics-strip" aria-label="Informações Golden Hands"><div className="section-shell metrics-grid">{copy[language].metrics.map(([value, label]: string[], index: number) => <div className="metric-item" key={label} data-reveal="fade-up" data-reveal-delay={index}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

function HeroMarquee() {
  const { language } = useI18n();
  const items = heroConfig.locales[language].marqueeItems;
  return (
    <div className="hero-marquee" aria-label={items.join(', ')}>
      <div className="hero-marquee-track">
        {[0, 1].map((group) => (
          <div className="hero-marquee-group" aria-hidden={group === 1} key={group}>
            {items.map((item) => <span className="hero-marquee-item" key={`${group}-${item}`}>{item}<i aria-hidden="true" /></span>)}
          </div>
        ))}
      </div>
    </div>
  );
}

function Services() {
  const { language } = useI18n();
  const t = copy[language].services;
  const [activeService, setActiveService] = useState(0);
  const totalServices = t.items.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveService((current) => (current + 1) % totalServices);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [totalServices]);

  const goPrevious = () => {
    setActiveService((current) => (current - 1 + totalServices) % totalServices);
  };

  const goNext = () => {
    setActiveService((current) => (current + 1) % totalServices);
  };

  const navigationLabel =
    language === 'en' ? 'Service navigation' : language === 'es' ? 'Navegación de servicios' : 'Navegação de serviços';
  const previousLabel =
    language === 'en' ? 'Previous service' : language === 'es' ? 'Servicio anterior' : 'Serviço anterior';
  const nextLabel =
    language === 'en' ? 'Next service' : language === 'es' ? 'Siguiente servicio' : 'Próximo serviço';

  return (
    <section className="atelier-section services-section" id="services">
      <div className="section-shell services-shell">
        <div className="section-heading centered services-heading">
          <Eyebrow centered revealDelay={0}>{t.eyebrow}</Eyebrow>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2>
          <p data-reveal="fade-up" data-reveal-delay={2}>{t.subtitle}</p>
        </div>

        <div className="services-grid">
          {t.items.map(([number, title, body]: string[], index: number) => {
            const isActive = activeService === index;
            return (
              <a
                className={`service-card ${isActive ? 'is-active' : 'is-muted'}`}
                href="#galeria-cortes"
                key={number}
                data-reveal="card"
                data-reveal-delay={index}
                aria-current={isActive ? 'true' : undefined}
              >
                <img src={serviceImages[index]} alt={`${title} na Golden Hands` loading="lazy" />
                <span className="service-shade" aria-hidden="true" />
                <span className="service-number">{number}</span>
                <div className="service-copy">
                  <h3>{title}</h3>
                  <p>{body}</p>
                  <span className="service-link">{t.action} <ArrowRight size={15} /></span>
                </div>
              </a>
            );
          })}
        </div>

        <div className="services-navigation" aria-label={navigationLabel}>
          <div className="services-navigation-left">
            <div className="services-arrow-group">
              <button className="services-arrow" type="button" aria-label={previousLabel} onClick={goPrevious}>
                <ArrowLeft size={19} strokeWidth={1.5} />
              </button>
              <button className="services-arrow is-primary" type="button" aria-label={nextLabel} onClick={goNext}>
                <ArrowRight size={19} strokeWidth={1.5} />
              </button>
            </div>
            <div className="services-pagination" aria-hidden="true">
              {t.items.map((_: string[], index: number) => (
                <span className={index === activeService ? 'is-active' : ''} key={index} />
              ))}
            </div>
          </div>
          <div className="services-counter" aria-live="polite">
            <span>{String(activeService + 1).padStart(2, '0')}</span>
            <i>/</i>
            <span>{String(totalServices).padStart(2, '0')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const { language } = useI18n();
  const t = copy[language].experience;
  return <section className="atelier-section experience-section" id="about"><div className="section-shell experience-grid"><div className="experience-copy"><Eyebrow revealDelay={0}>{t.eyebrow}</Eyebrow><h2 data-reveal="fade-up" data-reveal-delay={1}>{language === 'en' ? <>Sharp. Clean.<br />Every Time.</> : language === 'es' ? <>Preciso. Limpio.<br />Siempre.</> : <>Preciso. Limpo.<br />Sempre.</>}</h2><p className="experience-lead" data-reveal="fade-up" data-reveal-delay={2}>{t.lead}</p><div className="feature-list">{t.features.map((feature: string, index: number) => <div className="feature-item" key={feature} data-reveal="fade-up" data-reveal-delay={index + 2}><span><Check size={14} strokeWidth={2} /></span><p>{feature}</p></div>)}</div><div className="experience-hours" data-reveal="fade-up" data-reveal-delay={5}><div><strong>{t.open}</strong><span>{t.welcome}</span></div></div></div><div className="experience-media" data-reveal="media" data-reveal-delay={1}><img src={image('PaN26fmUFDFXpMRknfRImO1iv0', 'scale-down-to=2048')} alt="Detalhes de barbearia" loading="lazy" /><span className="experience-frame" aria-hidden="true" /></div></div></section>;
}

function Reviews() {
  const { language } = useI18n();
  const t = copy[language].reviews;
  return <section className="atelier-section reviews-section"><div className="section-shell"><div className="section-heading centered"><Eyebrow centered revealDelay={0}>{t.eyebrow}</Eyebrow><h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2></div><div className="reviews-grid">{reviews.map((review, index) => <article className="review-card" key={review.name} data-reveal="card" data-reveal-delay={index}><div className="review-stars">★★★★★</div><p>“{review.quote}”</p><div className="review-author"><strong>{review.name}</strong><span>{'Avaliação fornecida'</span></div></article>)}</div></div></section>;
}

function Location() {
  const { language } = useI18n();
  const t = copy[language].location;
  return <section className="atelier-section location-section" id="contact"><div className="section-shell location-grid"><div className="location-copy"><Eyebrow revealDelay={0}>{t.eyebrow}</Eyebrow><h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2><div className="contact-details" data-reveal="fade-up" data-reveal-delay={2}><div><span className="contact-label">{t.address}</span><p>{demoLocation.address.line1}<br />{demoLocation.address.line2}</p></div><div><span className="contact-label">{t.phone}</span><a href={demoLocation.phone.href}>{demoLocation.phone.display}</a></div><div><span className="contact-label">{t.hours}</span><p>{demoLocation.hours[language]}</p></div></div><div data-reveal="fade-up" data-reveal-delay={3}><a className="gold-button" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer">{t.directions} <ArrowRight size={15} /></a></div></div><LocationMap ariaLabel={t.map} /></div></section>;
}

function Footer() {
  const { language } = useI18n();
  const t = copy[language];
  return <footer className="atelier-footer"><div className="section-shell footer-top" data-reveal="fade-up" data-reveal-delay={0}><div><strong className="footer-wordmark"><img className="golden-hands-logo" src="/images/golden-hands-logo.jpeg" alt="Golden Hands Barbershop" /></strong><span>{t.footer.subtitle}</span></div><a href={demoLocation.phone.href}><Phone size={14} /> {demoLocation.phone.display}</a></div><div className="section-shell footer-bottom" data-reveal="fade-up" data-reveal-delay={1}><span>© 2026 Golden Hands. {t.footer.copyright}</span><div><a href="/">{t.nav.home}</a><a href="/services">{t.nav.services}</a><a href="/about">{t.nav.about}</a><a href="/contact">{t.nav.contact}</a></div></div></footer>;
}

export function LandingPage() {
  useReveal();
  const { language } = useI18n();
  const hero = heroConfig.locales[language];
  return <main className="atelier-site" id="top"><Header /><section className="hero-section"><div className="hero-content"><div className="hero-copy"><div className="hero-motion" data-hero-step="0"><Eyebrow>{hero.eyebrow}</Eyebrow></div><h1 className="hero-title" aria-label={hero.headline.join(' ')}>{hero.headline.map((line, index) => <span className={`hero-title-line hero-motion ${index === 2 ? 'title-stroke' : ''}`} data-hero-step={index + 1} aria-hidden="true" key={line}>{line}</span>)}</h1><p className="hero-tagline hero-motion" data-hero-step="4">{hero.description}</p><div className="hero-actions hero-motion" data-hero-step="5"><a className="gold-button" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer">{hero.directions} <ArrowRight size={15} /></a><a className="ghost-button" href={demoLocation.phone.href}>{hero.call}</a></div></div></div><div className="hero-image-panel"><img className="hero-image" src={heroConfig.image.src} srcSet={heroConfig.image.srcSet} sizes="(max-width: 809px) 100vw, 54vw" alt={heroConfig.image.alt[language]} fetchPriority="high" /><div className="hero-image-blend" aria-hidden="true" /></div><div className="hero-noise" aria-hidden="true" /></section><HeroMarquee /><Metrics /><Services /><PricingSection /><TeamSection /><Experience /><Reviews /><Location /><Footer /></main>;
}
