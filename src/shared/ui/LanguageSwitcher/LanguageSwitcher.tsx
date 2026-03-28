"use client";

import clsx from "clsx";
import { useLocale, setLocale, SUPPORTED_LOCALES } from "@/shared/lib/i18n";
import type { Locale } from "@/shared/lib/i18n";
import styles from "./LanguageSwitcher.module.scss";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  zh: "ZH",
};

export function LanguageSwitcher() {
  const current = useLocale();

  return (
    <div className={styles.switcher}>
      {SUPPORTED_LOCALES.map((locale) => (
        <button
          key={locale}
          onClick={() => setLocale(locale)}
          className={clsx(styles.locale, locale === current && styles.active)}
        >
          {LOCALE_LABELS[locale]}
          {locale === current && <span className={styles.dot} />}
        </button>
      ))}
    </div>
  );
}
