import { createI18n } from 'vue-i18n';
import en from './locales/en';
import nl from './locales/nl';

const STORAGE_KEY = 'locale';

function detectInitialLocale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'en' || saved === 'nl') return saved;

  return navigator.language.toLowerCase().startsWith('nl') ? 'nl' : 'en';
}

export const i18n = createI18n({
  legacy: false,
  locale: detectInitialLocale(),
  fallbackLocale: 'en',
  messages: { en, nl },
});

export function persistLocale(locale) {
  localStorage.setItem(STORAGE_KEY, locale);
}
