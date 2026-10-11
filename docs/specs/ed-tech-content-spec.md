# Ed-Tech Platform content spec

Approved copy and composition brief for `public/content/projects/ed-tech-platform/project.json`, from the interview of 2026-10-11. English is the source of truth; ru and zh follow it. Terms per `GLOSSARY.md`. The copy below was approved line by line and must not be regenerated.

## 1. Facts the page may state

- Built 2021-01 to 2022-01 for a founder. Team: a PM between the engineer and the founder, a DevOps for the servers, and the engineer as the only developer.
- Ran for a closed circle of subscribers, then shelved for financial reasons.
- Three roles, three interfaces, one React app: author, admin, student. One role per account. Admins also live in the Strapi admin, but moderation and author invites happen in the platform's own admin interface.
- Authors are onboarded by admin invite; there is no self-serve author sign-up.
- A course contains ordered lessons. A lesson is a rich-text page with images and, optionally, a video uploaded in the editor at creation time and served as a plain file from the platform's own server. No transcoding.
- Lessons and courses carry draft, submitted, and published states. An admin reviews lessons one by one and publishes them; nothing reaches a student unpublished.
- One monthly subscription for the whole catalog; no per-course or per-author purchase. Payment rails: Stripe (driven from the backend, with webhooks), CloudPayments (cards), and a crypto rail for one-off periods, provider not remembered.
- Student side: dashboard, progress as lessons completed per course, one rating per course shown in the catalog.
- Strapi was migrated from v3 to v4 on the running platform, rewriting the frontend against the new response shape, the permissions model, and the custom controllers, with the data intact.

## 2. Facts the page may not state

- No product name, no link, no gallery, no screenshots. None exist or may be shown.
- No figures of any kind: no subscriber, course, author, or duration numbers.
- No "zero downtime" and no maintenance-window claim either way; the month of the migration is not remembered.
- No claims about subscription lifecycle mechanics (renewals, failed payments, access revocation on lapse) or about the crypto provider.
- Nothing from the banned register: comprehensive, seamless, ensuring, scalable, robust.

## 3. Highlight

| Locale | Text |
| --- | --- |
| en | Subscription course platform: authors write, admins publish, students learn |

## 4. Description (two paragraphs, split on a blank line)

> Three roles in one app. Authors write lessons as rich-text pages with images, upload a video into a lesson when it has one, group lessons into courses, and send them for review. Admins invite the authors, review every lesson, and publish it; nothing reaches a student without that step. Students pay one monthly subscription for the whole catalog, by card through Stripe or CloudPayments or in crypto for a one-off period, and get a dashboard with progress per course and one rating per course. Built for a founder, it ran for a closed circle of subscribers and was shelved when the money ran out.
>
> I was the only developer on the product, with a PM between me and the founder and a DevOps for the servers. Everything in the app is mine: the three interfaces, the review states, the upload, the payment integrations, and the data model in Strapi. It was the first project where I owned a product's data model and ran a CMS as the backend, and the first where I changed the foundations of a live system: when Strapi v4 came out I moved the running platform from v3 to v4, rewriting the frontend against the new response shape, the permissions model, and the custom controllers, with the data intact. It's the project where I learned to own a whole product rather than features inside one.

The composition uses the first paragraph as the lede and the second as the arc paragraph, as Wizmart does.

## 5. Achievements

1. Built the platform from scratch as the only developer: author, admin and student interfaces in one app, with a review gate between writing and publishing
2. Integrated Stripe, CloudPayments and a crypto rail behind one monthly subscription, with Stripe driven from the backend over webhooks
3. Migrated the live platform from Strapi v3 to v4, rewriting the frontend, permissions and custom controllers, with the data intact

## 6. Project schema

Optional `handoff` block on `ProjectJson`, typed in `src/shared/config/projects.ts` and resolved per locale in `locale-resolver.ts`:

```ts
handoff?: {
  stages: {
    actor: "author" | "admin" | "student";
    name: LocalizedString;
    fact: LocalizedString;
    built: LocalizedString;
  }[];
}
```

`actor` is an enum, not a localized string; the composition renders its label through the locale files.

## 7. The stages

| # | Name | Actor | Fact | Built |
| --- | --- | --- | --- | --- |
| 1 | Written | author | A lesson is a rich-text page with images; when it has a video, the author uploads it in the editor and it is served from the platform's own server. | The authoring interface, the lesson editor, and the upload. |
| 2 | Submitted | author | The author groups lessons into a course and sends them for review. | The draft, submitted, and published states on lessons and courses. |
| 3 | Published | admin | An admin reviews the lesson and publishes it. Nothing reaches a student without this step. | The admin interface: the review queue, publishing, and author invites. |
| 4 | Unlocked | student | One monthly subscription opens the whole catalog; there is no per-course purchase. | Stripe from the backend over webhooks, CloudPayments for cards, and a crypto rail for one-off periods. |
| 5 | Completed | student | Progress is lessons completed per course, shown on the dashboard the student lands on. | Progress tracking and the dashboard. |
| 6 | Rated | student | A student leaves one score per course, and the catalog shows it. | Course ratings. |

Stage 3, Published, is the event stage.

## 8. Composition brief (for the design pass)

**Story: the hand-off.** One lesson's life crossing the role seam. Two changes of actor: author to admin at Submitted/Published, admin to student at Unlocked. The crossing at Published is the loud element of the page; the actor change is what makes this shape different from Wizmart's single-actor Order's Journey.

Constraints, all from `DESIGN.md`:

- Stays inside the Monolith: zero chroma, 0px corners, no shadows, no icons, ghost hairlines at 20% Slate for margins and hand-offs only.
- No hero watermark numeral (the Own-Loud-Element Rule). The event verb at Published is the page's one loud element.
- Reveal through the shared scroll-reveal mechanism in `src/widgets/project-compositions/lib`; 300ms ease-out rise staggered per stage; reduced motion drops the rise and keeps the fade.
- Actor labels in label typography (0.6875rem, 600, caps, +0.1em). Three actor labels need locale keys for en, ru, zh.
- zh numerals through the Chinese numeral helper wherever an index is shown.
- Hero figure, if one is drawn: material limited to the real artifacts, which are the lesson editor with a video slot, the moderation queue, and the progress bar on a dashboard. Preferred: the lesson in two states, submitted and published, drawn at hairline in Ash, as the balance slip and the print label are. Hidden below 640px if its text would not read.
- The migration and the billing are not stages beyond what the table says: billing lives inside Unlocked, the migration lives in the arc paragraph and achievement 3 only.
- Registered under `ed-tech-platform` in `src/widgets/project-compositions/index.ts`.
