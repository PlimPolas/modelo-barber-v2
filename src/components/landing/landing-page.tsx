'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Check, MapPin, Menu, Phone, X } from 'lucide-react';

import { PricingSection } from './pricing-section';
import { TeamSection } from './team-section';

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

    const isMobile = window.matchMedia('(max-width: 809px)').matches;
    const staggerStep = isMobile ? 70 : 100;
    const maxDelay = isMobile ? 280 : 500;

    nodes.forEach((node) => {
      const step = Number(node.dataset.revealDelay ?? 0);
      const delay = Math.min(Math.max(step, 0) * staggerStep, maxDelay);
      node.style.setProperty('--reveal-delay', `${delay}ms`);
    });

    // Never short-circuit the runtime because of prefers-reduced-motion.
    // CSS owns the reduced-motion variant and only reduces the amount of motion.
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.setAttribute('data-visible', 'true'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          (entry.target as HTMLElement).setAttribute('data-visible', 'true');
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -8% 0px',
      },
    );

    // Wait one frame so the browser paints the initial hidden/translated state
    // before an already-visible element is promoted to data-visible=true.
    const frame = window.requestAnimationFrame(() => {
      nodes.forEach((node) => observer.observe(node));
    });

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
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

function Eyebrow({
  children,
  centered = false,
  revealDelay,
}: {
  children: React.ReactNode;
  centered?: boolean;
  revealDelay?: number;
}) {
  return (
    <div
      className={`atelier-eyebrow ${centered ? 'is-centered' : ''}`}
      data-reveal={revealDelay === undefined ? undefined : 'fade-up'}
      data-reveal-delay={revealDelay}
    >
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
        {items.map(([value, label], index) => (
          <div className="metric-item" key={label} data-reveal="fade-up" data-reveal-delay={index}>
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
        <div className="section-heading centered">
          <Eyebrow centered revealDelay={0}>What We Do</Eyebrow>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>Precision Services</h2>
          <p data-reveal="fade-up" data-reveal-delay={2}>Every service performed with focus, craft, and care.</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <a
              className="service-card"
              href="/contact"
              key={service.number}
              data-reveal="card"
              data-reveal-delay={index}
            >
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
      <div className="section-shell experience-grid">
        <div className="experience-copy">
          <Eyebrow revealDelay={0}>The Experience</Eyebrow>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>Sharp. Clean.<br />Every Time.</h2>
          <p className="experience-lead" data-reveal="fade-up" data-reveal-delay={2}>
            Walk into Atelier Barbers and you step into a CBD barber shop that takes its craft seriously.
            No rush, no shortcuts — just focused, expert service that sends you out looking sharp.
          </p>
          <div className="feature-list">
            {features.map((feature, index) => (
              <div className="feature-item" key={feature} data-reveal="fade-up" data-reveal-delay={index + 2}>
                <span><Check size={14} strokeWidth={2} /></span>
                <p>{feature}</p>
              </div>
            ))}
          </div>
          <div className="experience-hours" data-reveal="fade-up" data-reveal-delay={5}>
            <div><strong>Open Mon-Sat</strong><span>Walk-ins always welcome</span></div>
          </div>
        </div>

        <div className="experience-media" data-reveal="media" data-reveal-delay={1}>
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
        <div className="section-heading centered">
          <Eyebrow centered revealDelay={0}>What People Say</Eyebrow>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>Trusted by Melbourne</h2>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <article className="review-card" key={review.name} data-reveal="card" data-reveal-delay={index}>
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
      <div className="section-shell location-grid">
        <div className="location-copy">
          <Eyebrow revealDelay={0}>Find Us</Eyebrow>
          <h2 data-reveal="fade-up" data-reveal-delay={1}>We’re in the CBD.</h2>
          <div className="contact-details" data-reveal="fade-up" data-reveal-delay={2}>
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
          <div data-reveal="fade-up" data-reveal-delay={3}>
            <a className="gold-button" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
              Get Directions <ArrowRight size={15} />
            </a>
          </div>
        </div>

        <a
          className="location-visual"
          href="https://maps.google.com/?q=Melbourne+VIC+3000"
          target="_blank"
          rel="noreferrer"
          aria-label="Open Atelier Barbers in Maps"
          data-reveal="media"
          data-reveal-delay={1}
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
      <div className="section-shell footer-top" data-reveal="fade-up" data-reveal-delay={0}>
        <div>
          <strong className="footer-wordmark">ATELIER</strong>
          <span>Barbers · Melbourne</span>
        </div>
        <a href="tel:+61412345678"><Phone size={14} /> 0412 345 678</a>
      </div>
      <div className="section-shell footer-bottom" data-reveal="fade-up" data-reveal-delay={1}>
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
            <div className="hero-motion" data-hero-step="0"><Eyebrow>Premium Barbers · Melbourne</Eyebrow></div>
            <h1 className="hero-motion" data-hero-step="1">ATELIER</h1>
            <h2 className="hero-motion" data-hero-step="2">BARBERS</h2>
            <div className="hero-address hero-motion" data-hero-step="3"><span />12 Barber St, Melbourne VIC 3000</div>
            <p className="hero-tagline hero-motion" data-hero-step="4">Sharp cuts. Clean lines. Walk in, walk out looking your best — every single time.</p>
            <div className="hero-actions hero-motion" data-hero-step="5">
              <a className="gold-button" href="https://maps.google.com/?q=Melbourne+VIC+3000" target="_blank" rel="noreferrer">
                Get Directions <ArrowRight size={15} />
              </a>
              <a className="ghost-button" href="tel:+61412345678">Call Now</a>
            </div>
          </div>
        </div>
        <div className="hero-scroll hero-motion" data-hero-step="6">SCROLL <span /></div>
      </section>

      <Metrics />
      <Services />
      <PricingSection />
      <TeamSection />
      <Experience />
      <Reviews />
      <Location />
      <Footer />
    </main>
  );
}
