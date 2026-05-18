import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';
import enFormation from './locales/en.formation.json';
import frFormation from './locales/fr.formation.json';
import enExperience from './locales/en.experience.json';
import frExperience from './locales/fr.experience.json';
import enProjets from './locales/en.projets.json';
import frProjets from './locales/fr.projets.json';
import enContact from './locales/en.contact.json';
import frContact from './locales/fr.contact.json';
import enCompetences from './locales/en.competences.json';
import frCompetences from './locales/fr.competences.json';
import enCV from './locales/en.cv.json';
import frCV from './locales/fr.cv.json';
import frCertifications from './locales/fr.certifications.json';
import enCertifications from './locales/en.certifications.json';
import frchat from './locales/fr.chat.json';
import enchat from './locales/en.chat.json';

i18n
  .use(initReactI18next)  // connecte i18next à React
  .init({
    resources: {
      fr: {
        translation: fr,
        formation: frFormation,
        experience: frExperience,
        projets: frProjets,
        contact: frContact,
        competences: frCompetences,
        cv: frCV,
        certifications: frCertifications,
        chat: frchat,
      },
      en: {
        translation: en,
        formation: enFormation,
        experience: enExperience,
        projets: enProjets,
        contact: enContact,
        competences: enCompetences, 
        cv: enCV,
        certifications: enCertifications,
        chat: enchat,
      },
    },

    lng: ['fr', 'en'].includes(localStorage.getItem("lang")) 
    ? localStorage.getItem("lang") 
    : "fr", 
    fallbackLng: 'en',    // si une clé manque → fallback anglais

    ns: ["translation", "formation", "experience", "projets", "contact", "competences", "cv", "certifications", "chat"], // namespaces disponibles
    defaultNS: "translation",

    interpolation: {
      escapeValue: false, // React gère déjà la sécurité XSS
    },
  });

export default i18n;