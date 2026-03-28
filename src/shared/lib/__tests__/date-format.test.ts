import { describe, it, expect } from "vitest";
import { formatDate, getDisplayDate } from "../date-format";

describe("formatDate", () => {
  it("formats date in English", () => {
    expect(formatDate("2024-06", "en")).toBe("Jun 2024");
    expect(formatDate("2023-01", "en")).toBe("Jan 2023");
  });

  it("formats date in Russian", () => {
    const result = formatDate("2024-06", "ru");
    // Russian month abbreviation for June
    expect(result).toMatch(/2024/);
    expect(result).not.toBe("Jun 2024");
  });

  it("formats date in Chinese", () => {
    const result = formatDate("2024-06", "zh");
    // Chinese date format includes the year
    expect(result).toMatch(/2024/);
  });
});

describe("getDisplayDate", () => {
  it("formats date range in English", () => {
    expect(getDisplayDate("2023-06", "2024-01", "en")).toBe(
      "Jun 2023 — Jan 2024",
    );
  });

  it("formats single endDate", () => {
    expect(getDisplayDate(undefined, "2024-05", "en")).toBe("May 2024");
  });

  it("formats single startDate", () => {
    expect(getDisplayDate("2023-01", undefined, "en")).toBe("Jan 2023");
  });

  it("formats date range in Russian", () => {
    const result = getDisplayDate("2023-06", "2024-01", "ru");
    expect(result).toMatch(/2023/);
    expect(result).toMatch(/—/);
    expect(result).toMatch(/2024/);
  });

  it("formats date range in Chinese", () => {
    const result = getDisplayDate("2023-06", "2024-01", "zh");
    expect(result).toMatch(/2023/);
    expect(result).toMatch(/—/);
    expect(result).toMatch(/2024/);
  });
});
