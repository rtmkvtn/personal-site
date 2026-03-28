"use client";

import { useTranslation } from "react-i18next";
import styles from "./ContactHero.module.scss";

export function ContactHero() {
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      <span className={styles.watermark}>05</span>

      <div className={styles.hairline} />

      <div className={styles.content}>
        <p className={styles.label}>{t("contact.label")}</p>

        <h1 className={styles.title}>{t("contact.title")}</h1>

        <div className={styles.body}>
          <p className={styles.paragraph}>{t("contact.body")}</p>
        </div>

        <div className={styles.sections}>
          <div>
            <h2 className={styles.sectionTitle}>{t("contact.emailTitle")}</h2>
            <a
              href="mailto:hello@studiomonolith.dev"
              className={styles.emailLink}
            >
              hello@studiomonolith.dev
            </a>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>
              {t("contact.locationTitle")}
            </h2>
            <p className={styles.sectionBody}>{t("contact.location")}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
