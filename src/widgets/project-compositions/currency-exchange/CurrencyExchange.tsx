"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ByHandRow, ResolvedProject } from "@/shared/config";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { useReveal } from "../lib/use-reveal";
import { EntryFigure } from "./EntryFigure";
import styles from "./CurrencyExchange.module.scss";

interface CurrencyExchangeProps {
  project: ResolvedProject;
}

const ANCHOR_RATIO = 0.4;
const REPO = "team-agents";

function splitLede(text: string): [string, string] {
  const match = text.match(/^(.+?[.。])\s*([\s\S]*)$/);
  return match ? [match[1], match[2]] : [text, ""];
}

interface LedgerProps {
  name: string;
  rows: ByHandRow[];
  offset: number;
  active: number;
  revealed: boolean[];
  listRef: React.RefObject<HTMLOListElement | null>;
  onHover: (index: number | null) => void;
  className?: string;
}

function Ledger({ name, rows, offset, active, revealed, listRef, onHover, className }: LedgerProps) {
  const { t } = useTranslation();
  return (
    <section className={clsx(styles.ledger, className)} aria-label={name}>
      <header className={styles.ledgerHead}>
        <span className={styles.ledgerName}>{name}</span>
        <span className={styles.colHead}>{t("byHand.before")}</span>
        <span className={styles.colHead}>{t("byHand.now")}</span>
      </header>
      <ol ref={listRef} className={styles.rows} data-ledger={name}>
        {rows.map((row, i) => {
          const index = offset + i;
          return (
            <li
              key={row.what}
              className={clsx(styles.row, revealed[i] && styles.in, index === active && styles.active)}
              style={{ transitionDelay: `${i * 60}ms` }}
              onPointerEnter={(e) => {
                if (e.pointerType === "mouse") onHover(index);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") onHover(null);
              }}
            >
              <h3 className={styles.what}>{row.what}</h3>
              <p className={styles.before}>
                <span className={styles.inlineHead}>{t("byHand.before")}</span>
                {row.before}
              </p>
              <p className={styles.now}>
                <span className={styles.inlineHead}>{t("byHand.now")}</span>
                {row.now}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function CurrencyExchange({ project }: CurrencyExchangeProps) {
  const { t } = useTranslation();
  const operatorsRef = useRef<HTMLOListElement>(null);
  const teamRef = useRef<HTMLOListElement>(null);
  const [lede, arc] = project.description.split(/\n{2,}/);
  const [deck, ledeRest] = splitLede(lede);
  const operators = useMemo(() => project.byHand?.operators ?? [], [project.byHand]);
  const team = useMemo(() => project.byHand?.team ?? [], [project.byHand]);
  const [hovered, setHovered] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);
  const revealedOperators = useReveal(operatorsRef, operators.length);
  const revealedTeam = useReveal(teamRef, team.length);

  useEffect(() => {
    const lists = [operatorsRef.current, teamRef.current].filter(Boolean) as HTMLOListElement[];
    const items = lists.flatMap((list) => Array.from(list.children) as HTMLElement[]);
    if (!items.length) return;
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
  }, [operators.length, team.length]);

  const active = hovered ?? current;

  return (
    <main className={styles.main} data-composition="taken-off-hands" data-active={active}>
      <header className={styles.head}>
        <h1 className={styles.title}>{project.name}</h1>
        <div className={styles.body}>
          <div>
            <p className={styles.deck}>{deck}</p>
            <EntryFigure />
          </div>
          {ledeRest && <p className={styles.lede}>{ledeRest}</p>}
        </div>
      </header>

      <div className={styles.figures} data-figures>
        <p className={styles.figure}>
          <span className={styles.figureValue}>{t("byHand.exchanges")}</span>
          <span className={styles.figureCaption}>{t("byHand.exchangesCaption")}</span>
        </p>
        <p className={styles.figure}>
          <span className={styles.figureValue}>{t("byHand.half")}</span>
          <span className={styles.figureCaption}>{t("byHand.halfCaption")}</span>
        </p>
      </div>

      <Ledger
        name={t("byHand.operators")}
        rows={operators}
        offset={0}
        active={active}
        revealed={revealedOperators}
        listRef={operatorsRef}
        onHover={setHovered}
        className={styles.ledgerFirst}
      />

      <div className={styles.handoff} aria-hidden="true" data-handoff>
        <span className={styles.handoffLine} />
        <span className={styles.crosshair}>
          <span className={styles.crosshairV} />
          <span className={styles.crosshairH} />
        </span>
        <span className={styles.mark}>{REPO}</span>
      </div>

      <Ledger
        name={t("byHand.team")}
        rows={team}
        offset={operators.length}
        active={active}
        revealed={revealedTeam}
        listRef={teamRef}
        onHover={setHovered}
      />

      {arc && (
        <div className={styles.close}>
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
