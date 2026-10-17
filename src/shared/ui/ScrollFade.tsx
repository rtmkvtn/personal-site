import styles from "./ScrollFade.module.scss";

export function ScrollFade() {
  return (
    <>
      <div className={styles.top} aria-hidden="true" data-scroll-fade="top" />
      <div className={styles.bottom} aria-hidden="true" data-scroll-fade="bottom" />
    </>
  );
}
