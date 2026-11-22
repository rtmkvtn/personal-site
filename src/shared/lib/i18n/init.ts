import i18next from "i18next";
import type { i18n } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/shared/locales/en.json";
import ru from "@/shared/locales/ru.json";
import zh from "@/shared/locales/zh.json";
import { DEFAULT_LOCALE } from "./detect";
import type { Locale } from "./detect";

export function createI18n(locale: Locale): i18n {
  const instance = i18next.createInstance();

  instance.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      zh: { translation: zh },
    },
    lng: locale,
    fallbackLng: DEFAULT_LOCALE,
    interpolation: { escapeValue: false },
  });

  return instance;
}
