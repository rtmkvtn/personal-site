"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { useReveal } from "../lib/use-reveal";
import { ExamRoomFigure } from "./ExamRoomFigure";
import styles from "./Ziphycare.module.scss";

interface ZiphycareProps {
  project: ResolvedProject;
}

const LOUD_INDEX = 3;
const LOUD_FIGURE = 4;
const ANCHOR_RATIO = 0.4;

function splitLede(text: string): [string, string] {
  const match = text.match(/^(.+?[.。])\s*([\s\S]*)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

function hostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function Ziphycare({ project }: ZiphycareProps) {
  const locale = useLocale();
  const { t } = useTranslation();
  const listRef = useRef<HTMLOListElement>(null);
  const [lede, arc] = project.description.split(/\n{2,}/);
  const [deck, ledeRest] = splitLede(lede);
  const rows = project.interpreter?.rows ?? [];
  const [hovered, setHovered] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const revealed = useReveal(listRef, rows.length);

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
  }, [rows.length]);

  const active = hovered ?? current;
  const sides = [t("interpreter.wire"), t("interpreter.screen")];

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.body}>
          <p className={styles.deck}>{deck}</p>
          <ExamRoomFigure />
          {ledeRest && <p className={styles.lede}>{ledeRest}</p>}
        </div>
      </header>

      <ol
        ref={listRef}
        className={styles.rows}
        data-composition="interpreter"
        data-active={active}
      >
        {rows.map((row, i) => {
          const out = row.direction === "out";
          const [from, to] = out ? [sides[1], sides[0]] : sides;
          return (
            <li
              key={row.screen}
              data-direction={row.direction}
              className={clsx(
                styles.row,
                out && styles.out,
                revealed[i] && styles.in,
                i === active && styles.active,
                i === LOUD_INDEX && styles.loud,
                i === rows.length - 1 && styles.last,
              )}
              style={{ transitionDelay: `${i * 60}ms` }}
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() => setHovered(null)}
            >
              <span className={styles.rail} aria-hidden="true" />
              <span className={styles.label}>
                {toLocaleNumeral(i + 1, locale, { pad: 2 })}
                <span className={styles.labelSides}>
                  · {from} → {to}
                </span>
              </span>
              <p className={styles.wire}>
                {i === LOUD_INDEX && (
                  <span className={styles.figure}>{toLocaleNumeral(LOUD_FIGURE, locale)}</span>
                )}
                {row.wire}
              </p>
              <h2 className={styles.screen}>{row.screen}</h2>
              <p className={styles.built}>{row.built}</p>
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
        {project.link && (
          <a className={styles.link} href={project.link} target="_blank" rel="noreferrer">
            {hostname(project.link)} ↗
          </a>
        )}
      </footer>

      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
