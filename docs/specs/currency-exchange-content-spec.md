# Currency Exchange content spec

Approved copy and composition brief for `public/content/projects/currency-exchange/project.json`, from the interview of 2026-10-15. English is the source of truth; ru and zh follow it. Terms per `GLOSSARY.md`. The copy below was approved line by line and must not be regenerated.

This spec supersedes sections 4 and 7 of `docs/specs/ai-first-content-spec.md`: the `aiFirst` block is removed from the content file and the How It Was Built block is retired from the site; its widget, schema, locale keys, and e2e spec go with the composition. The page's AI story is told by the composition. The About copy (`about.*`) stays as it is; every sentence in it remains true.

## 1. Facts the page may state

- The back office of a fiat-to-crypto exchange, built for the exchange's shareholders. In production since 2025, started June 2025, ongoing.
- The order: a customer orders through a mini app or a Telegram bot; the back office assigns payment requisites from a vendor integration or the internal requisites pool, by priorities the operators set in the admin panel; the provider's confirmation that the fiat arrived lands on its own; the crypto amount is computed and sent; the chain transaction is parsed and confirmed; the bookkeeping microservice records every movement across the exchange's accounts.
- Measured figures the engineer stands behind: over 2,000 exchanges a day in production; the operators' manual processing time cut by half (before: asking providers whether funds arrived, typing crypto amounts by hand); the bookkeeping module from the first shareholder conversation to production in about two months.
- Solo from June 2025: the operational back office and the admin panel. Two developers joined in October 2025 to take the requisites-provider integrations, which appear and disappear constantly; the engineer kept the big features and the bookkeeping, and is still the lead.
- The method: `team-agents`, one versioned repo of skills, agents, and documented workflows that every project is initialised from and that the engineer maintains; spec-driven tickets written by the engineer; agents implement and submit PRs; agents review every PR against one checklist and the engineer reviews big features; after each demo release an agent runs the shared QA checklists in the browser (Claude Code with a browser) plus scripted data checks and reports interface and data regressions.
- The two developers arrived with their own ad-hoc AI setups (approved, from the AI-first content spec).

## 2. Facts the page may not state

- No product name, no link, no gallery. The page stays "CURRENCY EXCHANGE".
- No "1,000+ requests per day" (superseded by the measured 2,000 exchanges a day).
- No claim that the engineer reviews every line personally: agents review every PR against the checklist; the engineer reviews big features. The glossary's AI-first definition was sharpened to match.
- No failure anecdote is available; none is invented.
- No How It Was Built block, no anchor figure as a display element.
- Nothing from the banned register: fully functional, streamlines, seamless, scalable, ensuring.

## 3. Highlight

| Locale | Text |
| --- | --- |
| en | Back office for a fiat-to-crypto exchange: 2,000 orders a day, half the operator work gone |

## 4. Description (two paragraphs, split on a blank line)

> The back office of a fiat-to-crypto exchange. A customer orders through a mini app or a Telegram bot; the back office assigns payment requisites from a vendor integration or the internal pool, by priorities the operators set in the admin panel; the provider's confirmation that the fiat arrived lands on its own; the crypto amount is computed and sent, the chain transaction parsed and confirmed; and the bookkeeping microservice records every movement across the exchange's accounts. Built for the exchange's shareholders, in production since 2025, handling over 2,000 exchanges a day with half of the operators' manual work gone.
>
> I started alone in June 2025 and built the operational back office and the admin panel; the bookkeeping module went from the first shareholder conversation to production in about two months. In October two developers joined to take the requisites-provider integrations, which appear and disappear all the time, and I kept the big features and the bookkeeping. The team runs on team-agents, one versioned repo of skills, agents, and documented workflows that every project is initialised from and that I maintain: I write the specs and the tickets, agents implement and submit the PR, agents review every PR against one checklist and I review the big features, and after each demo release an agent runs the shared QA checklists in the browser and scripted checks on the data, and reports the regressions. It's the project where the method became the way I work, and then the way a team works.

The composition uses the first paragraph as the lede and the second as the arc paragraph.

## 5. Achievements

1. Built the back office and admin panel of a fiat-to-crypto exchange alone, from scratch; in production, handling over 2,000 exchanges a day
2. Took the bookkeeping module from the first shareholder conversation to production in about two months, recording every movement across the exchange's accounts
3. Automated the operators' manual steps, from asking providers about funds to typing crypto amounts, cutting their manual processing time by half
4. Built and maintain team-agents, the versioned repo of skills, agents, and workflows every project is initialised from, and moved two newly joined developers onto it: spec-driven tickets, agents implementing and reviewing against one checklist, the lead reviewing big features
5. Built the AI QA infrastructure: shared checklists and smoke tests run by an agent in the browser after each demo release, with scripted data checks and regression reports

