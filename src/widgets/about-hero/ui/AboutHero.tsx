import styles from "./AboutHero.module.scss";

export function AboutHero() {
  return (
    <main className={styles.main}>
      <span className={styles.watermark}>04</span>

      <div className={styles.hairline} />

      <div className={styles.content}>
        <p className={styles.label}>Background</p>

        <h1 className={styles.title}>ABOUT</h1>

        <div className={styles.body}>
          <p className={styles.paragraph}>
            A fullstack engineer focused on building scalable digital
            infrastructure. With a background spanning distributed systems,
            frontend architecture, and cloud-native platforms, I approach
            every project as an exercise in intentional design.
          </p>

          <p className={`${styles.paragraph} ${styles.paragraphSpaced}`}>
            My work is guided by a belief that great engineering is
            indistinguishable from great design — both demand clarity,
            restraint, and an obsessive attention to the details that most
            people never notice.
          </p>
        </div>

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Approach</h2>
          <p className={styles.sectionBody}>
            Systems thinking over feature stacking. Every architectural
            decision is made with long-term maintainability and operational
            excellence in mind. I build infrastructure that scales silently.
          </p>
        </div>
      </div>
    </main>
  );
}
