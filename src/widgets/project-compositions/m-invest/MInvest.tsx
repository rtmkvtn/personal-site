"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { readProjectCopy } from "../lib/project-copy";
import { useReveal } from "../lib/use-reveal";
import { PipelineFigure } from "./PipelineFigure";
import styles from "./MInvest.module.scss";

interface MInvestProps {
  project: ResolvedProject;
}

const LOUD_INDEX = 2;
const AGENTS_INDEX = 3;
const ANCHOR_RATIO = 0.4;
const STACK_GAP_REM = 2.75;

interface Layout {
  tops: number[];
  ticks: number[];
  height: number;
  turn: number;
  agents: number;
  agentsLabel: number;
}

function parseMonth(when: string): [number, number] {
  const [y, m] = when.split("-").map(Number);
  return [y, m];
}

function monthsBetween(from: string, to: string): number {
  const [fy, fm] = parseMonth(from);
  const [ty, tm] = parseMonth(to);
  return (ty - fy) * 12 + (tm - fm);
}

function monthLabel(year: number, month: number, locale: string): string {
  if (locale === "zh") return `${toLocaleNumeral(month, locale)}月`;
  const label = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month - 1, 1)),
  );
  return label.replace(/\.$/, "");
}

export function MInvest({ project }: MInvestProps) {
  const locale = useLocale();
  const { t } = useTranslation();
  const trackRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const threeRef = useRef<HTMLSpanElement>(null);
  const { deck, lede, arc } = readProjectCopy(project.description);
  const events = useMemo(() => project.timeline?.events ?? [], [project.timeline]);
  const start = project.startDate ?? events[0]?.when ?? "2025-01";
  const end = project.endDate ?? events[events.length - 1]?.when ?? start;
  const months = monthsBetween(start, end) + 1;
  const [startYear, startMonth] = parseMonth(start);
  const [layout, setLayout] = useState<Layout | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const revealed = useReveal(listRef, events.length);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const list = listRef.current;
    if (!track || !list) return;
    const items = Array.from(list.children) as HTMLElement[];
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const monthHeight = parseFloat(getComputedStyle(track).getPropertyValue("--month")) * rem;
      const gap = STACK_GAP_REM * rem;
      let prevBottom = -Infinity;
      const tops: number[] = new Array(events.length).fill(0);
      const ticks: number[] = [];
      for (let m = 0; m < months; m++) {
        const tick = m === 0 ? 0 : Math.max(ticks[m - 1] + monthHeight, prevBottom + gap);
        ticks.push(tick);
        events.forEach((event, i) => {
          if (monthsBetween(start, event.when) !== m) return;
          const top = Math.max(tick, prevBottom + gap);
          tops[i] = top;
          prevBottom = top + items[i].offsetHeight;
        });
      }
      const verbMid = (i: number) => {
        const verb = items[i]?.querySelector("h2");
        return verb ? tops[i] + verb.offsetTop + verb.offsetHeight / 2 : tops[i] ?? 0;
      };
      const turn = verbMid(LOUD_INDEX);
      const agents = verbMid(AGENTS_INDEX);
      const threeLength = threeRef.current?.offsetHeight ?? 0;
      setLayout({
        tops,
        ticks,
        height: Math.max(ticks[months - 1] + monthHeight, prevBottom),
        turn,
        agents,
        agentsLabel: Math.max(agents, turn + threeLength + 2 * rem),
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [events, start, months, locale]);

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
  }, [events.length, layout]);

  const active = hovered ?? current;
  const ticks = Array.from({ length: months }, (_, i) => {
    const total = startMonth - 1 + i;
    return { year: startYear + Math.floor(total / 12), month: (total % 12) + 1 };
  });

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.body}>
          <div>
            <p className={styles.deck}>{deck}</p>
            <PipelineFigure />
          </div>
          {lede && <p className={styles.lede}>{lede}</p>}
        </div>
      </header>

      <div
        ref={trackRef}
        className={styles.track}
        style={layout ? { height: layout.height } : undefined}
        data-timeline
        data-measured={layout ? "true" : undefined}
      >
        {ticks.map((tick, i) => (
          <span
            key={`${tick.year}-${tick.month}`}
            className={styles.month}
            style={{ top: layout ? layout.ticks[i] : `calc(${i} * var(--month))` }}
            data-tick
            aria-hidden="true"
          >
            <span className={styles.monthLabel}>{monthLabel(tick.year, tick.month, locale)}</span>
            <span className={styles.tick} />
          </span>
        ))}

        <span
          className={styles.line}
          style={layout ? { bottom: "auto", height: layout.turn } : undefined}
          data-axis-line="me"
          aria-hidden="true"
        />
        {layout && (
          <>
            <span
              className={clsx(styles.line, styles.lineStaffed)}
              style={{ top: layout.turn }}
              data-axis-line="me-staffed"
              aria-hidden="true"
            />
            <span
              className={clsx(styles.line, styles.lineStaffed, styles.lineSecond)}
              style={{ top: layout.turn }}
              data-axis-line="second"
              aria-hidden="true"
            />
            <span
              className={clsx(styles.line, styles.lineStaffed, styles.lineThird)}
              style={{ top: layout.turn }}
              data-axis-line="third"
              aria-hidden="true"
            />
            <span
              className={clsx(styles.line, styles.lineAgents)}
              style={{ top: layout.agents }}
              data-axis-line="agents"
              aria-hidden="true"
            />
          </>
        )}
        <span className={clsx(styles.staff, styles.staffOne)} style={{ top: 0 }}>
          {t("timeline.one")}
        </span>
        <span
          ref={threeRef}
          className={clsx(styles.staff, styles.staffThree, !layout && styles.staffPending)}
          style={{ top: layout?.turn ?? 0 }}
        >
          {t("timeline.three")}
        </span>
        <span
          className={clsx(styles.staff, styles.staffAgents, !layout && styles.staffPending)}
          style={{ top: layout?.agentsLabel ?? 0 }}
        >
          {t("timeline.agents")}
        </span>

        <ol
          ref={listRef}
          className={styles.events}
          data-composition="six-months"
          data-active={active}
        >
          {events.map((event, i) => (
            <li
              key={event.when + event.name}
              className={clsx(
                styles.event,
                revealed[i] && styles.in,
                i === active && styles.active,
                i === LOUD_INDEX && styles.loud,
              )}
              style={{
                top: layout ? layout.tops[i] : `calc(${monthsBetween(start, event.when)} * var(--month))`,
                transitionDelay: `${i * 60}ms`,
              }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") setHovered(i);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setHovered(null);
              }}
            >
              <h2 className={styles.name}>{event.name}</h2>
              <p className={styles.detail}>{event.detail}</p>
            </li>
          ))}
        </ol>
      </div>

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
