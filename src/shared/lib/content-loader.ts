import fs from "fs/promises";
import path from "path";
import type { Project, ProjectJson } from "@/shared/config/projects";

const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const VIDEO_EXTENSIONS = new Set([".mp4"]);

const CONTENT_DIR = path.resolve(process.cwd(), "content/projects");

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function getDisplayDate(startDate?: string, endDate?: string): string {
  if (startDate && endDate) {
    return `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }
  return formatDate(startDate || endDate!);
}

function getSortDate(json: ProjectJson): string {
  return json.endDate || json.startDate!;
}

async function discoverMedia(
  projectDir: string,
  slug: string,
): Promise<{ avatar: string | null; gallery: string[]; video: string | null }> {
  const entries = await fs.readdir(projectDir, { withFileTypes: true });

  const images: string[] = [];
  let video: string | null = null;

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      images.push(entry.name);
    } else if (!video && VIDEO_EXTENSIONS.has(ext)) {
      video = entry.name;
    }
  }

  images.sort();
  const avatar = images.length > 0 ? `/content/projects/${slug}/${images[0]}` : null;
  const videoPath = video ? `/content/projects/${slug}/${video}` : null;

  // Gallery
  let gallery: string[] = [];
  const galleryDir = path.join(projectDir, "gallery");
  try {
    const galleryEntries = await fs.readdir(galleryDir, { withFileTypes: true });
    gallery = galleryEntries
      .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
      .map((e) => e.name)
      .sort()
      .map((name) => `/content/projects/${slug}/gallery/${name}`);
  } catch {
    // no gallery directory
  }

  return { avatar, gallery, video: videoPath };
}

async function loadProject(projectDir: string, slug: string): Promise<Project> {
  const jsonPath = path.join(projectDir, "project.json");
  const raw = await fs.readFile(jsonPath, "utf-8");
  const json: ProjectJson = JSON.parse(raw);
  const media = await discoverMedia(projectDir, slug);

  return {
    ...json,
    slug,
    avatar: media.avatar,
    gallery: media.gallery,
    video: media.video,
    displayDate: getDisplayDate(json.startDate, json.endDate),
  };
}

export async function getProjects(contentDir: string = CONTENT_DIR): Promise<Project[]> {
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const dirs = entries.filter((e) => e.isDirectory());

  const projects = await Promise.all(
    dirs.map((dir) => loadProject(path.join(contentDir, dir.name), dir.name)),
  );

  return projects.sort((a, b) => {
    const dateA = getSortDate(a);
    const dateB = getSortDate(b);
    return dateB.localeCompare(dateA);
  });
}

export async function getProjectBySlug(
  slug: string,
  contentDir: string = CONTENT_DIR,
): Promise<Project | null> {
  const projectDir = path.join(contentDir, slug);
  try {
    await fs.access(projectDir);
    return await loadProject(projectDir, slug);
  } catch {
    return null;
  }
}
