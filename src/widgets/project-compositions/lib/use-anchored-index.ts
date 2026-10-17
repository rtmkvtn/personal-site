"use client";

import { useEffect, useState, type RefObject } from "react";

const ANCHOR_RATIO = 0.4;

type ListRef = RefObject<HTMLElement | null>;

/** How far down the viewport the anchor line sits, in pixels. */
export function anchorLineOffset(): number {
  return window.innerHeight * ANCHOR_RATIO;
}

interface AnchoredIndexOptions {
  also?: ListRef;
  signal?: unknown;
}

/**
 * The index of the item sitting nearest the anchor line, counted across the list and then the
 * optional second list. Pass `signal` whenever a change can move the items without changing the
 * refs: it re-measures. Hover stays with the caller, since what wins and on which pointer types
 * is the composition's own decision.
 */
export function useAnchoredIndex(
  listRef: ListRef,
  { also, signal }: AnchoredIndexOptions = {},
): number {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const lists = [listRef.current, also?.current].filter(
      (list): list is HTMLElement => list !== null && list !== undefined,
    );
    const items = lists.flatMap((list) => Array.from(list.children) as HTMLElement[]);
    if (!items.length) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = anchorLineOffset();
      let next = 0;
      let best = Infinity;
      items.forEach((el, i) => {
        const distance = Math.abs(el.getBoundingClientRect().top - anchor);
        if (distance < best) {
          best = distance;
          next = i;
        }
      });
      setCurrent(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [listRef, also, signal]);

  return current;
}
