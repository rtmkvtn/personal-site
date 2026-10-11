"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PrototypeSwitcher } from "@/shared/ui/PrototypeSwitcher/PrototypeSwitcher";
import { GRAPHICS_VARIANTS, JourneyMap, StageFigure, Transcript, type GraphicsVariant } from "./graphics.prototype";
import clsx from "clsx";
import type { ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { useReveal } from "../lib/use-reveal";
import styles from "./Wizmart.module.scss";
import protoStyles from "./graphics.prototype.module.scss";

interface WizmartProps {
  project: ResolvedProject;
}

const EVENT_INDEX = 1;

export function Wizmart({ project }: WizmartProps) {
  if (process.env.NODE_ENV !== "production") {
    return (
      <Suspense>
        <WizmartWithGraphics project={project} />
      </Suspense>
    );
  }
  return <WizmartBase project={project} />;
}

function WizmartWithGraphics({ project }: WizmartProps) {
  const variant = (useSearchParams().get("variant") ?? "A") as GraphicsVariant;
  return (
    <>
      <WizmartBase project={project} graphics={variant} />
      <PrototypeSwitcher variants={GRAPHICS_VARIANTS} current={variant} />
    </>
  );
}

function WizmartBase({ project, graphics }: WizmartProps & { graphics?: GraphicsVariant }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const active = hovered ?? current;
  const locale = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const [lede, arc] = project.description.split(/\n{2,}/);
  const stages = project.journey?.stages ?? [];
  useReveal(listRef, styles.in, stages.length);

  useEffect(() => {
    if (!graphics) return;
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
  }, [graphics, stages.length]);

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <p className={styles.lede}>{lede}</p>
      </header>
      <div className={styles.journey}>
        {graphics === "A" && (
          <div className={protoStyles.mapSticky}>
            <JourneyMap active={active} />
          </div>
        )}
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
              {graphics === "B" && <StageFigure index={i} />}
              {graphics === "C" && i === EVENT_INDEX && <Transcript />}
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
        <span className={styles.stack}>{project.stack.join(" · ")}</span>
      </footer>

      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
