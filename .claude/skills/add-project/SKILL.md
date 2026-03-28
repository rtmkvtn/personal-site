---
name: add-project
description: Interactively guide the user through adding a new portfolio project. Asks for all details step-by-step and creates the project folder with project.json and media files.
---

# Add Project

Interactive wizard for adding a new project to the portfolio site.

## Content Model Reference

Projects live in `public/content/projects/{slug}/` with this structure:

```
public/content/projects/{slug}/
  project.json          # Project metadata
  avatar.png            # First image alphabetically = avatar (optional)
  gallery/              # Gallery images sorted by filename (optional)
    01.png
    02.png
  demo.mp4              # Auto-discovered video (optional)
```

### project.json schema

Translatable fields use a `LocalizedString` object with `en` (required), `ru` (optional), and `zh` (optional) keys. Non-translatable fields remain flat.

```json
{
  "name": { "en": "Project Name", "ru": "Название проекта", "zh": "项目名称" },
  "type": "Frontend | Fullstack | TelegramMiniApp | TelegramBot",
  "stack": ["React", "TypeScript"],
  "highlight": { "en": "Short one-liner", "ru": "Краткое описание", "zh": "简短描述" },
  "achievements": {
    "en": ["Achievement 1", "Achievement 2"],
    "ru": ["Достижение 1", "Достижение 2"],
    "zh": ["成就 1", "成就 2"]
  },
  "description": { "en": "Plain text description", "ru": "Описание", "zh": "描述" },
  "startDate": "YYYY-MM",
  "endDate": "YYYY-MM",
  "link": "https://example.com",
  "githubLink": "https://github.com/..."
}
```

### Field rules

**Translatable fields** (use `LocalizedString` / `LocalizedStringArray`):
- `name` (required): Project display name. `en` is required, `ru` and `zh` are optional (fall back to `en`).
- `highlight` (required): One-sentence summary shown on hover in the project list.
- `achievements` (required): Array of accomplishments, rendered as bullet points.
- `description` (required): Plain text project description.

**Non-translatable fields** (flat values):
- `type` (required): One of `Frontend`, `Fullstack`, `TelegramMiniApp`, `TelegramBot`
- `stack` (required): Array of technologies/tools used
- `startDate` (optional): Format `YYYY-MM`. At least one of startDate/endDate is required
- `endDate` (optional): Format `YYYY-MM`. At least one of startDate/endDate is required
- `link` (optional): Live project URL
- `githubLink` (optional): GitHub repository URL

### Display rules

- Both dates present: "Jan 2024 — Mar 2024" (locale-aware, formatted via `Intl.DateTimeFormat`)
- One date only: "Jan 2024"
- Projects are sorted by endDate descending (newest first). A single date is treated as endDate for sorting.

### Media discovery

- **Avatar**: First image file (png/jpg/webp/avif) alphabetically in the project root
- **Gallery**: All images in `gallery/` subfolder, sorted by filename
- **Video**: First `.mp4` file in the project root
- **Slug**: Derived from folder name

## Process

### Step 1: Detect conversation language

The user may speak in English or Russian. Conduct the interview in whichever language they use. All collected text becomes the source language.

### Step 2: Gather project info

Ask the user for each field one at a time, in this order. Confirm each answer before moving on. If the user provides partial info upfront, skip those questions.

1. **Name** — "What's the project name?"
2. **Slug** — Suggest a slug derived from the name (lowercase, hyphenated, transliterated to Latin if given in Russian). Ask if they want to change it.
3. **Type** — "What type? (Frontend / Fullstack / TelegramMiniApp / TelegramBot)"
4. **Dates** — "When did you work on this? Give me start and/or end dates (YYYY-MM format, e.g. 2024-01)."
5. **Highlight** — "Give me a one-sentence highlight for the project list hover."
6. **Description** — "Write a plain text description of the project."
7. **Stack** — "What technologies did you use? (comma-separated)"
8. **Achievements** — "List your key achievements (one per line or comma-separated)."
9. **Links** — "Live URL? GitHub URL? (skip if none)"

Collect all translatable fields in the user's language only. Do NOT ask the user to provide translations — you will generate them automatically in Step 3.

### Step 3: Confirm

Present the complete project data as a formatted summary table and ask the user to confirm or edit any field.

### Step 4: Auto-translate

Once confirmed, automatically translate all translatable fields (`name`, `highlight`, `description`, `achievements`) into the other two locales:
- If the user provided text in **English** → translate to `ru` and `zh`
- If the user provided text in **Russian** → translate to `en` and `zh`

Use your best translation ability. Maintain the tone and technical accuracy of the original. Technical terms (framework names, patterns, etc.) should stay in their original form or use the standard localized equivalent.

Present the generated translations to the user for a quick review. They can accept all, tweak individual fields, or skip a locale entirely.

### Step 5: Create files

1. Create the project directory: `public/content/projects/{slug}/`
2. Create `gallery/` subdirectory
3. Write `project.json` with all three locales populated in LocalizedString format
4. Tell the user where to drop their media files:
   - Avatar image → `public/content/projects/{slug}/` (name it so it sorts first, e.g. `avatar.png`)
   - Gallery images → `public/content/projects/{slug}/gallery/` (name them `01.png`, `02.png`, etc.)
   - Video → `public/content/projects/{slug}/` (e.g. `demo.mp4`)

### Step 6: Verify

Run `getProjects()` or `getProjectBySlug()` via a quick test script to verify the project loads correctly. Report the result.

## Important

- Do NOT commit automatically. Let the user decide when to commit.
- Do NOT create placeholder media files. Just create the directory structure and tell the user where to add their files.
- If the user provides a GitHub URL, offer to fetch the README or repo description for the description field.
- Validate dates are in YYYY-MM format before accepting.
- Validate type is one of the four allowed values.
- For translatable fields, `en` is always required. `ru` and `zh` are optional — missing translations fall back to English at runtime.
- When writing project.json, always use the `LocalizedString` format (e.g. `"name": { "en": "My Project", "ru": "Мой проект", "zh": "我的项目" }`).
- The user should NEVER have to manually write translations. You generate all translations automatically from whichever language they provide.
