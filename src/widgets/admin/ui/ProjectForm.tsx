"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./RichTextEditor";
import styles from "./ProjectForm.module.scss";

const PROJECT_TYPES = [
  "Frontend",
  "Fullstack",
  "TelegramMiniApp",
  "TelegramBot",
] as const;

interface ProjectFormData {
  name: string;
  slug: string;
  index: number;
  type: (typeof PROJECT_TYPES)[number];
  stack: string[];
  tags: string[];
  highlight: string;
  achievements: string[];
  description: unknown;
  date: string;
  link: string;
  githubLink: string;
}

interface ProjectFormProps {
  initialData?: ProjectFormData & { id: string };
}

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [form, setForm] = useState<ProjectFormData>({
    name: initialData?.name ?? "",
    slug: initialData?.slug ?? "",
    index: initialData?.index ?? 1,
    type: initialData?.type ?? "Frontend",
    stack: initialData?.stack ?? [],
    tags: initialData?.tags ?? [],
    highlight: initialData?.highlight ?? "",
    achievements: initialData?.achievements ?? [],
    description: initialData?.description ?? null,
    date: initialData?.date ?? "",
    link: initialData?.link ?? "",
    githubLink: initialData?.githubLink ?? "",
  });

  const [stackInput, setStackInput] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [achievementsInput, setAchievementsInput] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function updateField<K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "name" && !isEdit) {
        next.slug = toSlug(value as string);
      }
      return next;
    });
  }

  function addToArray(
    key: "stack" | "tags" | "achievements",
    value: string,
    setInput: (v: string) => void,
  ) {
    if (!value.trim()) return;
    setForm((prev) => ({ ...prev, [key]: [...prev[key], value.trim()] }));
    setInput("");
  }

  function removeFromArray(
    key: "stack" | "tags" | "achievements",
    index: number,
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const url = isEdit
        ? `/api/admin/projects/${initialData.id}`
        : "/api/admin/projects";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to save");
      }

      router.push("/admin/projects");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>NAME</label>
          <input
            className={styles.input}
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>SLUG</label>
          <input
            className={styles.input}
            value={form.slug}
            onChange={(e) => updateField("slug", e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>INDEX</label>
          <input
            className={styles.input}
            type="number"
            value={form.index}
            onChange={(e) => updateField("index", parseInt(e.target.value) || 0)}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>TYPE</label>
          <select
            className={styles.select}
            value={form.type}
            onChange={(e) =>
              updateField("type", e.target.value as ProjectFormData["type"])
            }
          >
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>DATE</label>
        <input
          className={styles.input}
          value={form.date}
          onChange={(e) => updateField("date", e.target.value)}
          placeholder="Jan 2023 — Aug 2024"
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>HIGHLIGHT</label>
        <input
          className={styles.input}
          value={form.highlight}
          onChange={(e) => updateField("highlight", e.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>DESCRIPTION</label>
        <RichTextEditor
          content={form.description}
          onChange={(json) =>
            setForm((prev) => ({ ...prev, description: json }))
          }
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>STACK</label>
        <div className={styles.arrayInput}>
          <input
            className={styles.input}
            value={stackInput}
            onChange={(e) => setStackInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addToArray("stack", stackInput, setStackInput);
              }
            }}
            placeholder="Press Enter to add"
          />
          <div className={styles.chips}>
            {form.stack.map((item, i) => (
              <span key={i} className={styles.chip}>
                {item}
                <button
                  type="button"
                  onClick={() => removeFromArray("stack", i)}
                  className={styles.chipRemove}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>TAGS</label>
        <div className={styles.arrayInput}>
          <input
            className={styles.input}
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addToArray("tags", tagsInput, setTagsInput);
              }
            }}
            placeholder="Press Enter to add"
          />
          <div className={styles.chips}>
            {form.tags.map((item, i) => (
              <span key={i} className={styles.chip}>
                {item}
                <button
                  type="button"
                  onClick={() => removeFromArray("tags", i)}
                  className={styles.chipRemove}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>ACHIEVEMENTS</label>
        <div className={styles.arrayInput}>
          <input
            className={styles.input}
            value={achievementsInput}
            onChange={(e) => setAchievementsInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addToArray(
                  "achievements",
                  achievementsInput,
                  setAchievementsInput,
                );
              }
            }}
            placeholder="Press Enter to add"
          />
          <div className={styles.chips}>
            {form.achievements.map((item, i) => (
              <span key={i} className={styles.chip}>
                {item}
                <button
                  type="button"
                  onClick={() => removeFromArray("achievements", i)}
                  className={styles.chipRemove}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label}>LINK</label>
          <input
            className={styles.input}
            value={form.link}
            onChange={(e) => updateField("link", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>GITHUB LINK</label>
          <input
            className={styles.input}
            value={form.githubLink}
            onChange={(e) => updateField("githubLink", e.target.value)}
            placeholder="https://github.com/..."
          />
        </div>
      </div>

      <button type="submit" className={styles.submitButton} disabled={saving}>
        {saving ? "SAVING..." : isEdit ? "UPDATE PROJECT" : "CREATE PROJECT"}
      </button>
    </form>
  );
}
