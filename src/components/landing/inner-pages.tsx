'use client';

import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

import './inner-pages.css';

const image = (name: string, params = 'scale-down-to=2048') =>
  `https://framerusercontent.com/images/${name}.jpg?${params}`;

type PageKey = 'about' | 'services' | 'contact';

const navigation = [
  ['Home', '/'],
  ['Services', '/services'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const;

function InnerHeader({ current }: { current: PageKey }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="inner-header">
      <a className="inner-brand" href="/">
        <strong>ATELIER</strong>
        <em>barbers</em>
      </a>
      <nav className="inner-nav" aria-label="Primary navigation">
        {navigation.map(([label, href]) => (
          <a
            key={href}
            href={href}
            aria-current={href === `/${current}` ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="inner-call" href="tel:+61412345678">
        Call Now <ArrowRight size={14} />
      </a>
      <button
        className="inner-menu-button"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div className={`inner-mobile-menu ${open ? 'open' : ''}`}>
        {navigation.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
        <a href="tel:+61412345678" onClick={() => setOpen(false)}>Call Now</a>
      </div>
    </header>
  );
}

function InnerMetrics() {
  const items = [
    ['4.5 ★', 'Google Rating'],
    ['245+', 'Verified Reviews'],
    ['BARBER ST', 'Melbourne CBD'],
    ['WALK IN', 'Welcome'],
  ];
  return (
    <section className="inner-metrics">
      <div className="section-shell inner-metrics-grid">
        {items.map(([value, label]) => (
          <div className="inner-metric" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function InnerFooter() {
  return (
    <footer className="inner-footer">
      <div className="section-shell inner-footer-main">
        <div>
          <strong>ATELIER</strong>
          <span>Barbers · Melbourne</span>
        </div>
        <a href="tel:+61412345678">0412 345 678</a>
      </div>
      <div className="section-shell inner-footer-bottom">
        <span>© 2026 Atelier Barbers. All rights reserved.</span>
        <div className="inner-footer-links">
          {navigation.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
      </div>
    </footer>
  );
}

function InnerHero({ eyebrow, title, description, src }: { eyebrow: string; title: string; description: string; src: string }) {
  return (
    <section className="inner-hero">
      <img src={src} alt="Atelier Barbers" />
      <div className="inner-hero-copy">
        <div className="inner-kicker">{eyebrow}</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <main className="inner-site">
      <InnerHeader current="about" />
      <InnerHero
        eyebrow="Our Story"
        title="Our Craft. Our Shop."
        description="Melbourne’s favourite barbershop, since day one."
        src={image('odHeYERnwVXDnc8B02KIbADP4')}
      />

      <section className="inner-section">
        <div className="section-shell inner-grid-2">
          <div className="inner-copy">
            <div className="inner-kicker">Our Philosophy</div>
            <h2>Precision Over Everything</h2>
            <p>
              Smart Cuts is a professional barbershop in the heart of Melbourne CBD. We believe a great haircut is one of the simplest ways a man can feel his best — and we take that seriously.
            </p>
            <p>
              Walk-in friendly and open Mon–Sat, we serve Melbourne professionals, students, and locals who demand consistency. No booking stress. Just show up.
            </p>
            <div className="inner-note">Rated 4.5 stars across 245+ Google reviews</div>
          </div>
          <div className="inner-image-frame">
            <img src={image('1b4YIzAnOouRo2k0mAp3rCFB5Q')} alt="Barber at Atelier Barbers" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="inner-section alt">
        <div className="section-shell">
          <div className="inner-centered">
            <div className="inner-kicker">What We Stand For</div>
            <h2>Built around the details.</h2>
          </div>
          <div className="values-grid">
            {[
              ['01', 'Precision', 'Every line, every fade, every detail checked before you leave the chair.'],
              ['02', 'Craft', 'Years of technique behind every session. Scissors, clippers — we know them both.'],
              ['03', 'Convenience', 'Walk in anytime. No appointment needed. Open across the week in Melbourne CBD.'],
            ].map(([number, title, body]) => (
              <article className="value-card" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="inner-section">
        <div className="section-shell contact-layout">
          <div className="inner-copy">
            <div className="inner-kicker">Find Us</div>
            <h2>12 Barber St, Melbourne VIC 3000</h2>
            <p>Mon–Fri 10am–6pm · Sat 10am–4pm · Sun Closed</p>
            <a className="gold-button" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
              Get Directions <ArrowRight size={14} />
            </a>
          </div>
          <a className="inner-map" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
            <img src={image('8kU6qS7pkNXrrBcNtOdv1qorU')} alt="Atelier Barbers" loading="lazy" />
            <div className="map-card"><strong>Atelier Barbers</strong><span>Melbourne CBD</span></div>
          </a>
        </div>
      </section>

      <InnerMetrics />
      <InnerFooter />
    </main>
  );
}

export function ServicesPage() {
  const cards = [
    {
      price: 'From $45',
      title: 'Classic Haircuts',
      body: 'Precision scissor and clipper work tailored to your face shape and lifestyle. From textured crops to timeless side-parts — we deliver consistent, sharp results every time.',
      expect: 'Consultation, wash, cut, style, finish.',
      src: image('N2WiUItXHzq3pVso0NMy3nJfbw'),
    },
    {
      price: 'From $50',
      title: 'Fades & Tapers',
      body: 'Skin fades, mid fades, high fades — our barbers blend with zero room for error. Clean lines, smooth gradients, and perfect shape retention.',
      expect: 'Fade consultation, precision clipper work, edge lineup.',
      src: image('8kU6qS7pkNXrrBcNtOdv1qorU'),
    },
    {
      price: 'From $30',
      title: 'Beard Trims & Shaping',
      body: 'Sculpted necklines, defined cheek lines, and full beard shaping. Whether you want to grow it out or keep it clean — we maintain the shape you want.',
      expect: 'Beard consultation, trim, shape, hot towel, balm finish.',
      src: image('L7O72RaIUlKcUL0Ee0w8GWHWTdw'),
    },
    {
      price: 'From $25',
      title: 'Style & Finish',
      body: 'Product consultation and styling to lock in your look. Walk out with confidence — from matte clay definition to slick pomade shine.',
      expect: 'Style consultation, product application, finish review.',
      src: image('KKaVDUSPNEebhUYqUAQHmKgYM'),
    },
  ];

  return (
    <main className="inner-site">
      <InnerHeader current="services" />
      <InnerHero
        eyebrow="What We Do"
        title="Precision Services"
        description="Every cut a statement. Every visit an experience."
        src={image('PaN26fmUFDFXpMRknfRImO1iv0')}
      />
      <section className="inner-section">
        <div className="section-shell">
          <div className="price-list">
            {cards.map((card) => (
              <article className="price-card" key={card.title}>
                <div className="price-image"><img src={card.src} alt={card.title} loading="lazy" /></div>
                <div className="price-copy">
                  <span className="price">{card.price}</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <p className="expect"><strong>What to expect:</strong> {card.expect}</p>
                  <a href="/contact">Call to Enquire <ArrowRight size={14} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <InnerMetrics />
      <InnerFooter />
    </main>
  );
}

export function ContactPage() {
  return (
    <main className="inner-site">
      <InnerHeader current="contact" />
      <InnerHero
        eyebrow="Get In Touch"
        title="Come Visit Us"
        description="Walk-ins always welcome. No appointment needed."
        src={image('1b4YIzAnOouRo2k0mAp3rCFB5Q')}
      />
      <section className="inner-section">
        <div className="section-shell contact-layout">
          <div className="inner-copy">
            <div className="inner-kicker">Atelier Barbers</div>
            <h2>Right in the heart of Melbourne.</h2>
            <div className="contact-blocks">
              <div className="contact-block">
                <span>Address</span>
                <p>12 Barber St<br />Melbourne VIC 3000</p>
              </div>
              <div className="contact-block">
                <span>Phone</span>
                <a href="tel:+61412345678">0412 345 678</a>
                <small>Call or text to book an appointment</small>
              </div>
              <div className="contact-block">
                <span>Hours</span>
                <p>Monday–Friday · 10:00am–6:00pm<br />Saturday · 10:00am–4:00pm<br />Sunday · Closed</p>
              </div>
            </div>
            <a className="gold-button" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
              Get Directions <ArrowRight size={14} />
            </a>
            <div className="inner-note">Walk-ins always welcome — no appointment needed.</div>
          </div>
          <a className="inner-map" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
            <img src={image('odHeYERnwVXDnc8B02KIbADP4')} alt="Atelier Barbers Melbourne" loading="lazy" />
            <div className="map-card"><strong>Atelier Barbers</strong><span>12 Barber St, Melbourne CBD</span></div>
          </a>
        </div>
      </section>
      <InnerMetrics />
      <InnerFooter />
    </main>
  );
}
