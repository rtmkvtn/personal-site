export const SUPPORTED_LOCALES = ["en", "ru", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

const localeSet = new Set<string>(SUPPORTED_LOCALES);

export function detectLocale(languageTag: string): Locale {
  if (localeSet.has(languageTag)) return languageTag as Locale;

  const base = languageTag.split("-")[0];
  if (localeSet.has(base)) return base as Locale;

  return DEFAULT_LOCALE;
}
