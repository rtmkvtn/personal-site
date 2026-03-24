import { PROJECTS } from "@/shared/config";
import { notFound } from "next/navigation";
import styles from "./page.module.scss";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{project.name}</h1>
    </main>
  );
}
