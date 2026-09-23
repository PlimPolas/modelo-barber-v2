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
    metrics: [['4.5 ★', 'Avaliação Google'], ['245+', 'Avaliações verificadas'], ['BARBER ST', 'Melbourne CBD'], ['SEM HORA', 'Sempre bem-vindo']],
    services: {
      eyebrow: 'O que fazemos', title: 'Serviços de precisão', subtitle: 'Cada serviço é realizado com foco, técnica e cuidado.',
      items: [['01', 'Cortes', 'Do clássico ao contemporâneo — preciso, limpo e feito para você.'], ['02', 'Degradês', 'Skin, mid e high fades executados com precisão e consistência.'], ['03', 'Barba', 'Contorno, desenho e acabamento para um resultado definido.'], ['04', 'Finalização', 'Cera, clay ou pomada — orientação de produto e styling incluídos.']],
      action: 'Consultar',
    },
    experience: { eyebrow: 'A experiência', lead: 'Entrar na Atelier Barbers é entrar em uma barbearia no CBD que leva o ofício a sério. Sem pressa, sem atalhos — apenas atendimento focado e resultado consistente.', features: ['Cortes precisos para o formato do seu rosto', 'Atendimento sem agendamento', 'No coração de Melbourne CBD', 'Barbeiros experientes, resultados consistentes'], open: 'Aberto Seg–Sáb', welcome: 'Atendimento sem hora marcada' },
    reviews: { eyebrow: 'O que dizem', title: 'Confiança em Melbourne', google: 'Avaliação Google' },
    location: { eyebrow: 'Onde estamos', title: 'Estamos no CBD.', address: 'Endereço', phone: 'Telefone', hours: 'Horários', directions: 'Como chegar', map: 'Abrir Atelier Barbers no Maps' },
    footer: { subtitle: 'Barbers · Melbourne', copyright: 'Todos os direitos reservados.' },
  },
  en: {
    nav: { home: 'Home', services: 'Services', about: 'About', contact: 'Contact', call: 'Call Now', primary: 'Primary navigation', open: 'Open menu', close: 'Close menu' },
    hero: { eyebrow: 'Premium Barbers · Melbourne', tagline: 'Sharp cuts. Clean lines. Walk in, walk out looking your best — every single time.', directions: 'Get Directions', call: 'Call Now', scroll: 'Scroll' },
    metrics: [['4.5 ★', 'Google Rating'], ['245+', 'Verified Reviews'], ['BARBER ST', 'Melbourne CBD'], ['WALK IN', 'Always Welcome']],
    services: { eyebrow: 'What We Do', title: 'Precision Services', subtitle: 'Every service performed with focus, craft, and care.', items: [['01', 'Haircuts', 'Classic cuts to contemporary styles — sharp, clean, tailored to you.'], ['02', 'Fades', 'Skin, mid, and high fades executed with precision and consistency.'], ['03', 'Beard Trims', 'Line-ups, shaping, and grooming for a crisp, defined finish.'], ['04', 'Styling', 'Wax, clay, pomade — product advice and finish styling included.']], action: 'Enquire' },
    experience: { eyebrow: 'The Experience', lead: 'Walk into Atelier Barbers and you step into a CBD barber shop that takes its craft seriously. No rush, no shortcuts — just focused, expert service that sends you out looking sharp.', features: ['Precision cuts tailored to your face shape', 'Walk-in friendly — no booking required', 'Right in the heart of Melbourne CBD', 'Experienced barbers, consistent results'], open: 'Open Mon-Sat', welcome: 'Walk-ins always welcome' },
    reviews: { eyebrow: 'What People Say', title: 'Trusted by Melbourne', google: 'Google Review' },
    location: { eyebrow: 'Find Us', title: 'We’re in the CBD.', address: 'Address', phone: 'Phone', hours: 'Hours', directions: 'Get Directions', map: 'Open Atelier Barbers in Maps' },
    footer: { subtitle: 'Barbers · Melbourne', copyright: 'All rights reserved.' },
  },
  es: {
    nav: { home: 'Inicio', services: 'Servicios', about: 'Nosotros', contact: 'Contacto', call: 'Llamar ahora', primary: 'Navegación principal', open: 'Abrir menú', close: 'Cerrar menú' },
    hero: { eyebrow: 'Barbería premium · Melbourne', tagline: 'Cortes precisos. Líneas limpias. Entra y sal con tu mejor imagen — siempre.', directions: 'Cómo llegar', call: 'Llamar ahora', scroll: 'Desliza' },
    metrics: [['4.5 ★', 'Valoración Google'], ['245+', 'Reseñas verificadas'], ['BARBER ST', 'Melbourne CBD'], ['SIN CITA', 'Siempre bienvenido']],
    services: { eyebrow: 'Lo que hacemos', title: 'Servicios de precisión', subtitle: 'Cada servicio se realiza con enfoque, técnica y cuidado.', items: [['01', 'Cortes', 'Del clásico al contemporáneo — preciso, limpio y hecho para ti.'], ['02', 'Degradados', 'Skin, mid y high fades ejecutados con precisión y consistencia.'], ['03', 'Barba', 'Perfilado, forma y cuidado para un acabado limpio y definido.'], ['04', 'Styling', 'Cera, clay o pomada — asesoría de producto y acabado incluidos.']], action: 'Consultar' },
    experience: { eyebrow: 'La experiencia', lead: 'Entrar en Atelier Barbers es entrar en una barbería del CBD que se toma el oficio en serio. Sin prisas ni atajos — solo atención experta y resultados consistentes.', features: ['Cortes precisos según la forma de tu rostro', 'Sin cita previa', 'En pleno corazón de Melbourne CBD', 'Barberos experimentados, resultados consistentes'], open: 'Abierto Lun–Sáb', welcome: 'Siempre aceptamos clientes sin cita' },
    reviews: { eyebrow: 'Lo que dicen', title: 'La confianza de Melbourne', google: 'Reseña de Google' },
    location: { eyebrow: 'Encuéntranos', title: 'Estamos en el CBD.', address: 'Dirección', phone: 'Teléfono', hours: 'Horario', directions: 'Cómo llegar', map: 'Abrir Atelier Barbers en Maps' },
    footer: { subtitle: 'Barbers · Melbourne', copyright: 'Todos los derechos reservados.' },
  },
};

