export const PROJECT_TYPES = [
  "Frontend",
  "Fullstack",
  "TelegramMiniApp",
  "TelegramBot",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface ProjectJson {
  name: string;
  type: ProjectType;
  stack: string[];
  highlight: string;
  achievements: string[];
  description: string;
  startDate?: string; // YYYY-MM
  endDate?: string; // YYYY-MM
  link?: string;
  githubLink?: string;
}

export interface Project extends ProjectJson {
  slug: string;
  avatar: string | null;
  gallery: string[];
  video: string | null;
  displayDate: string;
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
