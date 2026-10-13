---
name: rtmkvtn
description: A trilingual engineer's portfolio carved from a single dark block, white type and ghost hairlines on obsidian.
colors:
  signal-white: "#ffffff"
  on-signal: "#1a1c1c"
  obsidian: "#131313"
  true-black: "#000000"
  basalt-low: "#1a1a1a"
  basalt: "#1f1f1f"
  basalt-high: "#2a2a2a"
  basalt-highest: "#353535"
  basalt-bright: "#393939"
  soft-white: "#e2e2e2"
  soft-white-variant: "#c4c7c7"
  ash: "#8e9192"
  slate: "#474747"
  error: "#ffb4ab"
typography:
  display:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "clamp(3.5rem, 8vw, 8rem)"
    fontWeight: 100
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  display-compact:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "clamp(3.5rem, 6vw, 6rem)"
    fontWeight: 100
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  display-compact-phone:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "clamp(2.5rem, 10vw, 3.5rem)"
    fontWeight: 100
    lineHeight: 0.9
    letterSpacing: "-0.02em"
  display-final-phone:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "clamp(3rem, 12vw, 3.5rem)"
    fontWeight: 100
    lineHeight: 0.95
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "3.5rem"
    fontWeight: 200
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline-fluid:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "clamp(2.25rem, 7vw, 3.5rem)"
    fontWeight: 200
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 200
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.05em"
  label:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.1em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1
rounded:
  none: "0px"
  glass: "0.5rem"
  dot: "9999px"
spacing:
  hair: "1px"
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "2.75rem"
  gutter: "4rem"
  indent: "5.5rem"
  void: "7rem"
  offset: "8.5rem"
components:
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-white}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1.5rem"
  button-ghost-hover:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.on-signal}"
  link-cta:
    backgroundColor: "transparent"
    textColor: "{colors.signal-white}"
    typography: "{typography.label}"
    padding: "0 0 0.25rem 0"
  nav-link:
    textColor: "{colors.soft-white}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.signal-white}"
  nav-link-hover:
    textColor: "{colors.soft-white}"
  field-label:
    textColor: "{colors.ash}"
    typography: "{typography.label}"
  field-value:
    textColor: "{colors.soft-white}"
    typography: "{typography.body}"
  modal-smoked:
    backgroundColor: "{colors.basalt-highest}"
    textColor: "{colors.soft-white}"
    rounded: "{rounded.none}"
    padding: "2rem"
  chip-date:
    textColor: "{colors.signal-white}"
    typography: "{typography.label}"
    rounded: "{rounded.glass}"
    padding: "0.25rem 0.5rem"
  bubble:
    backgroundColor: "{colors.basalt}"
    textColor: "{colors.soft-white}"
    typography: "{typography.label}"
    rounded: "{rounded.dot}"
  bubble-ai:
    backgroundColor: "{colors.obsidian}"
    textColor: "{colors.signal-white}"
    typography: "{typography.label}"
    rounded: "{rounded.dot}"
  bubble-hover:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.on-signal}"
---

# Design System: rtmkvtn

## Overview

**Creative North Star: "The Monolith"**

The site is one block of obsidian with content carved out of it. Nothing sits on the page; everything is cut into it. White type is the exposed face of the cut, hairlines are the scribe marks left by the tool, and the enormous section numerals behind each page are the grain of the stone itself, visible only at three to five percent. The result is heavy, silent, and intentional: a monograph page rather than an app screen, where the void does as much work as the words.

