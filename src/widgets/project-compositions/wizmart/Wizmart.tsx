"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LabelFigure } from "./LabelFigure";
import clsx from "clsx";
import type { ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { readProjectCopy } from "../lib/project-copy";
import { useReveal } from "../lib/use-reveal";
import { JourneyMap } from "./JourneyMap";
import styles from "./Wizmart.module.scss";

interface WizmartProps {
  project: ResolvedProject;
}

const EVENT_INDEX = 1;
const ANCHOR_RATIO = 0.4;

export function Wizmart({ project }: WizmartProps) {
  const locale = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const { deck, lede, arc } = readProjectCopy(project.description);
  const stages = project.journey?.stages ?? [];
  const [hovered, setHovered] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const revealed = useReveal(listRef, stages.length);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const anchor = window.innerHeight * ANCHOR_RATIO;
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
  }, [stages.length]);

  const select = useCallback((index: number) => {
    const el = listRef.current?.children[index] as HTMLElement | undefined;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = window.scrollY + el.getBoundingClientRect().top - window.innerHeight * ANCHOR_RATIO;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const active = hovered ?? current;

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.body}>
          <div>
            <p className={styles.deck}>{deck}</p>
            <LabelFigure />
          </div>
          {lede && <p className={styles.lede}>{lede}</p>}
        </div>
      </header>

      <div className={styles.journey}>
        <div className={styles.band} data-journey-map>
          <JourneyMap
            stages={stages.map((stage) => stage.name)}
            active={active}
            onHover={setHovered}
            onSelect={select}
          />
        </div>
        <div className={styles.track}>
          <span className={styles.guide} aria-hidden="true" />
          <ol ref={listRef} className={styles.stages} data-composition="order-journey">
          {stages.map((stage, i) => (
            <li
              key={stage.name}
              className={clsx(
                styles.stage,
                revealed[i] && styles.in,
                i === EVENT_INDEX && styles.stageEvent,
                i === active && styles.stageActive,
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
              onClick={() => select(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  select(i);
                }
              }}
              tabIndex={0}
              aria-current={i === active ? "step" : undefined}
            >
              <span className={styles.index}>
                {toLocaleNumeral(i + 1, locale, { pad: 2 })}
              </span>
              <h2 className={styles.verb}>{stage.name}</h2>
              <p className={styles.fact}>{stage.fact}</p>
              <p className={styles.built}>{stage.built}</p>
            </li>
          ))}
          </ol>
        </div>
      </div>

      {arc && (
        <div className={styles.handoff}>
          <p className={styles.arc}>{arc}</p>
        </div>
      )}

      <footer className={styles.meta}>
        <span>{project.displayDate}</span>
        <span className={styles.stack}>{project.stack.join(" · ")}</span>
      </footer>

      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
