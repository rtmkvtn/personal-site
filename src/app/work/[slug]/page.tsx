import { getProjectBySlug } from "@/shared/lib/projects";
import { notFound } from "next/navigation";
import { RichTextRenderer } from "@/shared/ui/RichTextRenderer";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

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

  const gallery = (project.gallery as { url: string; order: number }[]) ?? [];

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.name}</h1>
      {project.description && (
        <RichTextRenderer content={project.description} />
      )}
      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={gallery} />
    </main>
  );
}
