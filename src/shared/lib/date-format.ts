import { replaceDigitsInString } from "./chinese-numerals";

export function formatDate(dateStr: string, locale: string = "en"): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  const formatted = date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  return replaceDigitsInString(formatted, locale);
}

export function getDisplayDate(
  startDate?: string,
  endDate?: string,
  locale: string = "en",
): string {
  if (startDate && endDate) {
    return `${formatDate(startDate, locale)} — ${formatDate(endDate, locale)}`;
  }
  return formatDate(startDate || endDate!, locale);
}
