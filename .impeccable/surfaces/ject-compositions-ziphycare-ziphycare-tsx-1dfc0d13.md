---
version: 1
slug: "ject-compositions-ziphycare-ziphycare-tsx-1dfc0d13"
primary_target: "src/widgets/project-compositions/ziphycare/Ziphycare.tsx"
related_targets: ["src/app/(public)/work/[slug]/page.tsx"]
---

# Surface brief: /work/ziphycare

Scope: the project detail page for ZiphyCare, the fourth per-project composition. Visitor mode: Experience. Audience: a hiring manager a few seconds in, deciding whether two and a half years on a live US telehealth product say the engineer can carry a large frontend and its data. Job: understand that the frontend was the layer between raw FHIR and the physician's screen, and that the same person led the codebase's migration and owned its releases. Proof: the approved copy in `docs/specs/ziphycare-content-spec.md`, four achievements, two paragraphs, six paired rows with a direction, the public link; no media, no figures beyond the dates. Untouched: header, footer, the Monolith system, other project pages, approved copy.

## Direction contract

THESIS: The frontend as the interpreter. Six rows pair what came over the wire with what the physician or patient saw, and the built text sits on the seam between them, because the seam is where the frontend lived. One row runs the other way, screen to wire, with its sides swapped, because the frontend also wrote FHIR. It refuses title, paragraph, bullets, and refuses a fourth walk down a guide after the Order's Journey and the Hand-off.

OWN-WORLD: The Monolith, unchanged: Obsidian ground; from 1024px two equal columns 5.5rem apart with a 1px Slate seam at 20% running down the middle of the list and on to the arc paragraph; row labels in label caps in Ash reading "01 · WIRE → SCREEN"; wire text in body in Soft White Variant; screen text in title typography in Soft White; built text in body in Soft White Variant (Soft White when active) starting 1.5rem right of the seam with an 11px crosshair on the seam at its first line; below 1024px the seam turns horizontal, a 20% Slate hairline above the built text with its tick, and the row reads wire, built, screen. No boxes, no hue, no icons; the arrow in the label and the ↗ on the link are typographic characters.

STORY: The visitor reads "Two apps for at-home medical exams", sees the exam room figure with its bottom bar of four live previews, then reads the ledger: raw Observations become a timeline, resources become a chart, the physician's edits go back as complete FHIR objects on the reversed row, four appointments in one slot get the page's loud numeral, the patient books, the visit becomes a PDF. The seam carries them down to the engineer's own paragraph about making the codebase safe to change. They believe it because each row names a real mechanism and the thing built for it.

FIRST VIEWPORT: Title "ZIPHYCARE" at display-compact top-left on the 4rem gutter; beneath it the deck "Two apps for at-home medical exams." at title size left and the rest of the product paragraph on the right, 24rem wide, starting on the screen column so the first viewport already carries the ledger's axis; under the deck the exam room figure at 36rem: one large frame with a patient video placeholder and a notes column, and a bottom bar of four small frames with the second one filled, label "Exam room", mono caption; then the first row, "01 · WIRE → SCREEN", Observations on the left in body, the history timeline on the right at title size, the seam between them, the crosshair and "Adapters and transformers on read." beneath.

FORM: The Interpreter, the paired-ledger structure, chosen from two presented structures in a compact confirmation after the story was pinned in the interview of 2026-10-12; no concept roll, so there is no seed key. Signature interaction: one active row drives the page, the row nearest a line at 40% of the viewport or the hovered row; the active row's text sits at full opacity with its screen text in Signal White, its crosshair in Signal White and its seam segment at Slate 60%; other rows' wire and screen text at 30% and their label and built lines at 40%; the loud row never drops below 60%. The loud row, four appointments in one slot, carries a display-compact numeral "4" (四 in zh) in Signal White at weight 100 above its wire text and keeps its screen text in Signal White at rest, with 2.75rem of extra room above and below. Rows reveal with the 300ms rise and 60ms stagger; reduced motion drops the rise and keeps the fade. Phone: one column per row, seam horizontal, figure hidden, numeral capped at headline size.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
None.
