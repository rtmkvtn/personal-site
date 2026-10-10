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
  headline:
    fontFamily: "Inter, Noto Sans SC, sans-serif"
    fontSize: "3.5rem"
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
- **Obsidian** (#131313): the page surface and the normative canvas. The shipped token currently resolves to true black; see the drift note below.
- **True Black** (#000000): the lowest container, used where a plane must sit *below* the page: image overlays fading to nothing, the deepest tonal step.
- **Basalt Low** (#1a1a1a) and **Basalt** (#1f1f1f): the first lift. Bubble fills, the tonal plane behind a secondary context, the stripe in placeholder media.
- **Basalt High** (#2a2a2a), **Basalt Highest** (#353535), **Basalt Bright** (#393939): higher planes. Highest is the smoked-glass modal body; Bright is reserved for interactive surfaces that need to read as raised.
- **Soft White** (#e2e2e2): body copy and the resting color of navigation links. Deliberately not pure white so paragraphs sit back from titles.
- **Soft White Variant** (#c4c7c7): secondary body, the Agents side of a ladder, section labels on dark planes.
- **Ash** (#8e9192): meta text, field labels, index numbers, drafting coordinates, the crosshair.
- **Slate** (#474747): the hairline base. Almost never shown at full strength; it appears at 20% as a ghost line, and at full strength only for the timeline tick on the Work page.

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
- **Headline** (200, 3.5rem, 1.1): project names in the Work scroller and on project pages; the skill name in the detail panel at clamp(2.5rem, 5vw, 3.5rem). Weight 100 on the skill panel and the mobile modal, 200 elsewhere.
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
- **Ladder:** four rows, Me rows flush left in Signal White at weight 200, Agents rows indented to a vertical guide in Soft White Variant at weight 100. Each row: index and owner in label typography, step name in title typography, detail in body.
- **Drafting marks:** Ash guides at 22% (vertical) and 14% (horizontal and right edge), a 11px crosshair where the hand-off line crosses the guide, mono coordinates in Slate, a rotated project mark on desktop.
- **Anchor:** display-scale figure in Signal White at weight 100 with a label-typography caption in Ash, right-aligned.
- **Note:** body typography in Soft White Variant, indented to the guide, max width 28rem.

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
- `--color-surface` and `--color-surface-container-lowest` both resolve to `#000000`; the normative surface is Obsidian `#131313` with True Black reserved for the lowest plane. Fix the token, not the document.
- Two glass surfaces (the Work date chip and the hover detail panel) use `rgba(var(--color-surface), .7)`, which is invalid CSS and renders no background; they rely on the blur alone. The intent is surface at 70% via `color-mix`.
