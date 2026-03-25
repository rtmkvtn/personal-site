import styles from "./page.module.scss";

export default function DashboardPage() {
  return (
    <div className={styles.dashboard}>
      <h1 className={styles.title}>DASHBOARD</h1>
      <p className={styles.subtitle}>Portfolio CMS</p>
    </div>
  );
}
