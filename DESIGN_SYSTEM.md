# Design System Strategy: High-End Architectural Minimalism

## 1. Overview & Creative North Star: "The Monolith"
This design system is a rejection of the cluttered, "app-like" interfaces common in modern digital products. It draws its soul from high-end architectural monographs—where white space (or in this case, "black space") is as important as the content itself.

**Creative North Star: The Monolith**
The Monolith represents a design that feels carved from a single block of obsidian. It is heavy, silent, and intentional. We break the "template" look by utilizing extreme asymmetric balance. Instead of centering elements, we anchor them to unconventional grid intersections, leaving massive voids that force the user to focus on a single piece of content at a time. The goal is a "no-scroll" experience where every frame is a curated, static composition.

---

## 2. Colors: Tonal Depth in Darkness
The palette is a study in restrained contrast. We avoid true absolute black for text to prevent eye strain, opting instead for a sophisticated soft white.

### Palette Application
* **Background (`#131313`):** The canvas. This deep, matte charcoal provides a more premium feel than #000000, allowing for "true black" (`surface_container_lowest`) to be used for added depth.
* **Primary (`#ffffff`):** Reserved exclusively for high-priority text and active UI states.
* **On-Surface (`#e2e2e2`):** The primary color for body copy, providing a soft, legible contrast against the dark background.

### The "No-Line" Rule
Traditional borders are strictly prohibited for sectioning. Boundaries are created through:
1. **Negative Space:** Using the `20` (7rem) or `24` (8.5rem) spacing tokens to separate ideas.
2. **Tonal Transitions:** Moving from `surface` to `surface_container_low` to denote a change in functional area.

### Surface Hierarchy & Nesting
Treat the interface as a series of physical planes.
* **Base:** `surface` (#131313).
* **Secondary Context:** `surface_container` (#1f1f1f).
* **Interactive Elements:** `surface_bright` (#393939).
* **Floating/Overlaid Modals:** Use `surface_container_highest` (#353535) with a backdrop blur of 20px to create a "Smoked Glass" effect. This ensures the UI feels integrated into the space, not "pasted" on top.

---

## 3. Typography: The Editorial Scale
We use **Inter** for its neutral, architectural precision. The identity is defined by the tension between extreme scales.

* **Display Large (`display-lg`):** 3.5rem. Weight: 100 (Thin) or 200 (Extra Light). Letter-spacing: -0.02em. This is your "Hero" moment.
* **Body Medium (`body-md`):** 0.875rem. Weight: 400. Letter-spacing: +0.05em. The generous tracking gives the text an "expensive" feel, reminiscent of gallery wall labels.
* **Labels (`label-sm`):** 0.6875rem. Weight: 600. All Caps. Letter-spacing: +0.1em. Used for navigation and meta-data to provide a technical, blueprint-like aesthetic.

**Hierarchy Strategy:** Never pair two sizes that are adjacent in the scale. If using a `display-lg` headline, skip to `body-md` for the description. This "missing middle" creates the sophisticated, high-contrast look required.

---

## 4. Elevation & Depth: Tonal Layering
This system forbids drop shadows. Elevation is communicated through light, not shadow.

* **The Layering Principle:** To "lift" an element, change its background token. A card should be `surface_container_low` sitting on a `surface` background.
* **The "Ghost Border" Fallback:** If a technical constraint requires a separator, use the `outline_variant` token (#474747) at 20% opacity. It should be barely visible—a "suggestion" of a line rather than a boundary.
* **Asymmetric Layouts:** Avoid the 12-column grid. Position elements using the Spacing Scale (e.g., a headline offset by `16` (5.5rem) from the left, with body text offset by `24` (8.5rem) from the right).

---

## 5. Components

### Buttons
* **Primary:** No background. 1px `primary` ghost border (the only exception to the no-border rule). Text is `primary`, All Caps, `label-md`.
* **Hover State:** Background fills with `primary` (#ffffff), text flips to `on_primary` (#1a1c1c). Transition: 300ms ease-out.
* **Shape:** `0px` radius (Strict Square).

### Input Fields
* **Structure:** No bounding box. A single 1px line (`outline_variant`) at the bottom.
* **Focus State:** The line expands to 2px and changes to `primary`. Label shifts to `primary` color.
* **Error:** Text uses `error` (#ffb4ab). No icons; the color shift is the signal.

### Cards & Lists
* **The "No-Divider" Rule:** Lists are separated by `8` (2.75rem) vertical padding. Do not use horizontal lines to separate list items. Use white space as the separator.
* **Image Handling:** Architectural imagery should be monochromatic or desaturated. Images are always "flush" to one side of the container—no padding between the image edge and the container edge.

### Navigation (The Curator's Menu)
* **Style:** Fixed position, bottom-left or top-right.
* **Interaction:** Simple text links using `label-md`. Active state is indicated by a small 4px `primary` dot beneath the text, rather than a color change or underline.

---

## 6. Do's and Don'ts

### Do:
* **Do** embrace the "Empty State." If a screen has only one sentence, let it sit alone in the center of the dark void.
* **Do** use the `px` (1px) spacing token for "Hairline" details that guide the eye without containing the content.
* **Do** prioritize "No-Scroll" layouts. If content is long, break it into a horizontal "Slide" or "Step" progression.

### Don't:
* **Don't** use rounded corners. Every corner must be a sharp 90-degree angle (0px).
* **Don't** use icons unless absolutely necessary. Preference should always be given to text labels.
* **Don't** use center-alignment for long-form text. It breaks the architectural grid. Always left-align or use extreme right-alignment for metadata.
* **Don't** use "Pop" colors. If an alert is needed, use the `error` token, but keep it as the only non-grayscale element on the screen.
