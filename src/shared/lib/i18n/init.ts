import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/shared/locales/en.json";
import ru from "@/shared/locales/ru.json";
import zh from "@/shared/locales/zh.json";
import { DEFAULT_LOCALE } from "./detect";

const i18n = i18next.createInstance();

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    zh: { translation: zh },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: { escapeValue: false },
});

export default i18n;
