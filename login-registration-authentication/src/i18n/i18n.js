import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './locales/en/translation.json';
import esTranslation from './locales/es/translation.json';
import frTranslation from './locales/fr/translation.json';
import itTranslation from './locales/it/translation.json';
import ruTranslation from './locales/ru/translation.json';

const resources = {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    fr: { translation: frTranslation },
    it: { translation: itTranslation },
    ru: { translation: ruTranslation }
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'es', 'fr', 'it', 'ru'],
    interpolation: {
        escapeValue: false,
    },
})

export default i18n;

