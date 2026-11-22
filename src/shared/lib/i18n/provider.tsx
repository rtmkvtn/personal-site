"use client";

import { useState } from "react";
import type { i18n } from "i18next";
import { I18nextProvider, useTranslation } from "react-i18next";
import { createI18n } from "./init";
import { DEFAULT_LOCALE } from "./detect";
import type { Locale } from "./detect";
import { setLocaleCookie } from "./cookie";

let browserInstance: i18n | null = null;

// The server renders many requests at once, so each render there gets its own instance;
// the browser keeps one, which setLocale switches.
function getInstance(locale: Locale): i18n {
  if (typeof window === "undefined") return createI18n(locale);
  browserInstance ??= createI18n(locale);
  return browserInstance;
}

export function useLocale(): Locale {
  const { i18n: instance } = useTranslation();
  return (instance.language as Locale) || DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  browserInstance?.changeLanguage(locale);
  setLocaleCookie(locale);
  document.documentElement.lang = locale;
}

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const [instance] = useState(() => getInstance(locale));

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
