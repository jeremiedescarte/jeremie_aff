import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

i18n
  .use(initReactI18next)  // connecte i18next à React
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
    },
    lng: 'en',            // langue par défaut
    fallbackLng: 'en',    // si une clé manque → fallback anglais
    interpolation: {
      escapeValue: false, // React gère déjà la sécurité XSS
    },
  });

export default i18n;