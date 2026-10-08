"use client";

import clsx from "clsx";
import { useTranslation } from "react-i18next";
import type { ResolvedAiFirst } from "@/shared/config";
import { toChineseNumeral } from "@/shared/lib/chinese-numerals";
import styles from "./HowItWasBuilt.module.scss";

interface HowItWasBuiltProps {
  data: ResolvedAiFirst;
}

type Owner = "me" | "agents";
type StepKey = "specify" | "implement" | "verify" | "review";

const STEPS: { key: StepKey; owner: Owner }[] = [
  { key: "specify", owner: "me" },
  { key: "implement", owner: "agents" },
  { key: "verify", owner: "agents" },
  { key: "review", owner: "me" },
];

export function HowItWasBuilt({ data }: HowItWasBuiltProps) {
  const { t, i18n } = useTranslation();
  const isZh = i18n.language === "zh";
  const index = (i: number) =>
    isZh ? toChineseNumeral(i, "value") : String(i).padStart(2, "0");

  return (
    <section className={styles.section} aria-label={t("built.label")}>
      <div className={styles.marks} aria-hidden="true">
        <span className={styles.guideVertical} />
        <span className={styles.guideRight} />
        <span className={clsx(styles.mark, styles.markIndent)} />
        <span className={clsx(styles.mark, styles.markWidth)} />
        {data.anchor.mark && (
          <span className={clsx(styles.mark, styles.markRotated)}>{data.anchor.mark}</span>
        )}
      </div>

      <div className={styles.inner}>
        <p className={styles.label}>{t("built.label")}</p>

        <div className={styles.body}>
          <ol className={styles.steps}>
            {STEPS.map((step, i) => {
              const handsOff = i > 0 && STEPS[i - 1].owner === "me" && step.owner === "agents";
              return (
              <li
                key={step.key}
                className={clsx(
                  styles.step,
                  step.owner === "agents" ? styles.stepAgents : styles.stepMe,
                  handsOff && styles.stepAfterHandoff,
                )}
              >
                {handsOff && (
                  <div className={styles.handoff} aria-hidden="true">
                    <span className={styles.handoffLine} />
                    <span className={styles.crosshair}>
                      <span className={styles.crosshairV} />
                      <span className={styles.crosshairH} />
                    </span>
                    <span className={clsx(styles.mark, styles.markHandoff)}>
                      {t("built.handoff")}
                    </span>
                  </div>
                )}
                <div className={styles.row}>
                  <span className={styles.index}>{index(i + 1)}</span>
                  <span className={styles.owner}>{t(`built.${step.owner}`)}</span>
                  <span className={styles.name}>{t(`built.${step.key}`)}</span>
                  <span className={styles.detail}>{data.steps[step.key]}</span>
                </div>
              </li>
              );
            })}
          </ol>

          <p className={styles.anchor}>
            <span className={styles.anchorValue}>{data.anchor.value}</span>
            <span className={styles.anchorLabel}>{data.anchor.label}</span>
          </p>
        </div>

        {data.note && <p className={styles.note}>{data.note}</p>}
      </div>
    </section>
  );
}
