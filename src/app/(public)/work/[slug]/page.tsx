import { getProjectBySlug } from "@/shared/lib/content-loader";
import { notFound } from "next/navigation";
import { ProjectDetail } from "./ProjectDetail";

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

  return <ProjectDetail project={project} />;
}
