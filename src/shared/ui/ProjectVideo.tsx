import styles from "./ProjectVideo.module.scss";

interface ProjectVideoProps {
  src: string;
}

export function ProjectVideo({ src }: ProjectVideoProps) {
  return (
    <div className={styles.wrapper}>
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={styles.video}
      />
    </div>
  );
}
