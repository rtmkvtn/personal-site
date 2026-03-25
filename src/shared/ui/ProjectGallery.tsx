import styles from "./ProjectGallery.module.scss";

interface GalleryImage {
  url: string;
  order: number;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  const sorted = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className={styles.gallery}>
      {sorted.map((img) => (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img key={img.url} src={img.url} alt="" className={styles.image} />
      ))}
    </div>
  );
}
