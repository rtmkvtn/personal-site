import { getProjects } from "@/shared/lib/content-loader";
import { SkillsOverview } from "@/widgets/skills-overview";
import { SkillsOverviewPrototype } from "@/widgets/skills-overview/ui/SkillsOverview.prototype";

export default async function SkillsPage() {
  const projects = await getProjects();
  if (process.env.NODE_ENV !== "production") {
    return <SkillsOverviewPrototype projects={projects} />;
  }
  return <SkillsOverview projects={projects} />;
}
