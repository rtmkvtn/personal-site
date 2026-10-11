export const PROJECT_TYPES = [
  "Frontend",
  "Fullstack",
  "TelegramMiniApp",
  "TelegramBot",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface LocalizedString {
  en: string;
  ru?: string;
  zh?: string;
}

export interface LocalizedStringArray {
  en: string[];
  ru?: string[];
  zh?: string[];
}

export interface AiFirstJson {
  steps: {
    specify: LocalizedString;
    implement: LocalizedString;
    verify: LocalizedString;
    review: LocalizedString;
  };
  anchor: {
    value: LocalizedString;
    label: LocalizedString;
    mark?: string;
  };
  note?: LocalizedString;
}

export interface ResolvedAiFirst {
  steps: {
    specify: string;
    implement: string;
    verify: string;
    review: string;
  };
  anchor: {
    value: string;
    label: string;
    mark?: string;
  };
  note?: string;
}

export interface JourneyStageJson {
  name: LocalizedString;
  fact: LocalizedString;
  built: LocalizedString;
}

export interface JourneyStage {
  name: string;
  fact: string;
  built: string;
}

export const HANDOFF_ACTORS = ["author", "admin", "student"] as const;

export type HandoffActor = (typeof HANDOFF_ACTORS)[number];

export interface HandoffStageJson extends JourneyStageJson {
  actor: HandoffActor;
}

export interface HandoffStage extends JourneyStage {
  actor: HandoffActor;
}

export interface ProjectJson {
  name: LocalizedString;
  type: ProjectType;
  stack: string[];
  highlight: LocalizedString;
  achievements: LocalizedStringArray;
  description: LocalizedString;
  startDate?: string; // YYYY-MM
  endDate?: string; // YYYY-MM
  link?: string;
  githubLink?: string;
  aiFirst?: AiFirstJson;
  arc?: { steps: LocalizedStringArray };
  journey?: { stages: JourneyStageJson[] };
  handoff?: { stages: HandoffStageJson[] };
}

export interface Project extends ProjectJson {
  slug: string;
  avatar: string | null;
  gallery: string[];
  video: string | null;
  displayDate: string;
  image?: string;
}

export interface ResolvedProject
  extends Omit<
    Project,
    | "name"
    | "highlight"
    | "description"
    | "achievements"
    | "aiFirst"
    | "arc"
    | "journey"
    | "handoff"
  > {
  name: string;
  highlight: string;
  description: string;
  achievements: string[];
  aiFirst?: ResolvedAiFirst;
  arc?: { steps: string[] };
  journey?: { stages: JourneyStage[] };
  handoff?: { stages: HandoffStage[] };
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
