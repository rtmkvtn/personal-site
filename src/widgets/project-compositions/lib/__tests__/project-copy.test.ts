import { describe, it, expect } from "vitest";
import { readProjectCopy } from "../project-copy";

describe("readProjectCopy", () => {
  it("splits the first paragraph into a deck and the lede that follows", () => {
    const copy = readProjectCopy("A closed market. It ran for three years.\n\nThe arc.");
    expect(copy.deck).toBe("A closed market.");
    expect(copy.lede).toBe("It ran for three years.");
  });

  it("keeps the whole first paragraph as first", () => {
    const copy = readProjectCopy("A closed market. It ran for three years.\n\nThe arc.");
    expect(copy.first).toBe("A closed market. It ran for three years.");
  });

  it("takes the second paragraph as the arc", () => {
    expect(readProjectCopy("Lede.\n\nThe arc.").arc).toBe("The arc.");
  });

  it("drops paragraphs after the second", () => {
    const copy = readProjectCopy("Lede.\n\nThe arc.\n\nSomething else.");
    expect(copy.arc).toBe("The arc.");
    expect(copy.first).toBe("Lede.");
  });

  it("leaves the arc empty when there is only one paragraph", () => {
    expect(readProjectCopy("Just the lede.").arc).toBe("");
  });

  it("ends the deck on a Chinese full stop", () => {
    const copy = readProjectCopy("一个封闭的市场。它运行了三年。");
    expect(copy.deck).toBe("一个封闭的市场。");
    expect(copy.lede).toBe("它运行了三年。");
  });

  it("treats a paragraph with no sentence end as all deck", () => {
    const copy = readProjectCopy("No full stop here");
    expect(copy.deck).toBe("No full stop here");
    expect(copy.lede).toBe("");
  });

  it("returns empty copy for an empty description", () => {
    expect(readProjectCopy("")).toEqual({ first: "", deck: "", lede: "", arc: "" });
  });

  it("separates paragraphs on three or more newlines too", () => {
    expect(readProjectCopy("Lede.\n\n\nThe arc.").arc).toBe("The arc.");
  });
});
