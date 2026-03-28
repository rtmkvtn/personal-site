const COOKIE_NAME = "locale";
const MAX_AGE = 365 * 24 * 60 * 60; // 1 year

export function getLocaleCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export function setLocaleCookie(locale: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(locale)};path=/;max-age=${MAX_AGE};samesite=lax`;
}
