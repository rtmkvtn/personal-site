"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "./HomeHero.module.scss";

export function HomeHero() {
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <span className={styles.watermark} aria-hidden="true">
        01
      </span>

      <div className={styles.hairline} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.subtitle}>
          <b className={styles.subtitleBold}>{t("home.greeting")}</b>{" "}
          {t("home.intro")}
        </p>

        <h1 className={styles.title}>{t("home.name")}</h1>

        <p className={styles.description}>{t("home.role")}</p>

        <Link href="/work" className={styles.cta}>
          {t("home.cta")}
          <span className={styles.ctaArrow}>&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
