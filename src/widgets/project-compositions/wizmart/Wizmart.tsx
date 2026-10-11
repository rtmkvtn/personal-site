"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import type { ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { useReveal } from "../lib/use-reveal";
import { JourneyMap } from "./JourneyMap";
import styles from "./Wizmart.module.scss";

interface WizmartProps {
  project: ResolvedProject;
}

const EVENT_INDEX = 1;

function splitLede(text: string): [string, string] {
  const match = text.match(/^(.+?[.。])\s*([\s\S]*)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

export function Wizmart({ project }: WizmartProps) {
  const locale = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const [lede, arc] = project.description.split(/\n{2,}/);
  const [deck, ledeRest] = splitLede(lede);
  const stages = project.journey?.stages ?? [];
  const [hovered, setHovered] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  useReveal(listRef, styles.in, stages.length);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.65;
      let next = 0;
      items.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) next = i;
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

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.body}>
          <p className={styles.deck}>{deck}</p>
          {ledeRest && <p className={styles.lede}>{ledeRest}</p>}
        </div>
      </header>

      <div className={styles.journey}>
        <div className={styles.band} data-journey-map>
          <JourneyMap stages={stages.map((stage) => stage.name)} active={hovered ?? current} />
        </div>
        <div className={styles.track}>
          <span className={styles.guide} aria-hidden="true" />
          <ol ref={listRef} className={styles.stages} data-composition="order-journey">
          {stages.map((stage, i) => (
            <li
              key={stage.name}
              className={clsx(styles.stage, i === EVENT_INDEX && styles.stageEvent)}
              style={{ transitionDelay: `${i * 60}ms` }}
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
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
