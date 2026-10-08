# Claude Design brief: "How it was built" block on a project detail page

## What this is

A new section on the project detail page of my personal portfolio site (Next.js, dark, editorial). It shows, for one project, how the work was divided between me and AI coding agents. A rough code prototype already settled the structure (see the attached screenshot). Your job is the visual composition, not the content or the structure.

## Design system: "The Monolith"

Architectural minimalism. Think a monograph page carved from one block of obsidian: heavy, silent, intentional, large voids, asymmetric balance.

Tokens:
- Background `#131313` (surface). Tonal planes: `surface_container_low #1a1a1a`, `surface_container #1f1f1f`, `surface_container_high #2a2a2a`, `surface_bright #393939`.
- Text: `primary #ffffff` for headline-priority text only; `on_surface #e2e2e2` for body; `on_surface_variant #c4c7c7`; `outline #8e9192` for meta; `outline_variant #474747`.
- Only non-grayscale allowed anywhere: `error #ffb4ab`, and only for errors. This block must be pure grayscale.

Typography, Inter only:
- Display large: 3.5rem, weight 100 or 200, letter-spacing -0.02em.
- Headline for step names: 1.75rem, weight 200, letter-spacing -0.02em.
- Body medium: 0.875rem, weight 400, letter-spacing +0.05em, line-height 1.6.
- Label small: 0.6875rem, weight 600, ALL CAPS, letter-spacing +0.1em. Used for every label and meta.
- Never pair adjacent sizes. Skip the middle: label beside headline, headline beside body, never body beside a slightly larger body.

Hard rules:
- No borders for sectioning. Boundaries come from negative space or a tonal plane. If a line is unavoidable, a 1px "ghost hairline" of `outline_variant` at 20% opacity.
- No drop shadows. Elevation is a lighter tonal plane.
- 0px corner radius everywhere.
- No icons. Text labels only.
- No center alignment for text. Left-align, or extreme right-align for metadata.
- Spacing scale in rem: 0.25, 0.5, 1, 1.5, 2.75, 5.5, 7, 8.5. Separate ideas with 2.75rem or more; separate sections with 7rem or 8.5rem.
- Asymmetry over grids: anchor elements to unconventional offsets, leave large voids.

## Page context (above and below the block)

The block sits on `/work/<project>` after the achievements list and before the media gallery. Above it, in order: project title in display large; a body-medium description paragraph; a bulleted achievements list in body medium. Content column is left-anchored with 4rem side padding on desktop, max width 64rem. Fixed header top with wordmark left and nav right; fixed footer bottom. Page scrolls.

## Content and structure (fixed, do not change)

```
label:   HOW IT WAS BUILT

steps (ordered, each has an owner, a name, one line of detail):
  01  ME       Specify    Architecture, specs, tickets, service contracts
  02  AGENTS   Implement  Claude Code & Codex, custom skills and agents
  03  AGENTS   Verify     Tests, CI, documentation
  04  ME       Review     Every agent-written PR against one checklist

anchor figure:   2 mo
anchor label:    BOOKKEEPING MODULE, FIRST SHAREHOLDER CONVERSATION TO PRODUCTION MVP

note (optional per project, body medium, on_surface_variant):
  Started solo. When two developers joined, moved the team onto one
  AI-first workflow: repo-level agent config, shared skills and agents,
  spec-driven tickets, a review rule for agent-written PRs.
```

Hierarchy to preserve: label, then the four steps as the dominant element, then the anchor figure as the single loud moment, then the note as a quiet coda. The ME / AGENTS alternation is the point of the block and must be legible at a glance.

## What to redesign

1. The rhythm of the four steps. The prototype uses four equal columns with a hairline on top of each. Explore compositions that aren't an equal grid: staggered baselines, a two-row offset where ME steps sit on one line and AGENTS steps on another, uneven column widths, a vertical ladder with large voids.
2. How ME versus AGENTS is encoded without color and without icons: position, weight, size, case, a tonal plane behind one owner, indentation.
3. The weight and placement of the "2 mo" anchor. It is the only display-large element in the block. Try it as the opening beat before the steps, as a right-anchored counterweight, and as a closing beat before the note.
4. Where the note lands and how quiet it should be.
5. The phone layout at 390px: the four steps must become a vertical sequence while keeping the ME / AGENTS alternation obvious.

## Deliverables

- Desktop frame at 1440 wide, showing the block in context with the achievements list ending above it and the start of the gallery below.
- Phone frame at 390 wide, same context.
- Two or three distinct directions for the desktop composition, each a separate frame, then your recommended one.
- Spacing annotated in rem, type sizes from the scale above, colors by token name.
- No interactive states; the block is static.

## Data it maps to (for your awareness, not for display)

```ts
aiFirst?: {
  tools: string[];
  agentsOwned: string[];
  authorKept: string[];
  anchor: { value: string; label: string };
  note?: string;
}
```

The step sequence (Specify, Implement, Verify, Review) is fixed in the component; only tools, lists, the anchor and the note vary per project. Only two projects will carry this block; the rest of the site's project pages omit it entirely, so it must read as a deliberate section, not a missing one elsewhere.
