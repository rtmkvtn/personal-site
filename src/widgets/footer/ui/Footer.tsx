"use client";

import { useTranslation } from "react-i18next";
import styles from "./Footer.module.scss";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        &copy; {new Date().getFullYear()} rtmkvtn
      </span>

      <div className={styles.links}>
        {[{ labelKey: "footer.linkedin", href: "#" }].map(
          ({ labelKey, href }) => (
            <a
              key={labelKey}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {t(labelKey)}
            </a>
          ),
        )}
      </div>
    </footer>
  );
}
