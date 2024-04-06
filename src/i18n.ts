// i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation }
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if translation file for selected language is not found
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
