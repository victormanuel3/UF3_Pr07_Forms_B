import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishContent from "./lang/en.json";
import spanishContent from "./lang/es.json";

// configuración de la librería i18 next
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: englishContent },
    es: { translation: spanishContent },
  },

  lng: navigator.language.split("-")[0],

  // Si el idioma que se ha detectado no está disponible, usa inglés por defecto
  fallbackLng: "en",

  // Deshabilita el escape automático de caracteres especiale
  interpolation: {
    escapeValue: false,
  },
});
