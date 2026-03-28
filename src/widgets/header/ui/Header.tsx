"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { NAV_LINKS } from "@/shared/config";
import { LanguageSwitcher } from "@/shared/ui";
import styles from "./Header.module.scss";

export function Header() {
  const pathname = usePathname();
  const { t } = useTranslation();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        rtmkvtn
      </Link>

      <div className={styles.right}>
        <div className={styles.links}>
          {NAV_LINKS.map(({ href, labelKey }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx(styles.link, isActive && styles.linkActive)}
              >
                {t(labelKey)}
                {isActive && <span className={styles.dot} />}
              </Link>
            );
          })}
        </div>
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
