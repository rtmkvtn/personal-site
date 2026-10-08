"use client";

import { useTranslation } from "react-i18next";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { useLocale } from "@/shared/lib/i18n";

/**
 * How long a skill has been in use, as the locale reads it: `2y 3m`, `三年`. The units are
 * translated and the figures localized, so neither is the caller's to pass in.
 */
export function useSkillDuration(): (months: number) => string {
  const { t } = useTranslation();
  const locale = useLocale();

  return (months: number) => {
    const years = Math.floor(months / 12);
    const remaining = months % 12;
    const num = (n: number) => toLocaleNumeral(n, locale);
    const yUnit = t("skills.durationYear");
    const mUnit = t("skills.durationMonth");
    if (years === 0) return `${num(remaining)}${mUnit}`;
    if (remaining === 0) return `${num(years)}${yUnit}`;
    return `${num(years)}${yUnit} ${num(remaining)}${mUnit}`;
  };
}
