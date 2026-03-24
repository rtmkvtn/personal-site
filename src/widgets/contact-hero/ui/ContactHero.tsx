import styles from "./ContactHero.module.scss";

export function ContactHero() {
  return (
    <main className={styles.main}>
      <span className={styles.watermark}>05</span>

      <div className={styles.hairline} />

      <div className={styles.content}>
        <p className={styles.label}>Get in Touch</p>

        <h1 className={styles.title}>CONTACT</h1>

        <div className={styles.body}>
          <p className={styles.paragraph}>
            Available for select projects and collaborations. Reach out to
            discuss how we can build something exceptional together.
          </p>
        </div>

        <div className={styles.sections}>
          <div>
            <h2 className={styles.sectionTitle}>Email</h2>
            <a
              href="mailto:hello@studiomonolith.dev"
              className={styles.emailLink}
            >
              hello@studiomonolith.dev
            </a>
          </div>

          <div>
            <h2 className={styles.sectionTitle}>Location</h2>
            <p className={styles.sectionBody}>
              Remote — Available Worldwide
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
