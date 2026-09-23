'use client';

import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import { useI18n, type LanguageCode } from '@/i18n';
import { LanguageSwitcher } from './language-switcher';
import { demoLocation } from '@/data/demo-location';
import './inner-pages.css';

const image = (name: string, params = 'scale-down-to=2048') =>
  `https://framerusercontent.com/images/${name}.jpg?${params}`;

type PageKey = 'about' | 'services' | 'contact';

const navCopy: Record<LanguageCode, { home: string; services: string; about: string; contact: string; call: string; primary: string; open: string; close: string; copyright: string }> = {
  pt: { home: 'Início', services: 'Serviços', about: 'Sobre', contact: 'Contato', call: 'Ligar agora', primary: 'Navegação principal', open: 'Abrir menu', close: 'Fechar menu', copyright: 'Todos os direitos reservados.' },
  en: { home: 'Home', services: 'Services', about: 'About', contact: 'Contact', call: 'Call Now', primary: 'Primary navigation', open: 'Open menu', close: 'Close menu', copyright: 'All rights reserved.' },
  es: { home: 'Inicio', services: 'Servicios', about: 'Nosotros', contact: 'Contacto', call: 'Llamar ahora', primary: 'Navegación principal', open: 'Abrir menú', close: 'Cerrar menú', copyright: 'Todos los derechos reservados.' },
};

function useNavigation() {
  const { language } = useI18n();
  const t = navCopy[language];
  return { t, navigation: [[t.home, '/'], [t.services, '/services'], [t.about, '/about'], [t.contact, '/contact']] as const };
}

