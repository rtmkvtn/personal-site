import { describe, it, expect } from "vitest";
import { detectLocale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../i18n/detect";

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