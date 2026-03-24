import styles from "./Footer.module.scss";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        &copy; {new Date().getFullYear()} rtmkvtn
      </span>

      <div className={styles.links}>
        {[
          { label: "LINKEDIN", href: "#" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {label}
          </a>
        ))}
      </div>
    </footer>
  );
}
