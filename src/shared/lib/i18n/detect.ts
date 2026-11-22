export const SUPPORTED_LOCALES = ["en", "ru", "zh"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "locale";

const localeSet = new Set<string>(SUPPORTED_LOCALES);

function matchLocale(languageTag: string): Locale | null {
  const tag = languageTag.trim().toLowerCase();
  if (localeSet.has(tag)) return tag as Locale;

  const base = tag.split("-")[0];
  if (localeSet.has(base)) return base as Locale;

  return null;
}

export function detectLocale(languageTag: string): Locale {
  return matchLocale(languageTag) ?? DEFAULT_LOCALE;
}

export function resolveRequestLocale(
  cookie: string | null | undefined,
  acceptLanguage: string | null | undefined,
): Locale {
  if (cookie && localeSet.has(cookie)) return cookie as Locale;

  const preferred = (acceptLanguage ?? "")
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const weight = q ? Number(q.trim().slice(2)) : 1;
      return { tag, weight: Number.isNaN(weight) ? 0 : weight };
    })
    .filter(({ weight }) => weight > 0)
    .sort((a, b) => b.weight - a.weight);

  for (const { tag } of preferred) {
    const locale = matchLocale(tag);
    if (locale) return locale;
  }

  return DEFAULT_LOCALE;
}
