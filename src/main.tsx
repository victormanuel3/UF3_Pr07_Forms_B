import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import englishContent from "./lang/en.json";
import spanishContent from "./lang/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en: englishContent,
    es: spanishContent,
  },

  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
