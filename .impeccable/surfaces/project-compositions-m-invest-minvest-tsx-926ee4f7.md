---
version: 1
slug: "project-compositions-m-invest-minvest-tsx-926ee4f7"
primary_target: "src/widgets/project-compositions/m-invest/MInvest.tsx"
related_targets: ["src/app/(public)/work/[slug]/page.tsx"]
---

# Surface brief: /work/m-invest

Scope: the project detail page for M-INVEST, the fifth per-project composition and the first 2025 project to drop the How It Was Built block. Visitor mode: Experience. Audience: a hiring manager a few seconds in, deciding whether six months that went from one developer to a team of three with agents folded in mid-build say the engineer can ship alone and then lead. Job: understand that the MVP was built alone in three months, that the team and the review process came next, and that the agents arrived into that process rather than before it. Proof: the approved copy in `docs/specs/m-invest-content-spec.md`, four achievements, two paragraphs, six dated events; no media, no link, no figures beyond three months, a team of three, three environments and the 15 minutes in words. Untouched: header, footer, the Monolith system, other project pages, approved copy.

## Direction contract

THESIS: Six months drawn to scale. Time runs down the page, one month one fixed height, and the axis itself is the team: one hairline for the three solo months, three parallel hairlines from the month two developers join, a dashed fourth from the month the agents become usable. The AI story is a line that joins an existing line. It refuses title, paragraph, bullets, refuses the block with an anchor figure, and refuses a stage-walk, a climb, or a ledger.

OWN-WORLD: The Monolith, unchanged: Obsidian ground; month labels in label caps in Ash at the left with a 1px Slate tick crossing the axis at each month start; the solo stretch of the axis as a 1px Slate hairline at 20%; from the turn the three staffed hairlines and the dashed agents line in Ash at 22%, the drafting-mark tone, 6px apart, dashes 3px on 4px off; staff labels in label caps in Ash set vertically along the lines ("One developer", "Three developers", "Agents"); event names in title typography in Soft White with their details in body in Soft White Variant at 28rem; the loud event's name at headline-fluid in Signal White at weight 100. No boxes, no hue, no icons.

STORY: The visitor reads "A closed peer-to-peer market for an internal currency", sees the pipeline figure, then follows one line down three empty months with two events on it, reaches the turn where the line becomes three and "Two join" is loud, sees the dashed agents line start just beneath it, passes the pipelines and the hand-off, and ends on the paragraph about leading for the first time with the agents folded into the process. They believe it because the lengths are honest: three months alone and three months as a team drawn to the same scale, with April stretched by what happened in it and nothing shortened to compensate.

FIRST VIEWPORT: Title "M-INVEST" at display-compact top-left on the 4rem gutter; beneath it the deck "A closed peer-to-peer market for an internal currency." at title size left with the rest of the product paragraph right-anchored at 24rem; under the deck the pipeline figure at 32rem: pull request, review, pipeline as three hairline boxes in a row, branching to prod, stage, demo stacked at the right, mono caption "GitLab CI · Docker · three environments"; then the axis begins: "JAN" with its tick, the single hairline, "One developer" running down beside it, and the first event "Start" at title size with its detail.

FORM: Six Months, the vertical scaled axis with staffed lines. No concept roll was run and there is no seed key: the user pinned the story in the interview of 2026-10-13 (answer to the story question, option A "Six months": "ok") and locked this structure in the structured confirmation, choosing "Vertical, to scale, staffed lines (Recommended)" over "Horizontal band". Geometry: `--month` is 12rem at every width, taller than any single event with its clearance; events are positioned by measurement at their month's tick, and an event that would overlap the one above is pushed down 2.75rem past it; each month's tick sits one month height below the previous tick or 2.75rem below the last event above it, whichever is lower, so a crowded month stretches and no later month shrinks, and no event is ever moved to a different month; the track is at least six months tall. The "Agents" staff label starts at the agents event or 2rem below the end of "Three developers", whichever is lower. Signature interaction: one active event drives the page, the event nearest a line at 40% of the viewport or, on mouse pointers only, the hovered one; its name is Signal White and its text at full opacity, other events at 30%, the loud event never below 60%. Events reveal with the 300ms rise and 60ms stagger; reduced motion drops the rise and keeps the fade. Phone: indent 2.75rem, the same lines 6px apart, figure hidden, the loud name capped at headline size.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved
None.
