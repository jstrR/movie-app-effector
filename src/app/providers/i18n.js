import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "shared/locale/en";
import ja from "shared/locale/ja";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem("i18nextLng"),
    resources: {
      en,
      ja
    },
    fallbackLng: "en",
    debug: process.env.NODE_ENV !== "production",
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ","
    },
    react: {
      wait: true
    }
  });
export default i18n;
