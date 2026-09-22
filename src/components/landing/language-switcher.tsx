'use client';

import { cn } from '@/lib/utils';
import { LANGUAGE_ORDER, useI18n } from '@/i18n';

import './language-switcher.css';

interface LanguageSwitcherProps {
  className?: string;
}

const codeLabels = { pt: 'PT', en: 'EN', es: 'ES' } as const;

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t.switcherLabel}
      className={cn('v2-language-switcher', className)}
    >
      {LANGUAGE_ORDER.map((code) => {
        const active = code === language;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLanguage(code)}
            aria-pressed={active}
            aria-label={t.languageNames[code]}
            className={cn('type-eyebrow v2-language-option', active && 'is-active')}
          >
            {codeLabels[code]}
          </button>
        );
      })}
    </div>
  );
}