function InnerHeader({ current }: { current: PageKey }) {
  const [open, setOpen] = useState(false);
  const { t, navigation } = useNavigation();
  return (
    <header className="inner-header">
      <a className="inner-brand" href="/"><img className="golden-hands-logo" src="/images/golden-hands-logo.jpeg" alt="Golden Hands Barbershop" /></a>
      <nav className="inner-nav" aria-label={t.primary}>
        {navigation.map(([label, href]) => <a key={href} href={href} aria-current={href === `/${current}` ? 'page' : undefined}>{label}</a>)}
      </nav>
      <div className="inner-header-actions">
        <LanguageSwitcher />
        <a className="inner-call" href="tel:+351217931653">{t.call} <ArrowRight size={14} /></a>
      </div>
      <button className="inner-menu-button" type="button" aria-label={open ? t.close : t.open} onClick={() => setOpen((value) => !value)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
      <div className={`inner-mobile-menu ${open ? 'open' : ''}`}>
        {navigation.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <a href="tel:+351217931653" onClick={() => setOpen(false)}>{t.call}</a>
      </div>
    </header>
  );
}

function InnerMetrics() {
  const { language } = useI18n();
  const labels = language === 'pt' ? ['Portugal', 'Av. João XXI', 'Seg–Sex', 'Encerrado'] : language === 'es' ? ['Portugal', 'Av. João XXI', 'Lun–Vie', 'Cerrado'] : ['Portugal', 'João XXI Ave.', 'Mon–Fri', 'Closed'];
  const items = [['LISBOA', labels[0]], ['72B', labels[1]], ['10h–20h', labels[2]], ['DOM', labels[3]]];
  return <section className="inner-metrics"><div className="section-shell inner-metrics-grid">{items.map(([value, label]) => <div className="inner-metric" key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>;
}

function InnerFooter() {
  const { t, navigation } = useNavigation();
  return (
    <footer className="inner-footer">
      <div className="section-shell inner-footer-main"><div><strong><img className="golden-hands-logo" src="/images/golden-hands-logo.jpeg" alt="Golden Hands Barbershop" /></strong><span>Barbers · Lisboa</span></div><a href="tel:+351217931653">+351 217 931 653</a></div>
      <div className="section-shell inner-footer-bottom"><span>© 2026 Golden Hands. {t.copyright}</span><div className="inner-footer-links">{navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div></div>
    </footer>
  );
}

function InnerHero({ eyebrow, title, description, src }: { eyebrow: string; title: string; description: string; src: string }) {
  return <section className="inner-hero"><img src={src} alt="Imagem ilustrativa de barbearia" /><div className="inner-hero-copy"><div className="inner-kicker">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div></section>;
}

export function AboutPage() {
  return (
    <main className="inner-site">
      <InnerHeader current="about" />
      <InnerHero eyebrow="Golden Hands" title="Sobre a barbearia" description="Cortes, barba e cuidados masculinos em Lisboa." src={image('odHeYERnwVXDnc8B02KIbADP4')} />
      <section className="inner-section"><div className="section-shell inner-grid-2"><div className="inner-copy"><div className="inner-kicker">Golden Hands</div><h2>Na Galeria Via Veneto</h2><p>A Golden Hands oferece cortes de cabelo, serviços de barba e cuidados masculinos em Lisboa.</p><p>Entre os serviços estão coloração masculina, hidratação capilar e cuidados faciais.</p><div className="inner-note">Marcação online disponível</div></div><div className="inner-image-frame"><img src={image('1b4YIzAnOouRo2k0mAp3rCFB5Q')} alt="Barbeiro em imagem ilustrativa" loading="lazy" /></div></div></section>
      <section className="inner-section alt"><div className="section-shell"><div className="inner-centered"><div className="inner-kicker">Serviços</div><h2>Corte, barba e cuidado.</h2></div><div className="values-grid">{[['01', 'Cortes', 'Cortes de cabelo e diferentes opções de acabamento.'], ['02', 'Barba', 'Barba alinhada, desenhada, aparada ou removida.'], ['03', 'Cuidados', 'Hidratação capilar, coloração masculina e cuidados faciais.']].map(([number, title, body]) => <article className="value-card" key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></div></section>
      <section className="inner-section"><div className="section-shell contact-layout"><div className="inner-copy"><div className="inner-kicker">Onde estamos</div><h2>{demoLocation.address.full}</h2><p>{demoLocation.hours.pt}</p><a className="gold-button" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowRight size={14} /></a></div><a className="inner-map" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer"><img src={image('8kU6qS7pkNXrrBcNtOdv1qorU')} alt="Golden Hands" loading="lazy" /><div className="map-card"><strong>Golden Hands</strong><span>Av. João XXI 72B, Lisboa</span></div></a></div></section>
      <InnerMetrics /><InnerFooter />
    </main>
  );
}

export function ServicesPage() {
  const cards = [
    { price: '17 €', title: 'Corte & Style', body: 'Corte e lavagem opcional.', expect: '50 min', src: image('N2WiUItXHzq3pVso0NMy3nJfbw') },
    { price: '22 €', title: 'Corte & Style + Barba', body: 'Corte com barba alinhada, desenhada, aparada ou removida.', expect: '60 min', src: image('8kU6qS7pkNXrrBcNtOdv1qorU') },
    { price: '8 €', title: 'Barba', body: 'Barba alinhada, desenhada, aparada ou removida.', expect: '20 min', src: image('L7O72RaIUlKcUL0Ee0w8GWHWTdw') },
    { price: '13 €', title: 'Barba com toalha quente', body: 'Serviço de barba com toalha quente.', expect: '30 min', src: image('KKaVDUSPNEebhUYqUAQHmKgYM') },
  ];
  return (
    <main className="inner-site">
      <InnerHeader current="services" /><InnerHero eyebrow="Serviços" title="Serviços Golden Hands" description="Cortes, barba e cuidados masculinos." src={image('PaN26fmUFDFXpMRknfRImO1iv0')} />
      <section className="inner-section"><div className="section-shell"><div className="price-list">{cards.map((card) => <article className="price-card" key={card.title}><div className="price-image"><img src={card.src} alt={card.title} loading="lazy" /></div><div className="price-copy"><span className="price">{card.price}</span><h3>{card.title}</h3><p>{card.body}</p><p className="expect"><strong>Duração:</strong> {card.expect}</p><a href={demoLocation.phone.href}>Ligar para consultar <ArrowRight size={14} /></a></div></article>)}</div></div></section>
      <InnerMetrics /><InnerFooter />
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="inner-site">
      <InnerHeader current="contact" /><InnerHero eyebrow="Contato" title="Visite a Golden Hands" description="Galeria Via Veneto, Lisboa." src={image('1b4YIzAnOouRo2k0mAp3rCFB5Q')} />
      <section className="inner-section"><div className="section-shell contact-layout"><div className="inner-copy"><div className="inner-kicker">Golden Hands</div><h2>Na Av. João XXI, em Lisboa.</h2><div className="contact-blocks"><div className="contact-block"><span>Endereço</span><p>{demoLocation.address.line1}<br />{demoLocation.address.line2}</p></div><div className="contact-block"><span>Telefone</span><a href="tel:+351217931653">+351 217 931 653</a><small>Telefone de contato</small></div><div className="contact-block"><span>Horários</span><p>{demoLocation.hours.pt}</p></div></div><a className="gold-button" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer">Como chegar <ArrowRight size={14} /></a><div className="inner-note">Sábado: horário a confirmar.</div></div><a className="inner-map" href={demoLocation.googleMaps.directionsUrl} target="_blank" rel="noreferrer"><img src={image('odHeYERnwVXDnc8B02KIbADP4')} alt="Imagem ilustrativa de barbearia" loading="lazy" /><div className="map-card"><strong>Golden Hands</strong><span>Av. João XXI 72B, Lisboa</span></div></a></div></section>
      <InnerMetrics /><InnerFooter />
    </main>
  );
}
