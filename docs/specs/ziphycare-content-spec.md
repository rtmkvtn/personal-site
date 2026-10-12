# ZiphyCare content spec

Approved copy and composition brief for `public/content/projects/ziphycare/project.json`, from the interview of 2026-10-12. English is the source of truth; ru and zh follow it. Terms per `GLOSSARY.md`. The copy below was approved line by line and must not be regenerated.

## 1. Facts the page may state

- June 2022 to December 2024, remote, a US at-home telehealth startup, live with real patients throughout. The longest engagement on the site.
- Joined as a frontend engineer in a team of four; by the end owned the releases: biweekly, three environments, QA sign-off before production.
- Two apps were the frontend's: ZiphyDoc for physicians and MyZiphy for patients. ZiphyAdmin was not touched. The ZiphyKit is a case of exam devices with its own app, operated by a medical assistant in the home; its readings reached the physician through ZiphyDoc.
- The visit: the patient books in MyZiphy; the physician runs the exam from ZiphyDoc with Zoom embedded; one physician could hold up to four appointments in one slot, folded into a bottom bar of small live previews, one click from the big screen; after the visit, the patient's history and a PDF visit summary.
- FHIR: the backend returned raw resources (Observations, Conditions, medications, prescriptions, orders) in the arrays they arrived in and expected complete FHIR objects back. The frontend layer: adapters and transformers on read, one base store with an isolated inheriting store per resource type, composers assembling valid resources on save.
- Led the incremental migration of a large live codebase from JavaScript to strict TypeScript; reorganized the reachable layers along Feature-Sliced Design.
- The company name, the product names, and the public link https://ziphycare.com/ may be shown.

## 2. Facts the page may not state

- No "100k+ lines", no "~30% fewer runtime errors", no "25% faster onboarding"; none has a measurement behind it. "A large codebase" is the wording.
- No "patented", no "FDA-cleared" or "FDA-registered"; the page is about the engineer's work, not the company's regulatory status.
- No HIPAA or compliance claims; nothing compliance-specific was built.
- No claims about how the kit's data travelled; only that it reached the physician through the interface.
- No gallery, no screenshots; none exist.
- Nothing from the banned register: comprehensive, seamless, end-to-end solution, reimagining, streamlines.

## 3. Highlight

| Locale | Text |
| --- | --- |
| en | Physician and patient apps for at-home medical exams, on raw FHIR |

## 4. Description (two paragraphs, split on a blank line)

> Two apps for at-home medical exams. A patient books a visit in MyZiphy; a medical assistant comes to the home with the ZiphyKit, a case of exam devices with its own app; the physician runs the exam from ZiphyDoc, with Zoom inside the app and the kit's readings reaching them through our interface. One physician could hold up to four appointments in a slot, folded into a bottom bar of live previews, one click from the big screen. After the visit, the patient's history and a PDF summary. A US startup, live with real patients the whole time I was there.
>
> I joined as a frontend engineer in a team of four, remote, and stayed two and a half years, the longest I've been on one product. The hard part was FHIR: the backend returned raw resources, Observations, Conditions, medications, prescriptions and orders, in the arrays they came in, and expected complete FHIR objects back. I built the layer between that and the screen: adapters and transformers on read, one base store with an isolated store per resource type, composers that assembled valid resources on save. Around it I led the move of a large codebase from JavaScript to strict TypeScript, incrementally, while it stayed live, reorganized what I could reach along Feature-Sliced Design, and by the end owned the releases: biweekly, three environments, QA sign-off before production. It's the project where I learned to make a legacy codebase safe to change without stopping the product.

The composition uses the first paragraph as the lede and the second as the arc paragraph.

## 5. Achievements

1. Built the physician's and patient's apps for at-home exams: scheduling, the exam room with Zoom embedded and up to four live appointments in one slot, the patient's booking and history
2. Built the frontend's FHIR layer: adapters and transformers on read, one store per resource type, composers producing complete FHIR objects on save, and the PDF visit summary
3. Led the incremental migration of a large live codebase from JavaScript to strict TypeScript
4. Reorganized the codebase along Feature-Sliced Design and owned biweekly releases to three environments behind a QA gate

## 6. Project schema

Optional `interpreter` block on `ProjectJson`, typed in `src/shared/config/projects.ts` and resolved per locale in `locale-resolver.ts`:

```ts
interpreter?: {
  rows: {
    direction: "in" | "out";
    wire: LocalizedString;
    screen: LocalizedString;
    built: LocalizedString;
  }[];
}
```

`direction` is an enum: `in` runs wire to screen, `out` runs screen to wire.

## 7. The rows

| # | Direction | Wire | Screen | Built |
| --- | --- | --- | --- | --- |
| 1 | in | Observations as the backend returned them, raw resources in the arrays they arrived in. | A history timeline the physician reads at a glance. | Adapters and transformers on read. |
| 2 | in | Conditions, medications, prescriptions, each its own resource type. | The patient's chart. | One base store, with an isolated inheriting store per resource type. |
| 3 | out | Complete FHIR objects, valid on arrival; the backend adapted nothing. | The physician's edits: a condition added, a prescription written, an order placed. | Composers that assemble the resources on save. |
| 4 | in | Up to four appointments in one time slot, each a live Zoom session. | A bottom bar of small live previews under the big screen; one click opens the appointment. | The exam room with Zoom embedded in the app, several sessions at once. |
| 5 | in | Appointments. | The patient books a visit and follows their history in MyZiphy. | The patient side of the product. |
| 6 | in | Everything the visit produced: readings, notes, prescriptions. | A PDF visit summary. | The report. |

Row 3 is the reversed row; row 4 is the loud row.

## 8. Composition brief (for the design pass)

**Story: the interpreter.** The frontend as the layer between raw FHIR and the physician. Six paired rows across a seam, not a walk down a guide: on one side what came over the wire, on the other what the physician or patient saw, with what was built between them at the seam. Row 3 runs the other way and is visibly reversed (sides swapped or the seam mark pointing the other way), because the frontend also wrote FHIR. Row 4, four appointments in one slot, is the loud row. The codebase work (TypeScript, FSD, releases) lives in the arc paragraph and achievements 3 and 4 only.

Constraints, all from `DESIGN.md`:

- Stays inside the Monolith: zero chroma, 0px corners, no shadows, no icons, ghost hairlines at 20% Slate for margins and hand-offs only. The seam is a hairline, not a box.
- No hero watermark numeral (the Own-Loud-Element Rule). The loud row's screen side is the page's one loud element.
- A new shape: pairs across a seam. It must not read as a third stage-walk after the Order's Journey and the Hand-off, and not as a Growth Curve climb.
- Reveal through the shared scroll-reveal mechanism in `src/widgets/project-compositions/lib`; 300ms ease-out rise staggered per row; reduced motion drops the rise and keeps the fade.
- Direction and side labels in label typography (0.6875rem, 600, caps, +0.1em); any such labels need locale keys for en, ru, zh.
- zh numerals through the Chinese numeral helper wherever an index is shown.
- Hero figure, if one is drawn: material limited to the real artifacts: the bottom bar of four small live previews under the physician's big screen, a FHIR bundle as it arrived, the history timeline, the PDF summary, the patient's booking screen. Preferred: the bottom bar, four small frames under one large frame at hairline in Ash. Hidden below 640px if its text would not read.
- The public link https://ziphycare.com/ is the project's `link` and may be shown as a text link in the composition's meta.
- Registered under `ziphycare` in `src/widgets/project-compositions/index.ts`.
