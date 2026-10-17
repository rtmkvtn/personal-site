export interface ProjectCopy {
  first: string;
  deck: string;
  lede: string;
  arc: string;
}

const PARAGRAPHS = /\n{2,}/;
const FIRST_SENTENCE = /^(.+?[.。])\s*([\s\S]*)$/;

/**
 * A project's description as a composition reads it: the whole first paragraph, that paragraph
 * split into its deck and the lede that follows, and the second paragraph as the arc. Any
 * paragraph after the second belongs to no composition and is dropped.
 */
export function readProjectCopy(description: string): ProjectCopy {
  const [first = "", arc = ""] = description.split(PARAGRAPHS);
  const sentence = first.match(FIRST_SENTENCE);
  return {
    first,
    deck: sentence ? sentence[1] : first,
    lede: sentence ? sentence[2] : "",
    arc,
  };
}
