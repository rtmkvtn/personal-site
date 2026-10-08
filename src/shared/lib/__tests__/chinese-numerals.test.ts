import { describe, it, expect } from "vitest";
import { toChineseNumeral, replaceDigitsInString } from "../chinese-numerals";

describe("toChineseNumeral", () => {
  describe("year mode (digit-by-digit)", () => {
    it("converts 2024", () => {
      expect(toChineseNumeral(2024, "year")).toBe("二零二四");
    });

    it("converts 2000", () => {
      expect(toChineseNumeral(2000, "year")).toBe("二零零零");
    });

    it("converts 1999", () => {
      expect(toChineseNumeral(1999, "year")).toBe("一九九九");
    });
  });

  describe("value mode (semantic 0-99)", () => {
    it("converts 0", () => {
      expect(toChineseNumeral(0, "value")).toBe("零");
    });

    it("converts single digits 1-9", () => {
      expect(toChineseNumeral(1, "value")).toBe("一");
      expect(toChineseNumeral(5, "value")).toBe("五");
      expect(toChineseNumeral(9, "value")).toBe("九");
    });

    it("converts 10", () => {
      expect(toChineseNumeral(10, "value")).toBe("十");
    });

    it("converts teens 11-19", () => {
      expect(toChineseNumeral(11, "value")).toBe("十一");
      expect(toChineseNumeral(12, "value")).toBe("十二");
      expect(toChineseNumeral(19, "value")).toBe("十九");
    });

    it("converts multiples of 10", () => {
      expect(toChineseNumeral(20, "value")).toBe("二十");
      expect(toChineseNumeral(30, "value")).toBe("三十");
      expect(toChineseNumeral(90, "value")).toBe("九十");
    });

    it("converts compound numbers 21-99", () => {
      expect(toChineseNumeral(21, "value")).toBe("二十一");
      expect(toChineseNumeral(35, "value")).toBe("三十五");
      expect(toChineseNumeral(99, "value")).toBe("九十九");
    });
  });
});

describe("replaceDigitsInString", () => {
  it("replaces digits in a zh string using year mode", () => {
    expect(replaceDigitsInString("2024年6月", "zh")).toBe("二零二四年六月");
  });

  it("returns string unchanged for non-zh locale", () => {
    expect(replaceDigitsInString("2024年6月", "en")).toBe("2024年6月");
    expect(replaceDigitsInString("2024年6月", "ru")).toBe("2024年6月");
  });

  it("handles string with no digits", () => {
    expect(replaceDigitsInString("你好世界", "zh")).toBe("你好世界");
  });

  it("handles empty string", () => {
    expect(replaceDigitsInString("", "zh")).toBe("");
  });

  it("replaces all digit groups individually", () => {
    expect(replaceDigitsInString("12月30日", "zh")).toBe("十二月三十日");
  });
});
