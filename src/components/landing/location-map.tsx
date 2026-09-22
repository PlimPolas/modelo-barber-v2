'use client';

import { MapPin } from 'lucide-react';

import { demoLocation } from '@/data/demo-location';

import './location-map.css';

interface LocationMapProps {
  ariaLabel: string;
}

export function LocationMap({ ariaLabel }: LocationMapProps) {
  return (
    <div
      className="location-visual location-map"
      data-reveal="media"
      data-reveal-delay={1}
    >
      <iframe
        className="location-map__frame"
        src={demoLocation.googleMaps.embedUrl}
        title={ariaLabel}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />

      <span className="location-map__wash" aria-hidden="true" />

      <div className="location-pin" aria-hidden="true">
        <MapPin size={21} />
      </div>

      <a
        className="location-badge location-map__badge"
        href={demoLocation.googleMaps.placeUrl}
        target="_blank"
        rel="noreferrer"
        aria-label={ariaLabel}
      >
        <strong>{demoLocation.businessName}</strong>
        <span>{demoLocation.address.line1}</span>
      </a>
    </div>
  );
}
