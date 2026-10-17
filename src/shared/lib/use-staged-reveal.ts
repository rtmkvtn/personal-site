"use client";

import { useEffect, useState } from "react";

const EXIT_MS = 200;

export interface StagedReveal<T> {
  displayed: T | null;
  reached: (stage: number) => boolean;
}

/**
 * A panel that holds its last value on screen while it fades out, and brings the new one in one
 * stage at a time. `delays` are milliseconds from the value arriving to each stage, so
 * `reached(n)` turns true in the order they are listed. Pass a stable array.
 */
export function useStagedReveal<T>(value: T | null, delays: readonly number[]): StagedReveal<T> {
  const [displayed, setDisplayed] = useState<T | null>(null);
  const [previous, setPrevious] = useState<T | null>(null);
  const [stage, setStage] = useState(0);

  if (value !== previous) {
    setPrevious(value);
    setStage(0);
    if (value) setDisplayed(value);
  }

  useEffect(() => {
    if (value) {
      const timers = delays.map((delay, i) => setTimeout(() => setStage(i + 1), delay));
      return () => timers.forEach(clearTimeout);
    }
    const timer = setTimeout(() => setDisplayed(null), EXIT_MS);
    return () => clearTimeout(timer);
  }, [value, delays]);

  return { displayed, reached: (target: number) => stage >= target };
}