const serviceImages = [image('N2WiUItXHzq3pVso0NMy3nJfbw'), image('8kU6qS7pkNXrrBcNtOdv1qorU'), image('L7O72RaIUlKcUL0Ee0w8GWHWTdw'), image('KKaVDUSPNEebhUYqUAQHmKgYM')];

const reviews = [
  { quote: 'Best barbershop in the area. Skilled team with great attention to detail and top-notch service. The prices are fair for the quality you get — I wouldn’t go anywhere else.', name: 'James R.' },
  { quote: 'Walked in on a Saturday without a booking and they fit me right in. Best fade I’ve had in years — clean lines, great attention to detail. Will definitely be back every fortnight.', name: 'Marcus T.' },
  { quote: 'Hands down the best barbershop in Melbourne. Showed up with no idea what I wanted and walked out looking sharper than ever. The team genuinely cares about their craft.', name: 'Daniel P.' },
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
      <a className="atelier-brand" href="/" aria-label="Atelier Barbers home"><span className="atelier-brand-main">ATELIER</span><span className="atelier-brand-sub">barbers</span></a>
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
  return <section className="metrics-strip" aria-label="Atelier Barbers highlights"><div className="section-shell metrics-grid">{copy[language].metrics.map(([value, label]: string[], index: number) => <div className="metric-item" key={label} data-reveal="fade-up" data-reveal-delay={index}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
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
                href="/contact"
                key={number}
                data-reveal="card"
                data-reveal-delay={index}
                aria-current={isActive ? 'true' : undefined}
              >
                <img src={serviceImages[index]} alt={`${title} at Atelier Barbers`} loading="lazy" />
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
  return <section className="atelier-section experience-section" id="about"><div className="section-shell experience-grid"><div className="experience-copy"><Eyebrow revealDelay={0}>{t.eyebrow}</Eyebrow><h2 data-reveal="fade-up" data-reveal-delay={1}>{language === 'en' ? <>Sharp. Clean.<br />Every Time.</> : language === 'es' ? <>Preciso. Limpio.<br />Siempre.</> : <>Preciso. Limpo.<br />Sempre.</>}</h2><p className="experience-lead" data-reveal="fade-up" data-reveal-delay={2}>{t.lead}</p><div className="feature-list">{t.features.map((feature: string, index: number) => <div className="feature-item" key={feature} data-reveal="fade-up" data-reveal-delay={index + 2}><span><Check size={14} strokeWidth={2} /></span><p>{feature}</p></div>)}</div><div className="experience-hours" data-reveal="fade-up" data-reveal-delay={5}><div><strong>{t.open}</strong><span>{t.welcome}</span></div></div></div><div className="experience-media" data-reveal="media" data-reveal-delay={1}><img src={image('PaN26fmUFDFXpMRknfRImO1iv0', 'scale-down-to=2048')} alt="Atelier Barbers shop detail" loading="lazy" /><span className="experience-frame" aria-hidden="true" /></div></div></section>;
}

function Reviews() {
  const { language } = useI18n();
  const t = copy[language].reviews;
  return <section className="atelier-section reviews-section"><div className="section-shell"><div className="section-heading centered"><Eyebrow centered revealDelay={0}>{t.eyebrow}</Eyebrow><h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2></div><div className="reviews-grid">{reviews.map((review, index) => <article className="review-card" key={review.name} data-reveal="card" data-reveal-delay={index}><div className="review-stars">★★★★★</div><p>“{review.quote}”</p><div className="review-author"><strong>{review.name}</strong><span>{t.google}</span></div></article>)}</div></div></section>;
}

function Location() {
  const { language } = useI18n();
  const t = copy[language].location;
  return <section className="atelier-section location-section" id="contact"><div className="section-shell location-grid"><div className="location-copy"><Eyebrow revealDelay={0}>{t.eyebrow}</Eyebrow><h2 data-reveal="fade-up" data-reveal-delay={1}>{t.title}</h2><div className="contact-details" data-reveal="fade-up" data-reveal-delay={2}><div><span className="contact-label">{t.address}</span><p>{demoLocation.address.line1}<br />{demoLocation.address.line2}</p></div><div><span className="contact-label">{t.phone}</span><a href={demoLocation.phone.href}>{demoLocation.phone.display}</a></div><div><span className="contact-label">{t.hours}</span><p>{demoLocation.hours[language]}</p></div></div><div data-reveal="fade-up" data-reveal-delay={3}><a className="gold-button" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer">{t.directions} <ArrowRight size={15} /></a></div></div><LocationMap ariaLabel={t.map} /></div></section>;
}

function Footer() {
  const { language } = useI18n();
  const t = copy[language];
  return <footer className="atelier-footer"><div className="section-shell footer-top" data-reveal="fade-up" data-reveal-delay={0}><div><strong className="footer-wordmark">ATELIER</strong><span>{t.footer.subtitle}</span></div><a href={demoLocation.phone.href}><Phone size={14} /> {demoLocation.phone.display}</a></div><div className="section-shell footer-bottom" data-reveal="fade-up" data-reveal-delay={1}><span>© 2026 Atelier Barbers. {t.footer.copyright}</span><div><a href="/">{t.nav.home}</a><a href="/services">{t.nav.services}</a><a href="/about">{t.nav.about}</a><a href="/contact">{t.nav.contact}</a></div></div></footer>;
}

export function LandingPage() {
  useReveal();
  const { language } = useI18n();
  const hero = heroConfig.locales[language];
  return <main className="atelier-site" id="top"><Header /><section className="hero-section"><div className="hero-content"><div className="hero-copy"><div className="hero-motion" data-hero-step="0"><Eyebrow>{hero.eyebrow}</Eyebrow></div><h1 className="hero-title" aria-label={hero.headline.join(' ')}>{hero.headline.map((line, index) => <span className={`hero-title-line hero-motion ${index === 2 ? 'title-stroke' : ''}`} data-hero-step={index + 1} aria-hidden="true" key={line}>{line}</span>)}</h1><p className="hero-tagline hero-motion" data-hero-step="4">{hero.description}</p><div className="hero-actions hero-motion" data-hero-step="5"><a className="gold-button" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer">{hero.directions} <ArrowRight size={15} /></a><a className="ghost-button" href={demoLocation.phone.href}>{hero.call}</a></div></div></div><div className="hero-image-panel"><img className="hero-image" src={heroConfig.image.src} srcSet={heroConfig.image.srcSet} sizes="(max-width: 430px) 43vw, (max-width: 809px) 45vw, 54vw" alt={heroConfig.image.alt[language]} fetchPriority="high" /><div className="hero-image-blend" aria-hidden="true" /></div><div className="hero-noise" aria-hidden="true" /></section><HeroMarquee /><Metrics /><Services /><PricingSection /><TeamSection /><Experience /><Reviews /><Location /><Footer /></main>;
}
