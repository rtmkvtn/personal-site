import Link from "next/link";
import styles from "./HomeHero.module.scss";

export function HomeHero() {
  return (
    <main className={styles.main}>
      <span className={styles.watermark} aria-hidden="true">
        01
      </span>

      <div className={styles.hairline} aria-hidden="true" />

      <div className={styles.content}>
        <p className={styles.subtitle}>
          <b className={styles.subtitleBold}>Hi!</b> My name is
        </p>

        <h1 className={styles.title}>ARTEM</h1>

        <p className={styles.description}>Fullstack Web Engineer</p>

        <Link href="/work" className={styles.cta}>
          View Work
          <span className={styles.ctaArrow}>&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
