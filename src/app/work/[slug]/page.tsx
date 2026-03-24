import { PROJECTS } from "@/shared/config";
import { notFound } from "next/navigation";

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
    <main className="relative flex flex-1 items-center justify-center">
      <h1 className="text-[3.5rem] font-extralight tracking-[-0.02em] text-primary">
        {project.name}
      </h1>
    </main>
  );
}
