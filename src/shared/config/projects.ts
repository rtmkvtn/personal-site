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

export const INTERPRETER_DIRECTIONS = ["in", "out"] as const;

export type InterpreterDirection = (typeof INTERPRETER_DIRECTIONS)[number];

export interface InterpreterRowJson {
  direction: InterpreterDirection;
  wire: LocalizedString;
  screen: LocalizedString;
  built: LocalizedString;
}

export interface InterpreterRow {
  direction: InterpreterDirection;
  wire: string;
  screen: string;
  built: string;
}

export interface TimelineEventJson {
  when: string; // YYYY-MM
  name: LocalizedString;
  detail: LocalizedString;
}

export interface TimelineEvent {
  when: string;
  name: string;
  detail: string;
}

export interface ByHandRowJson {
  what: LocalizedString;
  before: LocalizedString;
  now: LocalizedString;
}

export interface ByHandRow {
  what: string;
  before: string;
  now: string;
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
  interpreter?: { rows: InterpreterRowJson[] };
  timeline?: { events: TimelineEventJson[] };
  byHand?: { operators: ByHandRowJson[]; team: ByHandRowJson[] };
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
    | "interpreter"
    | "timeline"
    | "byHand"
  > {
  name: string;
  highlight: string;
  description: string;
  achievements: string[];
  aiFirst?: ResolvedAiFirst;
  arc?: { steps: string[] };
  journey?: { stages: JourneyStage[] };
  handoff?: { stages: HandoffStage[] };
  interpreter?: { rows: InterpreterRow[] };
  timeline?: { events: TimelineEvent[] };
  byHand?: { operators: ByHandRow[]; team: ByHandRow[] };
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
