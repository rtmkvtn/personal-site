import { WorkShowcase } from "@/widgets/work-showcase";
import { getProjects } from "@/shared/lib/content-loader";
import { getProjectImage } from "@/shared/config";

export default async function WorkPage() {
  const projects = await getProjects();
  const withImages = projects.map((p, i) => ({
    ...p,
    image: getProjectImage(i),
  }));

  return <WorkShowcase projects={withImages} />;
}
