"use client";

import { useRef } from "react";
import { BalanceFigure } from "./BalanceFigure";
import clsx from "clsx";
import type { ResolvedProject } from "@/shared/config";
import { useLocale } from "@/shared/lib/i18n";
import { toLocaleNumeral } from "@/shared/lib/chinese-numerals";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { useReveal } from "../lib/use-reveal";
import styles from "./CryptoMarketplace.module.scss";

interface CryptoMarketplaceProps {
  project: ResolvedProject;
}

export function CryptoMarketplace({ project }: CryptoMarketplaceProps) {
  const locale = useLocale();
  const listRef = useRef<HTMLOListElement>(null);
  const [lede, arc] = project.description.split(/\n{2,}/);
  const titles = project.arc?.steps ?? [];
  const steps = project.achievements.map((detail, i) => ({
    title: titles[i] ?? detail,
    detail,
  }));
  const last = steps.length - 1;

  const revealed = useReveal(listRef, steps.length);

  return (
    <main className={styles.main}>
      <header className={styles.head}>
        <div>
          <BalanceFigure />
          <h1 className={styles.title}>{project.name}</h1>
        </div>
        <p className={styles.lede}>{lede}</p>
      </header>

      <ol ref={listRef} className={styles.steps} data-composition="growth-curve">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className={clsx(
              styles.step,
              revealed[i] && styles.in,
              styles[`step${i + 1}`],
              i === last && styles.stepLast,
            )}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <div className={styles.stepBody}>
              <span className={styles.index}>
                {toLocaleNumeral(i + 1, locale, { pad: 2 })}
              </span>
              <h2 className={styles.name}>{step.title}</h2>
              <p className={styles.detail}>{step.detail}</p>
            </div>
            {i === last && arc && <p className={styles.arc}>{arc}</p>}
          </li>
        ))}
      </ol>

      <footer className={styles.meta}>
        <span>{project.displayDate}</span>
        <span className={styles.stack}>{project.stack.join("\u00a0· ")}</span>
      </footer>

      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
