"use client";

import { useSyncExternalStore } from "react";
import { I18nextProvider, useTranslation } from "react-i18next";
import i18n from "./init";
import { detectLocale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "./detect";
import type { Locale } from "./detect";
import { getLocaleCookie, setLocaleCookie } from "./cookie";

function resolveInitialLocale(): Locale {
  const cookie = getLocaleCookie();
  if (cookie && (SUPPORTED_LOCALES as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  if (typeof navigator !== "undefined") {
    return detectLocale(navigator.language);
  }

  return DEFAULT_LOCALE;
}

export function useLocale(): Locale {
  const { i18n: instance } = useTranslation();
  return (instance.language as Locale) || DEFAULT_LOCALE;
}

export function setLocale(locale: Locale): void {
  i18n.changeLanguage(locale);
  setLocaleCookie(locale);
}

let initialLocaleApplied = false;
const readyListeners = new Set<() => void>();

function applyInitialLocale(): void {
  if (initialLocaleApplied) return;
  const locale = resolveInitialLocale();
  i18n.changeLanguage(locale);
  setLocaleCookie(locale);
  initialLocaleApplied = true;
  readyListeners.forEach((listener) => listener());
}

function subscribeReady(listener: () => void): () => void {
  readyListeners.add(listener);
  applyInitialLocale();
  return () => readyListeners.delete(listener);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const ready = useSyncExternalStore(
    subscribeReady,
    () => initialLocaleApplied,
    () => false,
  );

  if (!ready) return null;

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
