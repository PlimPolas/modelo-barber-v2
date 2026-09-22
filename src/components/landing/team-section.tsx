'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { SectionHeader } from '@/components/layout';
import { barbers, media } from '@/data';
import type { Barber, MediaAsset } from '@/types';

import { BarberCard } from './barber-card';
import './team-section.css';

const fourthBarber: Barber = {
  id: 'barber-four',
  slug: 'barber-four',
  name: 'Barber 4',
  role: 'Barbeiro',
  shortBio: '-------------',
  specialties: ['cortes clássicos', 'barba'],
  serviceIds: ['service-cut', 'service-beard'],
  locationIds: ['location-central'],
  primaryMediaId: 'media-foundation-placeholder',
  useAvatarPlaceholder: true,
  bookingEnabled: true,
  active: true,
  sortOrder: 4,
};

const teamMembers: Barber[] = [...barbers.filter((barber) => barber.active).slice(0, 3), fourthBarber];

function resolveMedia(id?: string): MediaAsset {
  return (
    media.find((asset) => asset.id === id) ??
    media.find((asset) => asset.id === 'media-foundation-placeholder') ??
    media[0]!
  );
}

export function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollFrame = useRef<number | null>(null);

  const focusCard = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const normalizedIndex = (index + teamMembers.length) % teamMembers.length;
    setActiveIndex(normalizedIndex);

    const viewport = viewportRef.current;
    const card = cardRefs.current[normalizedIndex];
    if (!viewport || !card) return;

    if (viewport.scrollWidth <= viewport.clientWidth + 4) return;

    const left = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
    viewport.scrollTo({ left: Math.max(0, left), behavior });
  }, []);

  const handleScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport || viewport.scrollWidth <= viewport.clientWidth + 4) return;

    if (scrollFrame.current !== null) {
      window.cancelAnimationFrame(scrollFrame.current);
    }

    scrollFrame.current = window.requestAnimationFrame(() => {
      const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (scrollFrame.current !== null) {
        window.cancelAnimationFrame(scrollFrame.current);
      }
    };
  }, []);

  return (
    <section id="equipe" className="atelier-section team-carousel-section" aria-labelledby="team-title">
      <div className="section-shell">
        <div className="team-carousel-header">
          <div data-reveal="fade-up" data-reveal-delay={0}>
            <SectionHeader
              eyebrow="EQUIPE"
              title="NOSSO TIME"
              description="Perfis diferentes, o mesmo padrão de cuidado e atenção ao detalhe."
            />
          </div>

          <div className="team-carousel-controls" data-reveal="fade-up" data-reveal-delay={1} aria-label="Controles da equipe">
            <button
              type="button"
              className="team-carousel-arrow"
              aria-label="Barbeiro anterior"
              onClick={() => focusCard(activeIndex - 1)}
            >
              <ArrowLeft aria-hidden="true" />
            </button>
            <button
              type="button"
              className="team-carousel-arrow"
              aria-label="Próximo barbeiro"
              onClick={() => focusCard(activeIndex + 1)}
            >
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="team-carousel-viewport"
          onScroll={handleScroll}
          aria-roledescription="carousel"
          aria-label="Equipe de barbeiros"
        >
          <div className="team-carousel-track">
            {teamMembers.map((barber, index) => {
              const isActive = activeIndex === index;

              return (
                <div
                  key={barber.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className="team-carousel-item"
                  data-active={isActive ? 'true' : 'false'}
                  data-reveal="card"
                  data-reveal-delay={index}
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => focusCard(index)}
                >
                  <BarberCard
                    barber={barber}
                    media={resolveMedia(barber.primaryMediaId)}
                    actionPrefix="Falar com"
                    specialtiesLabel="Especialidades de"
                    actionHref="/contact"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
