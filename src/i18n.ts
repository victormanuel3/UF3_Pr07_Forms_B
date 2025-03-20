import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishContent from "./lang/en.json";
import spanishContent from "./lang/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: englishContent },
    es: { translation: spanishContent },
  },

  lng: navigator.language.split("-")[0],

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
