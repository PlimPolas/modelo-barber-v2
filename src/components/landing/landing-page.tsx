'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, MapPin, Menu, Phone, X } from 'lucide-react';

import { PricingSection } from './pricing-section';

const image = (name: string, params = 'scale-down-to=2048') =>
  `https://framerusercontent.com/images/${name}.jpg?${params}`;

const services = [
  {
    number: '01',
    title: 'Haircuts',
    body: 'Classic cuts to contemporary styles — sharp, clean, tailored to you.',
    src: image('N2WiUItXHzq3pVso0NMy3nJfbw'),
  },
  {
    number: '02',
    title: 'Fades',
    body: 'Skin, mid, and high fades executed with precision and consistency.',
    src: image('8kU6qS7pkNXrrBcNtOdv1qorU'),
  },
  {
    number: '03',
    title: 'Beard Trims',
    body: 'Line-ups, shaping, and grooming for a crisp, defined finish.',
    src: image('L7O72RaIUlKcUL0Ee0w8GWHWTdw'),
  },
  {
    number: '04',
    title: 'Styling',
    body: 'Wax, clay, pomade — product advice and finish styling included.',
    src: image('KKaVDUSPNEebhUYqUAQHmKgYM'),
  },
];

const reviews = [
  {
    quote:
      'Best barbershop in the area. Skilled team with great attention to detail and top-notch service. The prices are fair for the quality you get — I wouldn’t go anywhere else.',
    name: 'James R.',
  },
  {
    quote:
      'Walked in on a Saturday without a booking and they fit me right in. Best fade I’ve had in years — clean lines, great attention to detail. Will definitely be back every fortnight.',
    name: 'Marcus T.',
  },
  {
    quote:
      'Hands down the best barbershop in Melbourne. Showed up with no idea what I wanted and walked out looking sharper than ever. The team genuinely cares about their craft.',
    name: 'Daniel P.',
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="atelier-header">
      <a className="atelier-brand" href="/" aria-label="Atelier Barbers home">
        <span className="atelier-brand-main">ATELIER</span>
        <span className="atelier-brand-sub">barbers</span>
      </a>

      <nav className="atelier-nav" aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/services">Services</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      <a className="header-call" href="tel:+61412345678">
        <span>Call Now</span>
        <ArrowRight size={15} strokeWidth={1.8} />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`}>
        <a href="/" onClick={() => setOpen(false)}>Home</a>
        <a href="/services" onClick={() => setOpen(false)}>Services</a>
        <a href="/about" onClick={() => setOpen(false)}>About</a>
        <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        <a href="tel:+61412345678" onClick={() => setOpen(false)}>Call Now</a>
      </div>
    </header>
  );
}

function Eyebrow({ children, centered = false }: { children: React.ReactNode; centered?: boolean }) {
  return (
    <div className={`atelier-eyebrow ${centered ? 'is-centered' : ''}`}>
      <span aria-hidden="true" />
      <p>{children}</p>
      {centered ? <span aria-hidden="true" /> : null}
    </div>
  );
}

function Metrics() {
  const items = [
    ['4.5 ★', 'Google Rating'],
    ['245+', 'Verified Reviews'],
    ['BARBER ST', 'Melbourne CBD'],
    ['WALK IN', 'Always Welcome'],
  ];

  return (
    <section className="metrics-strip" aria-label="Atelier Barbers highlights">
      <div className="section-shell metrics-grid">
        {items.map(([value, label]) => (
          <div className="metric-item" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="atelier-section services-section" id="services">
      <div className="section-shell">
        <div className="section-heading centered" data-reveal>
          <Eyebrow centered>What We Do</Eyebrow>
          <h2>Precision Services</h2>
          <p>Every service performed with focus, craft, and care.</p>
        </div>

        <div className="services-grid" data-reveal>
          {services.map((service) => (
            <a className="service-card" href="/contact" key={service.number}>
              <img src={service.src} alt={`${service.title} at Atelier Barbers`} loading="lazy" />
              <span className="service-shade" aria-hidden="true" />
              <span className="service-number">{service.number}</span>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.body}</p>
                <span className="service-link">Enquire <ArrowRight size={14} /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const features = [
    'Precision cuts tailored to your face shape',
    'Walk-in friendly — no booking required',
    'Right in the heart of Melbourne CBD',
    'Experienced barbers, consistent results',
  ];

  return (
    <section className="atelier-section experience-section" id="about">
      <div className="section-shell experience-grid" data-reveal>
        <div className="experience-copy">
          <Eyebrow>The Experience</Eyebrow>
          <h2>Sharp. Clean.<br />Every Time.</h2>
          <p className="experience-lead">
            Walk into Atelier Barbers and you step into a CBD barber shop that takes its craft seriously.
            No rush, no shortcuts — just focused, expert service that sends you out looking sharp.
          </p>
          <div className="feature-list">
            {features.map((feature) => (
              <div className="feature-item" key={feature}>
                <span><Check size={14} strokeWidth={2} /></span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
          <div className="experience-hours">
            <div><strong>Open Mon-Sat</strong><span>Walk-ins always welcome</span></div>
          </div>
        </div>

        <div className="experience-media">
          <img
            src={image('PaN26fmUFDFXpMRknfRImO1iv0', 'scale-down-to=2048')}
            alt="Atelier Barbers shop detail"
            loading="lazy"
          />
          <span className="experience-frame" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="atelier-section reviews-section">
      <div className="section-shell">
        <div className="section-heading centered" data-reveal>
          <Eyebrow centered>What People Say</Eyebrow>
          <h2>Trusted by Melbourne</h2>
        </div>
        <div className="reviews-grid" data-reveal>
          {reviews.map((review) => (
            <article className="review-card" key={review.name}>
              <div className="review-stars">★★★★★</div>
              <p>“{review.quote}”</p>
              <div className="review-author">
                <strong>{review.name}</strong>
                <span>Google Review</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section className="atelier-section location-section" id="contact">
      <div className="section-shell location-grid" data-reveal>
        <div className="location-copy">
          <Eyebrow>Find Us</Eyebrow>
          <h2>We’re in the CBD.</h2>
          <div className="contact-details">
            <div>
              <span className="contact-label">Address</span>
              <p>12 Barber St<br />Melbourne VIC 3000</p>
            </div>
            <div>
              <span className="contact-label">Phone</span>
              <a href="tel:+61412345678">0412 345 678</a>
            </div>
            <div>
              <span className="contact-label">Hours</span>
              <p>Mon–Fri 10am–6pm · Sat 10am–4pm · Sun Closed</p>
            </div>
          </div>
          <a className="gold-button" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
            Get Directions <ArrowRight size={15} />
          </a>
        </div>

        <a
          className="location-visual"
          href="https://maps.google.com/?q=Melbourne+VIC+3000"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Atelier Barbers in Maps"
        >
          <img src={image('8kU6qS7pkNXrrBcNtOdv1qorU', 'scale-down-to=2048')} alt="Barber at work" loading="lazy" />
          <div className="location-pin"><MapPin size={21} /></div>
          <div className="location-badge"><strong>Atelier Barbers</strong><span>12 Barber St</span></div>
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="atelier-footer">
      <div className="section-shell footer-top">
        <div>
          <strong className="footer-wordmark">ATELIER</strong>
          <span>Barbers · Melbourne</span>
        </div>
        <a href="tel:+61412345678"><Phone size={14} /> 0412 345 678</a>
      </div>
      <div className="section-shell footer-bottom">
        <span>© 2026 Atelier Barbers. All rights reserved.</span>
        <div>
          <a href="/">Home</a>
          <a href="/services">Services</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export function LandingPage() {
  useReveal();

  return (
    <main className="atelier-site" id="top">
      <Header />

      <section className="hero-section">
        <img
          className="hero-image"
          src={image('odHeYERnwVXDnc8B02KIbADP4', 'scale-down-to=2048')}
          alt="Barber giving a precision haircut at Atelier Barbers, Melbourne"
        />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-noise" aria-hidden="true" />
        <div className="section-shell hero-inner">
          <div className="hero-copy">
            <Eyebrow>Premium Barbers · Melbourne</Eyebrow>
            <h1>ATELIER</h1>
            <h2>BARBERS</h2>
            <div className="hero-address"><span />12 Barber St, Melbourne VIC 3000</div>
            <p className="hero-tagline">Sharp cuts. Clean lines. Walk in, walk out looking your best — every single time.</p>
            <div className="hero-actions">
              <a className="gold-button" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
                Get Directions <ArrowRight size={15} />
              </a>
              <a className="ghost-button" href="tel:+61412345678">Call Now</a>
            </div>
          </div>
        </div>
        <div className="hero-scroll">SCROLL <span /></div>
      </section>

      <Metrics />
      <Services />
      <PricingSection />
      <Experience />
      <Reviews />
      <Location />
      <Footer />
    </main>
  );
}
