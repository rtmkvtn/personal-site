import { describe, it, expect } from "vitest";
import {
  detectLocale,
  resolveRequestLocale,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
} from "../i18n/detect";

describe("detectLocale", () => {
  it("returns exact match for supported locale", () => {
    expect(detectLocale("ru")).toBe("ru");
    expect(detectLocale("en")).toBe("en");
    expect(detectLocale("zh")).toBe("zh");
  });

  it("maps language-region codes to base locale", () => {
    expect(detectLocale("ru-RU")).toBe("ru");
    expect(detectLocale("zh-CN")).toBe("zh");
    expect(detectLocale("zh-TW")).toBe("zh");
    expect(detectLocale("en-US")).toBe("en");
    expect(detectLocale("en-GB")).toBe("en");
  });

  it("falls back to default for unsupported locales", () => {
    expect(detectLocale("fr-FR")).toBe("en");
    expect(detectLocale("de")).toBe("en");
    expect(detectLocale("ja")).toBe("en");
    expect(detectLocale("")).toBe("en");
  });

  it("exports supported locales and default", () => {
    expect(SUPPORTED_LOCALES).toEqual(["en", "ru", "zh"]);
    expect(DEFAULT_LOCALE).toBe("en");
  });
});

describe("resolveRequestLocale", () => {
  it("prefers a supported cookie over the header", () => {
    expect(resolveRequestLocale("ru", "zh-CN,zh;q=0.9")).toBe("ru");
  });

  it("ignores an unsupported cookie", () => {
    expect(resolveRequestLocale("fr", "zh-CN")).toBe("zh");
  });

  it("takes the first supported language by weight", () => {
    expect(resolveRequestLocale(undefined, "fr-FR, ru;q=0.8, zh;q=0.9")).toBe("zh");
    expect(resolveRequestLocale(undefined, "en-US,en;q=0.9,ru;q=0.8")).toBe("en");
  });

  it("skips languages weighted zero", () => {
    expect(resolveRequestLocale(undefined, "ru;q=0, zh;q=0.5")).toBe("zh");
  });

  it("falls back to the default without a usable signal", () => {
    expect(resolveRequestLocale(undefined, null)).toBe("en");
    expect(resolveRequestLocale(undefined, "fr, de;q=0.9")).toBe("en");
    expect(resolveRequestLocale(undefined, "*")).toBe("en");
  });
});
