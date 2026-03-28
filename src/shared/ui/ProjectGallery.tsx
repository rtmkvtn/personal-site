import styles from "./ProjectGallery.module.scss";

interface ProjectGalleryProps {
  images: string[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className={styles.gallery}>
      {images.map((src) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={src} src={src} alt="" className={styles.image} />
      ))}
    </div>
  );
}