## 6. Project schema

Optional `byHand` block on `ProjectJson`, typed in `src/shared/config/projects.ts` and resolved per locale in `locale-resolver.ts`:

```ts
byHand?: {
  operators: { what: LocalizedString; before: LocalizedString; now: LocalizedString }[];
  team: { what: LocalizedString; before: LocalizedString; now: LocalizedString }[];
}
```

Two ledgers of rows; nothing else new. The figures live in the copy, not in the data.

## 7. The ledgers

### Operators

| # | What | Before | Now |
| --- | --- | --- | --- |
| 1 | Payment details | An operator picked requisites by hand. | Assigned from a vendor integration or the internal pool, by priorities the operators set in the admin panel. |
| 2 | Funds confirmation | An operator asked the requisites provider whether the customer's fiat had arrived. | The provider's confirmation lands in the back office on its own. |
| 3 | The crypto leg | An operator typed the amount into the send. | The amount is computed and sent, and the chain transaction is parsed and confirmed. |
| 4 | The books | Balances kept by hand outside the system. | The bookkeeping microservice records every movement across the exchange's accounts. |
| 5 | New providers | Each new provider meant a new manual routine. | An integration pattern the two developers add as providers appear and disappear. |

### Team

| # | What | Before | Now |
| --- | --- | --- | --- |
| 1 | Tickets | Tasks described in chat. | Spec-driven tickets, the same shape every time. |
| 2 | Tooling | Each developer with their own AI setup. | Every project initialised from team-agents, one versioned repo of skills, agents, and documented workflows. |
| 3 | Implementation | Written by hand. | Agents implement from the ticket and submit the PR. |
| 4 | Review | Whoever had time. | Agents review every PR against one checklist; the lead reviews the big features. |
| 5 | QA | Manual passes on the demo stand. | After each demo release an agent runs the shared checklists in the browser and scripted checks on the data, and reports interface and data regressions. |

## 8. Composition brief (for the design pass)

**Story: taken off hands.** Two ledgers of removed manual work, the same idea twice. First the operators: what they did by hand before the platform against what the system does now, captioned by the two measured figures (over 2,000 exchanges a day; half the operators' manual work gone). Then the developers: what was ad hoc before against what the method does now, captioned by `team-agents`. The site's thesis, that the engineer builds financial systems and runs the team the same way, becomes one shape. The second paragraph closes the page. There is no How It Was Built block; this composition replaces it, and the block's code is deleted in the same unit of work.

Constraints, all from `DESIGN.md`:

- Stays inside the Monolith: zero chroma, 0px corners, no shadows, no icons, ghost hairlines at 20% Slate for margins and hand-offs only. The "before" column is the dimmer one by tone; the "now" column carries the light. No strikethrough, no red.
- No hero watermark numeral (the Own-Loud-Element Rule). The loud element is the composition's own: a candidate is the two figures set as the operators' ledger caption at display scale, in the anchor-figure manner, or the hand-off from the first ledger to the second.
- A new shape: two before/now ledgers. It must not read as the Interpreter's paired rows across a seam (that one pairs wire and screen; this one pairs time, before and now, and has two ledgers with a hand-off between them), nor as a stage-walk, a climb, or a timeline.
- Reveal through the shared scroll-reveal mechanism in `src/widgets/project-compositions/lib`; 300ms ease-out rise staggered per row; reduced motion drops the rise and keeps the fade.
- Column and ledger labels ("Before", "Now", "Operators", "Team", the figure captions) need locale keys for en, ru, zh; zh numerals through the Chinese numeral helper wherever a digit is shown.
- Hero figure, if one is drawn: material limited to the real artifacts: an order's row in the admin panel with its requisites source, the requisites priority list, a bookkeeping entry with its balancing movement, the `team-agents` repo tree, the AI QA report. Preferred: the bookkeeping entry, since the bookkeeping is the hard part. Hidden below 640px if its text would not read.
- Registered under `currency-exchange` in `src/widgets/project-compositions/index.ts`.
- Retire with the composition: `src/widgets/how-it-was-built`, the `aiFirst` schema and resolver and their tests, the `built.*` locale keys, `e2e/project-built.spec.ts`, and the mount in `ProjectDetail.tsx`. Update DESIGN.md's How It Was Built subsection to say the block is retired.
