"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { HandoffActor, ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { useReveal } from "../lib/use-reveal";
import { LessonFigure } from "./LessonFigure";
import styles from "./EdTechPlatform.module.scss";

interface EdTechPlatformProps {
  project: ResolvedProject;
}

const EVENT_INDEX = 2;
const ANCHOR_RATIO = 0.4;

function splitLede(text: string): [string, string] {
  const match = text.match(/^(.+?[.。])\s*([\s\S]*)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

export function EdTechPlatform({ project }: EdTechPlatformProps) {
  const locale = useLocale();
  const { t } = useTranslation();
  const listRef = useRef<HTMLOListElement>(null);
  const [lede, arc] = project.description.split(/\n{2,}/);
  const [deck, ledeRest] = splitLede(lede);
  const stages = project.handoff?.stages ?? [];
  const [hovered, setHovered] = useState<HandoffActor | null>(null);
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

  const lit = hovered ?? stages[current]?.actor ?? null;

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.body}>
          <div>
            <p className={styles.deck}>{deck}</p>
            <LessonFigure />
          </div>
          {ledeRest && <p className={styles.lede}>{ledeRest}</p>}
        </div>
      </header>

      <ol
        ref={listRef}
        className={styles.stages}
        data-composition="hand-off"
        data-lit={lit ?? undefined}
      >
        {stages.map((stage, i) => {
          const prev = i > 0 ? stages[i - 1] : null;
          const handoff = prev !== null && prev.actor !== stage.actor;
          const runStart = prev === null || handoff;
          return (
            <li
              key={stage.name}
              data-actor={stage.actor}
              className={clsx(
                styles.stage,
                styles[stage.actor],
                revealed[i] && styles.in,
                runStart && styles.runStart,
                i === EVENT_INDEX && styles.stageEvent,
                i === stages.length - 1 && styles.stageLast,
                lit === stage.actor && styles.lit,
                handoff && lit === prev.actor && styles.prevLit,
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
              onPointerEnter={() => setHovered(stage.actor)}
              onPointerLeave={() => setHovered(null)}
            >
              <span className={styles.rail} aria-hidden="true" />
              {handoff && <span className={styles.tail} aria-hidden="true" />}
              {handoff && <span className={styles.cross} aria-hidden="true" />}
              <span className={styles.index}>
                {toLocaleNumeral(i + 1, locale, { pad: 2 })}
              </span>
              {runStart && (
                <span className={styles.actor}>{t(`handoff.${stage.actor}`)}</span>
              )}
              <h2 className={styles.verb}>{stage.name}</h2>
              <p className={styles.fact}>{stage.fact}</p>
              <p className={styles.built}>{stage.built}</p>
            </li>
          );
        })}
      </ol>

      {arc && (
        <div className={styles.handoff}>
          <p className={styles.arc}>{arc}</p>
        </div>
      )}

      <footer className={styles.meta}>
        <span>{project.displayDate}</span>
        <span className={styles.stack}>{project.stack.join(" · ")}</span>
      </footer>

      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
