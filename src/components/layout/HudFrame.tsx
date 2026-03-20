import styles from './HudFrame.module.css';

export function HudFrame() {
  return (
    <div className={styles.frame} aria-hidden>
      {/* Corner brackets */}
      <div className={`${styles.corner} ${styles.tl}`} />
      <div className={`${styles.corner} ${styles.tr}`} />
      <div className={`${styles.corner} ${styles.bl}`} />
      <div className={`${styles.corner} ${styles.br}`} />

      {/* Scan line */}
      <div className={styles.scanLine} />
    </div>
  );
}
