"use client";

import { useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { HandoffActor, ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { readProjectCopy } from "../lib/project-copy";
import { useAnchoredIndex } from "../lib/use-anchored-index";
import { useReveal } from "../lib/use-reveal";
import { LessonFigure } from "./LessonFigure";
import styles from "./EdTechPlatform.module.scss";

interface EdTechPlatformProps {
  project: ResolvedProject;
}

const EVENT_INDEX = 2;

export function EdTechPlatform({ project }: EdTechPlatformProps) {
  const locale = useLocale();
  const { t } = useTranslation();
  const listRef = useRef<HTMLOListElement>(null);
  const { deck, lede, arc } = readProjectCopy(project.description);
  const stages = project.handoff?.stages ?? [];
  const [hovered, setHovered] = useState<HandoffActor | null>(null);
  const current = useAnchoredIndex(listRef, { signal: stages.length });
  const revealed = useReveal(listRef, stages.length);

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
          {lede && <p className={styles.lede}>{lede}</p>}
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
