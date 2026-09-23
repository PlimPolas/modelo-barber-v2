'use client';

import { useEffect, useState } from 'react';

const HOLD_MS = 1250;
const EXIT_MS = 420;

type Phase = 'visible' | 'leaving' | 'hidden';

export function BrandPreloader() {
  const [phase, setPhase] = useState<Phase>('visible');

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.add('preloader-pending');

    const toLeaving = window.setTimeout(() => {
      document.body.classList.remove('preloader-pending');
      setPhase('leaving');
    }, HOLD_MS);

    const toHidden = window.setTimeout(() => {
      setPhase('hidden');
      document.body.style.overflow = previousOverflow;
    }, HOLD_MS + EXIT_MS);

    return () => {
      window.clearTimeout(toLeaving);
      window.clearTimeout(toHidden);
      document.body.classList.remove('preloader-pending');
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className="brand-preloader"
      data-state={phase}
      role="status"
      aria-live="polite"
      aria-label="Golden Hands"
    >
      <span className="brand-preloader__veil" aria-hidden="true" />

      <div className="brand-preloader__stage">
        <span className="brand-preloader__aura" aria-hidden="true" />

        <svg
          className="brand-preloader__orbit"
          viewBox="0 0 220 220"
          aria-hidden="true"
          focusable="false"
        >
          <circle className="brand-preloader__orbit-base" cx="110" cy="110" r="92" />
          <circle className="brand-preloader__orbit-glow" cx="110" cy="110" r="92" />
          <circle className="brand-preloader__orbit-line" cx="110" cy="110" r="92" />
        </svg>

        <div className="brand-preloader__wordmark" aria-hidden="true">
          <img className="brand-preloader__logo" src="/images/golden-hands-logo.jpeg" alt="Golden Hands Barbershop" />
        </div>
      </div>
    </div>
  );
}
