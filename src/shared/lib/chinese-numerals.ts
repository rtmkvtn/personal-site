const DIGITS = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

export function toChineseNumeral(
  n: number,
  mode: "year" | "value",
): string {
  if (mode === "year") {
    return String(n)
      .split("")
      .map((d) => DIGITS[Number(d)])
      .join("");
  }

  if (n === 0) return DIGITS[0];
  if (n < 10) return DIGITS[n];
  if (n === 10) return "十";

  const tens = Math.floor(n / 10);
  const ones = n % 10;

  if (tens === 1) {
    return ones === 0 ? "十" : `十${DIGITS[ones]}`;
  }

  return ones === 0
    ? `${DIGITS[tens]}十`
    : `${DIGITS[tens]}十${DIGITS[ones]}`;
}

/**
 * A number as the locale prints it: Chinese numerals in zh, Latin digits elsewhere, where `pad`
 * is the zero-padding the Latin form takes and zh never does.
 */
export function toLocaleNumeral(
  n: number,
  locale: string,
  options: { mode?: "year" | "value"; pad?: number } = {},
): string {
  if (locale === "zh") return toChineseNumeral(n, options.mode ?? "value");
  return String(n).padStart(options.pad ?? 0, "0");
}

export function replaceDigitsInString(str: string, locale: string): string {
  if (locale !== "zh") return str;
  if (!str) return str;

  return str.replace(/\d+/g, (match) => {
    const n = Number(match);
    const mode = match.length >= 4 ? "year" : "value";
    return toChineseNumeral(n, mode);
  });
}
