export interface Project {
  id: string;
  name: string;
  slug: string;
  index: number;
  type: "Frontend" | "Fullstack" | "TelegramMiniApp" | "TelegramBot";
  stack: string[];
  tags: string[];
  highlight: string;
  achievements: string[];
  description: unknown;
  date: string;
  link: string | null;
  githubLink: string | null;
  avatar: string | null;
  gallery: unknown;
  video: string | null;
  readmeFile: string | null;
  image?: string;
}

// Static images for decorative backgrounds, randomly assigned
export const PROJECT_IMAGES = [
  "/images/projects/topographic.png",
  "/images/projects/blueprint.png",
  "/images/projects/isometric-layers.png",
  "/images/projects/wireframe-box.png",
  "/images/projects/wave-flow.png",
  "/images/projects/grid-elevation.png",
  "/images/projects/grid-plan.png",
  "/images/projects/block-assembly.png",
  "/images/projects/contour-frame.png",
];

export function getProjectImage(index: number): string {
  return PROJECT_IMAGES[index % PROJECT_IMAGES.length];
}
