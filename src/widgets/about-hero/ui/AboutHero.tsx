"use client";

import { useTranslation } from "react-i18next";
import styles from "./AboutHero.module.scss";

export function AboutHero() {
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <span className={styles.watermark}>04</span>

      <div className={styles.hairline} />

      <div className={styles.content}>
        <p className={styles.label}>{t("about.label")}</p>

        <h1 className={styles.title}>{t("about.title")}</h1>

        <div className={styles.body}>
          <p className={styles.paragraph}>{t("about.bio1")}</p>

          <p className={`${styles.paragraph} ${styles.paragraphSpaced}`}>
            {t("about.bio2")}
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("about.approachTitle")}</h2>
          <p className={styles.sectionBody}>{t("about.approachBody")}</p>
        </div>
      </div>
    </main>
  );
}
