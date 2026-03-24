"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS } from "@/shared/config";
import styles from "./Header.module.scss";

export function Header() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        rtmkvtn
      </Link>

      <div className={styles.links}>
        {NAV_LINKS.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(styles.link, isActive && styles.linkActive)}
            >
              {label}
              {isActive && <span className={styles.dot} />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
