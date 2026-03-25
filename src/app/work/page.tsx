import { WorkShowcase } from "@/widgets/work-showcase";
import { getProjects } from "@/shared/lib/projects";
import { getProjectImage } from "@/shared/config";

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getProjects();
  const withImages = projects.map((p) => ({
    ...p,
    image: getProjectImage(p.index),
  }));

  return <WorkShowcase projects={withImages} />;
}
