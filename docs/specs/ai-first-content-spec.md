# AI-first content spec

Destination document of the wayfinder map [Wayfinder: AI-first content rewrite](https://github.com/rtmkvtn/personal-site/issues/67). English is the source of truth; ru and zh follow it. Terms per `GLOSSARY.md`.

## 1. Role line and metadata

| Where | Text |
| --- | --- |
| `home.role` (en) | AI-First Fullstack Engineer |
| `metadata.title` in `src/app/layout.tsx` | rtmkvtn \| AI-First Fullstack Engineer |

Rules: this is the only AI modifier anywhere in the identity. No "agentic", "AI-native", or tool names beside it. The ru and zh role lines follow the same meaning ("AI-First" stays Latin).

## 2. About (`about.*` in `src/shared/locales/en.json`)

| Key | Text |
| --- | --- |
| `label` | Background *(unchanged)* |
| `title` | ABOUT *(unchanged)* |
| `bio1` | A fullstack engineer building financial back-office systems, working AI-first since 2025. I specify and review; agents implement, test, and refactor. Every line is reviewed, and nothing ships that I can't explain. |
| `bio2` | The method changed what one person can carry. In 2025 I built the foundation of a currency exchange back office alone, taking its bookkeeping module from the first shareholder conversation to production in about two months. When two developers joined, I moved the team onto one shared workflow: repo-level agent rules, shared skills and agents, spec-driven tickets, a single review checklist for agent-written code. |
| `approachTitle` | Approach *(unchanged)* |
| `approachBody` | Systems thinking over feature stacking. Architecture, service contracts, and specs are mine; implementation is delegated and verified. The result is a codebase any member of the team can maintain, because the documentation and the tickets are written the same way every time. |

## 3. Project schema

Optional `aiFirst` block on `ProjectJson` (already implemented in `src/shared/config/projects.ts` and resolved per locale in `locale-resolver.ts`):

```ts
aiFirst?: {
  steps: { specify; implement; verify; review }   // LocalizedString each
  anchor: { value: LocalizedString; label: LocalizedString; mark?: string }
  note?: LocalizedString
}
```

The step sequence (Specify, Implement, Verify, Review) and owners (Me, Agents, Agents, Me) are fixed in the `HowItWasBuilt` widget. Projects without the block render nothing extra.

## 4. Currency Exchange (`public/content/projects/currency-exchange/project.json`)

### Stack additions

Append `Claude Code`, `Codex`, `AI Agents`.

### Achievements

- Edit bullet 1: **Built a full-stack currency exchange service from scratch and solo (React, NestJS), designed to handle 1,000+ requests per day, with integration of multiple payment APIs**
- Add bullet 5: **Moved two newly joined developers from ad-hoc AI tool use to one AI-first workflow: repo-level agent config, shared skills and agents, spec-driven tickets, a review rule for agent-written PRs, making the codebase maintainable by any member of the team**

### `aiFirst` block (already in the content file, en)

| Field | Text |
| --- | --- |
| specify | Architecture, specs, tickets, service contracts |
| implement | Claude Code & Codex, custom skills and agents |
| verify | Tests, CI, documentation |
| review | Every agent-written PR against one checklist |
| anchor | `2 mo` / Bookkeeping module, first shareholder conversation to production MVP / mark `BOOKKEEPING / 2025–26` |
| note | Started solo. When two developers joined, moved the team onto one AI-first workflow: repo-level agent config, shared skills and agents, spec-driven tickets, a review rule for agent-written PRs. |

## 5. M-INVEST (`public/content/projects/m-invest/project.json`)

### Stack additions

Append `Claude Code`, `Codex`, `AI Agents`.

### Achievements

Unchanged.

### `aiFirst` block (new, en)

| Field | Text |
| --- | --- |
| specify | Frontend architecture (FSD), specs, review and onboarding process for a team of three |
| implement | Claude Code and Codex as each became available; boilerplate first, then features |
| verify | Tests, GitLab CI for three environments |
| review | Mandatory code review on every PR, agent-written or not |
| anchor | `15 min` / Feature release time, down from several hours, after the CI/CD pipelines / mark `RELEASES / 2025` |
| note | The tooling matured during the project, so the agents' share grew from boilerplate to full features. The review process did not change. |

## 6. Hard Skills chart

- AI tooling entries (`Claude Code`, `Codex`, `AI Agents`) render as a hollow ring: fill `surface`, 1px stroke `on_surface_variant` at 70%, label `primary`. Hover fills them like any other bubble. Mark them with a constant set of entry names in the chart; no schema change.
- Raise the label character budget so 11-character names fit at the mid-tier radius (today "Claude Code" truncates to "CLAUDE CO.").
- Reference: `prototype/skills-chart-ai` branch, variant B.

## 7. "How it was built" block

Implemented in `src/widgets/how-it-was-built` from the Claude Design file "How It Was Built" (ladder with drafting marks; desktop 1440, tablet 834, phone 390). Mounted on the project detail page after achievements, only for projects carrying `aiFirst`.

## 8. Translation constraints (ru, zh)

- Keep the two-halves structure of "I specify and review; agents implement, test, and refactor".
- "AI-first" and tool names stay Latin.
- Chinese numerals apply to step indices automatically; anchor values are plain localized strings (zh: 两个月, 十五分钟).

## 9. Execution checklist

Done in the working tree (uncommitted at the time of writing):

- [x] `aiFirst` schema, resolver, tests
- [x] `HowItWasBuilt` widget, mono font, md breakpoint
- [x] Currency Exchange `aiFirst` block in en, ru, zh
- [x] `built.*` locale keys in en, ru, zh

To do:

- [ ] Role line and metadata title (en, then ru, zh)
- [ ] About copy (en, then ru, zh)
- [ ] Currency Exchange: stack additions, achievement edits (en, then ru, zh)
- [ ] M-INVEST: stack additions, `aiFirst` block (en, then ru, zh)
- [ ] Hard Skills chart ring treatment and label budget
- [ ] Update `GLOSSARY.md` if any term shifts during implementation

## Out of scope (decided)

- Contact copy stays as is; "AI enablement" style positioning reads as consulting vocabulary.
- No marker on the four pre-2025 projects; the absence of the block is the marker.
- ru and zh translations and shipping: execution after this spec.
- Any AI-feature claim; any rebrand to "AI Engineer".