Density is deliberately low. Each surface holds one composition: a label, a display-scale title, a short paragraph, and at most one interactive element, anchored to an asymmetric offset rather than centered. Pages are built to be taken in without scrolling where the content allows; when it cannot, the scroll is itself the artifact (the Work page's continuous timeline). Motion is restrained to opacity, a fill, or a few pixels of travel at 200 to 300 milliseconds, with one deliberate exception: the glitch on a project name, the only moment the system raises its voice.

The system is monochrome by doctrine. The only chromatic token is the error tone, and nothing on the site uses it yet. Anything that would read as a "pop" of color is rejected; emphasis is carried by lightness and scale alone.

**Key Characteristics:**
- Obsidian surface, white type, five grayscale planes, zero chroma
- Extreme type contrast: thin display at up to 8rem beside 0.6875rem tracked caps, with the middle sizes skipped
- Boundaries drawn with void and tone, never with lines; the one permitted line is a 20% ghost hairline
- Asymmetric anchoring: content offset 7 to 8.5rem from the left with a hairline marking the margin
- Section numerals as watermarks, the deepest plane of every page
- Quiet until touched: hover is a fill, a fade, or a border waking up

## Colors

A single-hue system in which only lightness moves; the palette is a stone's cross-section from true black to white.

### Primary
- **Signal White** (#ffffff): the one thing that lights up. Display titles, active navigation, the hover fill on ghost buttons and bubbles, the wordmark. Rare by rule, so it reads as a signal.
- **On Signal** (#1a1c1c): text on a Signal White fill, the only place a near-black sits on a light ground.

### Neutral
- **Obsidian** (#131313): the page surface and the normative canvas.
- **True Black** (#000000): the lowest container, used where a plane must sit *below* the page: image overlays fading to nothing, the deepest tonal step.
- **Basalt Low** (#1a1a1a) and **Basalt** (#1f1f1f): the first lift. Bubble fills, the tonal plane behind a secondary context, the stripe in placeholder media.
- **Basalt High** (#2a2a2a), **Basalt Highest** (#353535), **Basalt Bright** (#393939): higher planes. Highest is the smoked-glass modal body; Bright is reserved for interactive surfaces that need to read as raised.
- **Soft White** (#e2e2e2): body copy and the resting color of navigation links. Deliberately not pure white so paragraphs sit back from titles.
- **Soft White Variant** (#c4c7c7): secondary body, the Agents side of a ladder, section labels on dark planes.
- **Ash** (#8e9192): meta text, field labels, index numbers, drafting coordinates, the crosshair.
- **Slate** (#474747): the hairline base. Almost never shown at full strength; it appears at 20% as a ghost line, and at full strength only for the timeline tick on the Work page and the month ticks of Six Months.

### Status
- **Error** (#ffb4ab): the only chromatic token. Reserved for a true error state and currently unused; when it appears it must be the only non-grayscale element on the screen.

### Named Rules
**The Zero-Chroma Rule.** Nothing on the site carries hue except an error. Emphasis is lightness and scale; a colored accent is a failed design, not a choice.

**The Forty-Percent Rule.** De-emphasis is done by mixing a token to 40% (labels, footer, the "Hi!" lead-in), 30% (dimmed scroller names, hints), or 60% (hover on links and nav). The alpha steps are the secondary palette; do not invent new grays.

**The Ghost Hairline Rule.** A line is Slate at 20% opacity, 1px, and marks a margin or a hand-off. It never boxes content. The drafting marks on the "How it was built" block (Ash at 14 to 22%) are the one place lines are decoration rather than margin.

## Typography

**Display Font:** Inter (with Noto Sans SC for CJK, then sans-serif)
**Body Font:** Inter (same stack)
**Label/Mono Font:** JetBrains Mono, for drafting coordinates only

**Character:** One neutral grotesque pushed to its extremes. The identity lives in the tension between a 100-weight display at 8rem and a 600-weight label at 0.6875rem with 0.1em tracking; everything between those two poles is avoided. Chinese text inherits the same scale through Noto Sans SC, and the zh locale renders numerals as Chinese characters so digits never break the register.

### Hierarchy
- **Display** (100, clamp(3.5rem, 8vw, 8rem), 0.9): page titles in caps (HARD SKILLS, ABOUT, CONTACT), the name on Home. One per page.
- **Display Compact** (100, clamp(3.5rem, 6vw, 6rem), 0.9): the display step for two-line uppercase titles that would overrun at 8rem (CRYPTO MARKETPLACE) and for the final step of a Growth Curve. Caps at 6rem on purpose. On phones the title floors at clamp(2.5rem, 10vw, 3.5rem) and the final step at clamp(3rem, 12vw, 3.5rem) with line-height 0.95, so the climb tops out at headline size below 640px. The same step, at line-height 0.9, is the loud numeral on row four of an Interpreter.
- **Headline** (200, 3.5rem, 1.1): project names in the Work scroller and on project pages; the skill name in the detail panel at clamp(2.5rem, 5vw, 3.5rem); the fourth Growth Curve step and the event verb of an Order's Journey, a Hand-off, or Six Months at clamp(2.25rem, 7vw, 3.5rem). Weight 100 on the skill panel, the mobile modal, and the event verb (line-height 1 there), 200 elsewhere.
- **Title** (200, 1.75rem, 1.15): step names in the "How it was built" ladder, stat values at clamp(1.5rem, 3vw, 2rem). Agents steps drop to weight 100.
- **Body** (400, 0.875rem, 1.6, +0.05em): all paragraphs, achievements, field values, link text. Max width 28 to 32rem on hero surfaces.
- **Label** (600, 0.6875rem, +0.1em, uppercase): navigation, footer, section labels, field labels, index numbers, owner tags, the CTA, every button. The most used style on the site.
- **Mono** (400, 10px): JetBrains Mono for drafting coordinates and the hand-off mark; Slate colored, decoration only.
- **Watermark** (200, clamp(15rem, 30vw, 25rem), 1): the section numeral behind each hero at 3 to 5% Signal White; the Work page's project index at weight 900 and 4%.

### Named Rules
**The Missing-Middle Rule.** Never pair adjacent sizes. Display sits beside body or label; headline sits beside body; nothing sits beside a slightly larger version of itself.

**The Caps-Carry-Meta Rule.** If it is a label, a number, a date, or a navigation item, it is uppercase, 600, and tracked +0.1em. If it is prose, it is sentence case, 400, and tracked +0.05em. There is no third style.

## Layout

The page is a fixed frame: header pinned top, footer pinned bottom, both at z-index 50 with 1rem padding on phones and 1.5rem by 2rem from 640px up. Content fills the space between as a flex column that aims to compose within one viewport.

Hero surfaces (Home, About, Contact, the Skills summary) share one grammar: a vertical ghost hairline at 7rem from the left edge, content offset to 8.5rem with 4rem right padding, and the watermark numeral anchored to the right at mid-height. Below 640px the hairline disappears and padding collapses to 1.5rem.

Two-panel surfaces split at 50% (Skills: detail left, chart right, with the hairline on the seam) or 60/40 (Work: scroller left, detail panel right from 1024px). On phones the panel is replaced by a smoked-glass modal.

Project detail pages are a reading column: 3rem by 4rem padding, 64rem max width, left-aligned. The "How it was built" block inside it uses a ladder indent of 8.5rem at 1024px and up, 5.5rem from 640px, and 2.75rem on phones.

Spacing is a fixed scale: 0.25, 0.5, 1, 1.5, 2, 2.75rem for intra-composition rhythm; 4rem gutters; 5.5, 7, and 8.5rem to separate ideas and sections. Lists separate items with 0.5rem of space and a disc, never a divider. Breakpoints are 640px (sm) and 1024px (md/lg).

## Elevation & Depth

No shadows anywhere. Depth is tonal and atmospheric: a lifted element sits on a lighter plane (Basalt over Obsidian, Basalt Highest for a modal), an overlay blurs what lies beneath it rather than casting onto it, and the watermark numeral behind every page is the deepest plane, a shape in the stone that content floats in front of. A film-grain SVG overlay at 3.5% opacity sits over everything, which keeps large dark areas from reading as flat pixels.

### Depth Vocabulary
- **Tonal lift** (`background: var(--color-surface-container)` and up): a plane one step lighter than its parent. Bubbles, media placeholders, secondary contexts.
- **Smoked glass** (`backdrop-filter: blur(20px)` over surface at 60%; `blur(10px)` over surface at 70% for the detail panel and date chip): overlays that keep the page visible through them. The modal body itself is opaque Basalt Highest.
- **Watermark** (3 to 5% Signal White, display scale): the plane behind the page. Pointer-events off, never selectable.
- **Image fade** (`radial-gradient` from 5% gray to True Black over a 30% opacity image): project art recedes into the surface instead of sitting on it.

### Named Rules
**The No-Shadow Rule.** A `box-shadow` is a defect. Lift with tone or blur.

**The Deepest-Plane Rule.** Every hero carries its section numeral behind the content. It is depth, not decoration, and it is never brighter than 5%.

## Shapes

Every corner is 0px. Buttons, modals, images, planes, and cards are strict rectangles; a 1px gap between gallery images is the only "frame". Two exceptions exist and are confined: the 0.375rem active-state dot under navigation and locale items is a circle, and the smoked-glass date chip and hover detail panel carry a 0.5rem radius as part of their glass treatment. Nothing else rounds.

Lines are 1px, never thicker. Hairlines are vertical margins or horizontal hand-offs that run off the page; they do not enclose. The crosshair and timeline tick are the only short line glyphs. No icons: the single SVG icon (the timeline start marker) is a drafting symbol, not a UI glyph, and the CTA arrow is a typographic character.

## Components

Quiet until touched. At rest a component is a label or a ghost outline on the void; on hover the only move is a fill, a fade to 60%, or a border waking up, in 300ms ease-out.

### Buttons
- **Shape:** strict rectangle (0px), 0.75rem by 1.5rem padding.
- **Ghost (the only button):** no fill, 1px Signal White border, label typography in Signal White. Used for DETAILS on the Work panel and CLOSE on the mobile modal.
- **Hover:** fills Signal White, text flips to On Signal, 300ms ease-out on both.
- **No primary, secondary, or filled variants exist.** A second button style would be a new decision.

### Links
- **CTA link** (View Work): label typography, Signal White, an arrow character after the text, a 1px bottom border at 40% Signal White that wakes to 100% on hover while the arrow travels 0.25rem right.
- **Text links** (email, project names in panels): body typography in Soft White, no underline, color rises to Signal White on hover.
- **Footer links:** label typography at 40% Soft White, fading to 60% opacity on hover.

### Navigation
- **Header:** fixed top; wordmark "rtmkvtn" left in label typography; links right in label typography, Soft White at rest, Signal White when active with a 0.375rem Signal White dot 0.75rem below the text. Hover fades to 60%. The locale switcher (EN RU ZH) uses the identical treatment and sits 1.5 to 2.5rem right of the links.
- **Footer:** fixed bottom; copyright left and LinkedIn right, both label typography at 40%.
- **Mobile:** same bar with tighter 1rem padding; links keep their size. No hamburger.

### Fields (label + value)
- **Label:** label typography in Ash (or Soft White at 40% on hero surfaces), 0.5rem above the value.
- **Value:** body typography in Soft White. Stat values use title typography in Signal White.
- **Rhythm:** fields stack with 2.75rem between them; revealed with a staggered 200ms fade and 0.5rem rise.

### Inputs (reserved, none built yet)
- **Style:** no bounding box; a single 1px Slate line at the bottom, label typography above in Ash.
- **Focus:** the line thickens to 2px and turns Signal White; the label turns Signal White.
- **Error:** text in the error token; no icon, the color shift is the signal.

### Smoked Glass Modal (phone only)
- **Overlay:** surface at 60% with a 20px blur, 200ms fade in.
- **Body:** Basalt Highest, 2rem padding, 0px radius, max width 24rem. Title in headline typography at weight 100, uppercase; fields as above; a ghost CLOSE button.

### Bubble (Hard Skills chart)
- **Default:** Basalt circle with a 20% Slate stroke; label typography in Soft White centered. Radius 28 to 72px by weight (22 to 56 on phones).
- **AI tooling:** Obsidian fill with a 70% Soft White Variant stroke, label in Signal White. A hollow ring among filled stones.
- **Hover:** fills Signal White, label On Signal, radius grows 25%; the simulation re-settles around it.

### Project Scroller (Work)
- **Row:** index in label typography (Slate; Signal White when active; 40% when dimmed), project name in headline typography (Soft White; Signal White active; 30% dimmed), a date chip in label typography at 60% Signal White on smoked glass. Rows advance continuously; hover pauses and raises the row.
- **Timeline:** a 1px Slate tick and a year label at the row's left; a rotated start marker at the end of the history.
- **Glitch:** the hovered name splits into red (#ff0040) and blue (#0040ff) screen-blended halves for a few frames. The one chromatic moment on the site, and it is transient.

### How It Was Built (signature block)
Ships on Currency Exchange only. M-INVEST tells its AI story inside its own composition (the dashed Agents line of Six Months), and the block is being retired as a direction; a new AI-first project should carry its story in its composition rather than inherit this block.
- **Ladder:** four rows, Me rows flush left in Signal White at weight 200, Agents rows indented to a vertical guide in Soft White Variant at weight 100. Each row: index and owner in label typography, step name in title typography, detail in body.
- **Drafting marks:** Ash guides at 22% (vertical) and 14% (horizontal and right edge), a 11px crosshair where the hand-off line crosses the guide, mono coordinates in Slate, a rotated project mark on desktop.
- **Anchor:** display-scale figure in Signal White at weight 100 with a label-typography caption in Ash, right-aligned.
- **Note:** body typography in Soft White Variant, indented to the guide, max width 28rem.

### Per-project compositions
A project page may own its composition. A registry keyed by slug (`src/widgets/project-compositions`) hands the resolved project to a bespoke component; slugs without an entry fall back to the generic reading column. Each composition stays inside the Monolith and reuses the tokens above; only the arrangement is the project's own. All five compositions reveal through one shared scroll-reveal mechanism (`src/widgets/project-compositions/lib`): an item is marked in once it crosses the viewport less a 10% bottom margin, each item once, and under reduced motion every item is marked in immediately. The first is the **Growth Curve** (Crypto Marketplace): five steps whose type scale encodes the arc.
- **Hero figure (Crypto Marketplace):** the held-balance slip drawn at hairline in Ash above the title, 40rem max: a placeholder trade address in mono, a three-box confirmations tally, a balance bar split into held and released at 25% ink; captions are translation keys; hidden below 640px where its text would not read.
- **Ascent:** step names climb label caps (0.6875rem, 600) to body (0.875rem, 400) to title (1.75rem, 200) to headline-fluid to display-compact; indices in label caps in Ash; details in body in Soft White Variant, max width 32rem. Vertical gaps grow with the scale: 2.75, 4, 5.5, 7rem.
- **Final step:** Signal White at weight 100, a 20% Slate ghost hairline at its baseline running from the index column to the right edge, and the arc paragraph beside it (7/4 columns from 1024px; stacked below on phones).
- **Head:** display-compact title top-left with the lede right-anchored at 24rem; 7rem top padding, 72rem max width, 1.5rem side padding on phones and 4rem from 640px.
- **Motion:** steps reveal on scroll with the 300ms ease-out rise (opacity 0 to 1, 0.5rem travel) staggered 60ms per step; hovering a step dims its siblings to 30% opacity, only on hover-capable pointers. Under reduced motion every step shows at rest with the rise dropped and the 300ms opacity fade kept.

The second is the **Order's Journey** (Wizmart): six stages of one order walking down a guide, each naming the product fact and what was built for it, with one stage as the event where the page gets louder.
- **Map:** one schematic drawn in 1px Ash strokes the section's width, above the stages: seller and manufacturer at the ends, the stages as nodes on a line inside a 20% Slate platform outline, external systems on short dashed drops. From 1024px it pins 4rem below the top of the viewport, a cover on the page ground extending 4rem above it so nothing scrolls through behind the header, with a 2.75rem fade beneath; one active index drives the lit node (Signal White) and the bright stage: the stage nearest to a line at 40% of the viewport, or whichever stage or node is hovered; the other stages sit at 30%. Clicking a stage or a node scrolls that stage to the line. Labels in label caps at 9 viewBox units.
- **Guide:** a 1px 20% Slate ghost hairline at the indent (5.5rem from 640px, 2.75rem on phones) running from the first stage down past the last to a horizontal hand-off hairline. From 1024px that hand-off line runs from the guide to the arc paragraph's first line (the paragraph is 28rem wide, right-aligned, 2.75rem clear of the line); below 1024px it is not drawn and the arc paragraph indents to the guide instead.
- **Stage:** index in label caps in Ash; verb in title typography (1.75rem, 200) in Soft White; the fact in body in Soft White and the build in body in Soft White Variant, each at most 28rem wide, side by side from 1024px (2.75rem column gap) and stacked fact then build on phones (1rem gap). Stages sit 5.5rem apart.
- **Event stage:** the verb at headline-fluid size (clamp(2.25rem, 7vw, 3.5rem)) in Signal White at weight 100 and line-height 1; an 11px by 1px Ash tick crossing the guide at the verb's x-height (0.5em); the build column widens to three fifths of the row (36rem max) and brightens to Soft White. The stage takes 2.75rem of extra room above and below.
- **Head and meta:** title top-left at display-compact; beneath it the product paragraph's first sentence as a deck at title size (1.75rem, 200, Soft White, 36rem max) with the rest of the paragraph right-anchored at 24rem in Soft White Variant; under the deck, the label figure: the marketplace's print label drawn at hairline in Ash (three ruled fields, a barcode and a QR block in solid ink, mono captions), 20rem wide on phones and 24rem from 1024px; the map band 2.75rem below, 4rem from 640px; date and stack in label caps Ash indented to the guide.
- **Motion:** the 300ms ease-out rise staggered 60ms per stage; stages rest at 30% opacity and the active one at full, so the dim follows the scroll as well as the hover. Under reduced motion the rise is dropped and the 300ms opacity fade kept.

The third is the **Hand-off** (Ed-Tech Platform): six stages of one lesson walking down the page and across it, grouped into three runs by actor (author, admin, student); each stage names the product fact and what was built for it, and each change of actor is drawn as a hand-off from one guide to the next.
- **Guides:** three vertical 1px 20% Slate ghost hairlines, one per actor, at the indent plus the run's number of steps: indent 2.75rem on phones and 5.5rem from 640px; step 1.5rem on phones, 2.75rem from 640px, 5.5rem from 1024px. The content column sits 1rem right of a guide (2.75rem from 1024px). A run's first guide begins at its verb's x-height (1rem for a title verb, half the headline-fluid size for the event verb); at each actor change the previous guide's tail drops to that height and a horizontal hairline one step wide carries across to the new guide. From 1024px the student guide runs 8.5rem (plus 0.6rem) past the last stage to a horizontal hand-off hairline that meets the arc paragraph's first line (28rem wide, right-aligned, 2.75rem clear of the line); below 1024px that line is not drawn and the arc paragraph indents to the author content column instead.
- **Stage:** index in label caps in Ash, right-aligned 1rem left of the guide; at a run's first stage only, the actor name in label caps in Ash set vertically (writing-mode vertical-rl, rotated 180 degrees) reading upward along the guide from the fact row down; verb in title typography (1.75rem, 200) in Soft White; fact in body in Soft White and build in body in Soft White Variant, stacked 0.75rem apart, each at most 28rem wide. Stages sit 5.5rem apart.
- **Event stage:** Published, index 3, the single admin stage, sits between the two crossings: the verb at headline-fluid size (clamp(2.25rem, 7vw, 3.5rem)) in Signal White at weight 100 and line-height 1; fact and build widen to 32rem and the build brightens to Soft White. The stage takes 2.75rem of extra room above and below.
- **Lit role:** one lit actor drives the page: the actor of the stage nearest a line at 40% of the viewport, or the hovered stage's actor (hover wins), on every pointer, touch through scroll. The lit role's index, actor, verb, fact and build sit at full opacity and every other role's at 30%; the dim is on the content, never on the rails. The lit role's guide and its crossings rise to Slate 60%, the tail and crossing into the next run included while the handing-off role is lit, and the final hand-off line when the student is lit. All of it at 300ms ease-out.
- **Head and meta:** title top-left at display-compact; beneath it the description's first sentence as a deck at title size (1.75rem, 200, Soft White, 36rem max) with the rest of the paragraph right-anchored at 24rem in Soft White Variant from 1024px (6/4 columns, 5.5rem gap); under the deck, the lesson figure: the same lesson drawn twice at hairline in Ash, dashed outline when submitted and solid when published, each with a label, a title rule, a video box with drafting diagonals and three text rules at 40% Slate; a hand-off hairline with an 11-unit tick and the "Admin review" label between them; mono captions in Ash beneath ("not visible to students" / "visible to students"); 36rem max, 2.75rem below the deck (4rem from 1024px), hidden below 640px; labels and captions are translation keys. Stages begin 5.5rem below the head, 7rem from 640px. Date and stack in label caps Ash indented to the author content column, 5.5rem below the arc.
- **Motion:** the 300ms ease-out rise (opacity 0 to 1, 0.5rem travel) staggered 60ms per stage. Under reduced motion the rise is dropped and the 300ms opacity fade kept.

The fourth is the **Interpreter** (ZiphyCare): six rows of one product, each pairing what came over the wire with what the physician or patient saw on screen, and naming what was built between them; a seam down the middle of the page is the layer the work lived in.
- **Seam:** from 1024px every row is two equal columns with a 5.5rem gap, and a 1px 20% Slate ghost hairline runs down the centre of that gap: it begins at the top of the first row, bridges the 5.5rem between rows above every later row (8.25rem on either side of the loud row), and after the last row runs 8.5rem (plus 0.6rem) further down to the arc paragraph's hand-off. The active row's segment rises to Slate 60%, at 300ms ease-out. Below 1024px the seam is not drawn.
- **Row:** label in label caps in Ash: the padded index (zh numerals via the helper), then "· WIRE → SCREEN" 0.5rem after it; wire text in body in Soft White Variant and screen text as an h2 in title typography (1.75rem, 200, Soft White, text-wrap balance), each at most 28rem wide; the build in body in Soft White Variant, 28rem max, on its own line beneath both columns, starting 1.5rem right of the seam with an 11px Ash crosshair centred on the seam at its first line (0.6rem down). Rows sit 5.5rem apart. Direction in: wire left, screen right. Direction out (row 3, the physician's edits): the columns swap and the label reads "SCREEN → WIRE".
- **Below 1024px:** one column per row in the order wire, build, screen (out: screen, build, wire), 1rem apart; the build carries the seam turned horizontal, a 1px 20% Slate hairline above it with an 11px vertical Ash tick crossing it 5px from the left, 1rem of padding above and 1.5rem to the left.
- **Active row:** the row nearest a line at 40% of the viewport (scroll and resize, rAF-throttled) or the hovered row (hover wins); the list carries the index as `data-active`. The active row's screen text sits in Signal White, its build in Soft White, its crosshair in Signal White; every other row dims wire and screen to 30% and label and build to 40%. All of it at 300ms ease-out.
- **Loud row:** row 4, the exam room: a display-compact numeral ("4", 四 in zh; clamp(3.5rem, 6vw, 6rem) from 640px, clamp(3rem, 12vw, 3.5rem) below, weight 100, line-height 0.9) in Signal White above its wire sentence, 1rem clear; its screen text stays Signal White whether or not it is active, and when dimmed its wire and screen floor at 60% rather than 30%. The row takes 2.75rem of extra room above and below.
- **Head and meta:** title top-left at display-compact; beneath it the description's first sentence as a deck at title size (1.75rem, 200, Soft White, 36rem max, text-wrap pretty) across the full width; then from 1024px a two-equal-column grid with a 5.5rem gap and 4rem between its rows: the exam room figure in the first column and the rest of the paragraph in the second, 24rem wide in Soft White Variant, so the lede starts on the screen column. The figure: the exam room drawn at hairline in Ash (viewBox 460 by 245, 29rem max): one large frame holding a patient video placeholder with drafting diagonals and a "Patient" label, a notes column of five rules and a box at 40% Slate, and a bottom bar of four small frames with the second filled at 25% ink; "Exam room" in label caps above and a mono caption beneath; labels and captions are translation keys; hidden below 640px. Below 1024px the head stacks with 2.75rem gaps. Rows begin 5.5rem below the head, 7rem from 640px. The arc paragraph (28rem, Soft White) sits 8.5rem below the rows; from 1024px it starts on the screen column, 2.75rem clear of the seam, with a 2.75rem horizontal ghost hairline from the seam to its first line; below 1024px no line is drawn and it sits flush left. Date, stack, and a text link to the live product shown as its hostname with a ↗ character, all in label caps Ash 0.75rem apart, 5.5rem below the arc and on the screen column from 1024px; the link in Soft White rising to Signal White on hover.
- **Motion:** the 300ms ease-out rise (opacity 0 to 1, 0.5rem travel) staggered 60ms per row. Under reduced motion the rise is dropped and the 300ms opacity fade kept.

The fifth is **Six Months** (M-INVEST): six dated events on a vertical axis drawn to scale, one month one fixed height, where the axis itself is the team: one hairline for the three solo months, three parallel hairlines from the month two developers join, and a dashed fourth from the month the agents become usable. The AI story is a line that joins an existing line; there is no How It Was Built block.
- **Track:** `--month` is 12rem at every width; the indent is 2.75rem on phones and 5.5rem from 640px; events start 3.75rem right of the indent on phones and 3.5rem from 640px. The track is at least six months tall and grows with the measured layout. Each month's tick sits one month height below the previous tick or 2.75rem below the last event above it, whichever is lower; events sit at their month's tick, pushed 2.75rem past the event above when they would overlap; so a crowded month stretches, no later month shrinks, and no event ever moves to another month. The track begins 5.5rem below the head, 7rem from 640px.
- **Month ticks:** the month name in label caps in Ash, right-aligned 1rem left of the axis (Intl short month in en and ru with the trailing dot stripped; the Chinese numeral helper plus 月 in zh), and an 11px by 1px tick in Slate at full strength centred on the axis.
- **Axis:** one 1px 20% Slate ghost hairline at the indent from the top of the track to the turn (the centre of the loud event's name); from the turn, the same line continues and two more run 6px and 12px to its right, all Ash at 22%, the drafting-mark tone; from the centre of the Agents event's name a dashed line at 18px (3px dashes, 4px gaps, Ash at 22%). Below 1024px every line ends at the track's bottom; from 1024px the staffed lines and the dashed line run 8.5rem (plus 0.6rem) further to the hand-off hairline. Staff labels in label caps in Ash set vertically (writing-mode vertical-rl, reading downward, 1rem below their start): "One developer" at the top beside the solo line, "Three developers" from the turn beside the third line, "Agents" beside the dashed line from the Agents event or 2rem below the end of "Three developers", whichever is lower. Labels are translation keys.
- **Event:** name as an h2 in title typography (1.75rem, 200, Soft White), pulled up 0.6em so its centre sits on the tick; detail in body in Soft White Variant, 28rem max, 0.75rem below. The loud event (index 2, "Two join", the turn): name at headline-fluid (clamp(2.25rem, 7vw, 3.5rem)) in Signal White at weight 100 and line-height 1, pulled up 0.5em; detail 32rem max in Soft White.
- **Active event:** the event nearest a line at 40% of the viewport (scroll and resize, rAF-throttled) or the hovered event on mouse pointers only (hover wins); the list carries the index as `data-active`. The active event's name is Signal White and its text at full opacity; every other event's name and detail sit at 30%; the loud event floors at 60% and keeps its name Signal White. All of it at 300ms ease-out.
- **Head and meta:** title top-left at display-compact (clamp(2.5rem, 10vw, 3.5rem) on phones); beneath it the description's first sentence as a deck at title size (1.75rem, 200, Soft White, 36rem max, text-wrap pretty); from 1024px a 6/4 grid with a 5.5rem gap, the deck and the pipeline figure in the first column and the rest of the paragraph in the second, 24rem wide, right-anchored, in Soft White Variant; below 1024px the head stacks with 2.75rem gaps. The figure: the delivery pipeline drawn at hairline in Ash (viewBox 460 by 160, 32rem max, 2.75rem below the deck and 4rem from 1024px): three boxes in a row (Pull request, Review, Pipeline) joined by rules at 40% Slate, branching to three stacked boxes (prod, stage, demo), a mono caption beneath; labels and the caption are translation keys; hidden below 640px. The arc paragraph (28rem, Soft White) sits 8.5rem below the track; from 1024px it is right-aligned with a horizontal 20% Slate hairline from the axis to its first line (0.6rem down, 2.75rem clear of the paragraph); below 1024px no line is drawn and it indents to the event column. Date and stack in label caps Ash 0.75rem apart, indented to the event column, 5.5rem below the arc. No link.
- **Motion:** the 300ms ease-out rise (opacity 0 to 1, 0.5rem travel) staggered 60ms per event. Under reduced motion the rise is dropped and the 300ms opacity fade kept.

**The Own-Loud-Element Rule.** Per-project compositions do not carry the hero watermark numeral. The section numerals belong to the five hero surfaces; a composition's loud element is its own (the display step of a Growth Curve, the event verb of an Order's Journey, the event verb of a Hand-off, the display-compact numeral on row four of an Interpreter, the "Two join" verb at the turn of Six Months), and a numeral behind it would be a second voice. Its absence on a project page is deliberate, not drift.

## Do's and Don'ts

### Do:
- **Do** anchor content at the 8.5rem offset with the 7rem hairline on hero surfaces, and keep the watermark numeral behind it at 3 to 5%.
- **Do** separate ideas with 2.75rem and sections with 5.5 to 8.5rem of void; a list gets 0.5rem and a disc, never a rule.
- **Do** de-emphasize by mixing a token to 40%, 30%, or 60%; those alpha steps are the only "extra" grays.
- **Do** use label typography (0.6875rem, 600, caps, +0.1em) for every piece of meta, and skip the middle of the scale when pairing it with a title.
- **Do** keep hover to a fill, a fade, or a border change at 300ms ease-out, and reveal panels with the 200ms staggered rise.
- **Do** render zh numerals through the Chinese numeral helper wherever a digit is shown.
- **Do** reach for a tonal plane or a blur, never a shadow, when something needs to lift.

### Don't:
- **Don't** introduce hue. The error token is the only chroma allowed, and only for an actual error.
- **Don't** round a corner. 0px everywhere; the nav dot and the two glass surfaces are the whole exception list.
- **Don't** draw a line to section content. Hairlines mark margins and hand-offs at 20%; they never box.
- **Don't** add icons. Labels, characters, and drafting symbols only.
- **Don't** center long-form text or hero compositions; left-anchor, or right-align metadata.
- **Don't** add a second button style, a filled card, or a drop shadow; each would be a new system decision, not a variant.
- **Don't** reintroduce the pre-2025 "scalable infrastructure" register in copy inside components; the copy voice is short declaratives with specifics.

### Known drift in the shipped code
- Two glass surfaces (the Work date chip and the hover detail panel) use `rgba(var(--color-surface), .7)`, which is invalid CSS and renders no background; they rely on the blur alone. The intent is surface at 70% via `color-mix`.
