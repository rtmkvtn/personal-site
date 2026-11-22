import { LOCALE_COOKIE } from "./detect";

const MAX_AGE = 365 * 24 * 60 * 60; // 1 year

export function setLocaleCookie(locale: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${LOCALE_COOKIE}=${encodeURIComponent(locale)};path=/;max-age=${MAX_AGE};samesite=lax`;
}
