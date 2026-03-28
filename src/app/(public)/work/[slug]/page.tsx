import { getProjectBySlug } from "@/shared/lib/content-loader";
import { notFound } from "next/navigation";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import styles from "./page.module.scss";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.name}</h1>
      {project.description && (
        <p className={styles.description}>{project.description}</p>
      )}
      {project.achievements.length > 0 && (
        <ul className={styles.achievements}>
          {project.achievements.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      )}
      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </main>
  );
}
