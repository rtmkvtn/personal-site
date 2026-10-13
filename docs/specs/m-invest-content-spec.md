# M-INVEST content spec

Approved copy and composition brief for `public/content/projects/m-invest/project.json`, from the interview of 2026-10-13. English is the source of truth; ru and zh follow it. Terms per `GLOSSARY.md`. The copy below was approved line by line and must not be regenerated.

This spec supersedes section 5 of `docs/specs/ai-first-content-spec.md` for M-INVEST: the `aiFirst` block is removed from the content file, its note ("grew from boilerplate to full features") was not accurate, and the How It Was Built block is being retired as a direction. The page's AI story is told by the composition.

## 1. Facts the page may state

- January to June 2025, built for a founder by an in-house team, frontend and backend side by side.
- One frontend developer for the first three months: from a designer's Figma to a working MVP in three months. After the MVP shipped, two frontend developers joined; the first time the engineer led a team: mandatory review on every PR, one code style, an onboarding process, tasks split for a shared codebase.
- The product: a closed peer-to-peer market for an internal currency; members buy and sell it among themselves and the trades set the price. Orders and balances live over WebSocket; an XMPP chat inside the cabinet; Chart.js charts of the price and a member's holdings.
- Claude Code and Codex became usable mid-build (about April 2025) and were folded into the existing process: functions and components written under constant observation with no loss of quality, and a lot of the infrastructure (linting, pre-commit hooks, CI/CD pipelines) with their help. Review did not change.
- GitLab CI and Docker pipelines to prod, stage, and demo; a feature's release time from several hours to 15 minutes (an approved anchor figure, kept in words inside an achievement, not as the page's claim).
- Live in the founder's hands when the engagement ended in June 2025.
- The name "M-INVEST" is shown; there is no public link.

## 2. Facts the page may not state

- Nothing about what the currency promised: no growth, returns, yield, or "investment instruments". The page describes the software, not the money.
- Not "AI-first from the start": the tools arrived mid-build and joined a process that already existed. No "agents wrote full features".
- No How It Was Built block and no "15 min" anchor figure as a display element.
- No gallery, no screenshots; none exist. No figures beyond three months, a team of three, three environments, and the 15 minutes.
- Nothing from the banned register: streamlined, seamless, ensuring, scalability, real-time monitoring.

## 3. Highlight

| Locale | Text |
| --- | --- |
| en | Peer-to-peer market for an internal currency: MVP alone in three months, then a team of three |

## 4. Description (two paragraphs, split on a blank line)

> A closed peer-to-peer market for an internal currency. Members buy and sell it among themselves, and the trades set the price. Orders and balances update live over WebSocket, members talk in an XMPP chat inside the cabinet, and the charts draw the price and a member's holdings. Built for a founder by an in-house team, frontend and backend side by side; the frontend went from a designer's Figma to a working MVP in three months, by one developer, and was live in the founder's hands when the engagement ended in June 2025.
>
> I was that developer. For the first three months it was me and the backend team; after the MVP shipped, two frontend developers joined and I led for the first time: review on every PR, one code style, an onboarding process, tasks split so three people could work one codebase. Around the same time Claude Code and Codex became usable, and I folded them into that process rather than the other way round: functions and components written under constant observation with no loss of quality, and a lot of the infrastructure, linting, pre-commit hooks, the GitLab CI and Docker pipelines to prod, stage and demo, which took a feature's release from several hours to fifteen minutes. It's the project where I first led a team, and where the agents first became part of how I work.

The composition uses the first paragraph as the lede and the second as the arc paragraph.

## 5. Achievements

1. Built the frontend alone from a designer's Figma to a working MVP in three months: the peer-to-peer market, orders and balances live over WebSocket, an XMPP chat, price and holdings charts
2. Led a team of three after the MVP: mandatory review on every PR, one code style, an onboarding process, and tasks split for a shared codebase
3. Folded Claude Code and Codex into that process when they became usable mid-build: functions and components under constant observation, and a lot of the tooling, from linting and pre-commit hooks to the pipelines
4. Set up GitLab CI and Docker pipelines to prod, stage, and demo, taking a feature's release time from several hours to 15 minutes

## 6. Project schema

Optional `timeline` block on `ProjectJson`, typed in `src/shared/config/projects.ts` and resolved per locale in `locale-resolver.ts`:

```ts
timeline?: {
  events: {
    when: string; // YYYY-MM
    name: LocalizedString;
    detail: LocalizedString;
  }[];
}
```

`when` is a month; the composition places events on the project's span (`startDate` to `endDate`). The loud event is chosen by index in the component.

## 7. The events

| # | When | Name | Detail |
| --- | --- | --- | --- |
| 1 | 2025-01 | Start | One developer and a designer's Figma. The frontend from the first screen, with the backend team next door. |
| 2 | 2025-03 | MVP | The market built alone in three months: the internal currency traded peer to peer, orders and balances live over WebSocket, the XMPP chat, the charts. |
| 3 | 2025-04 | Two join | The MVP ships and two developers join. Review on every PR, one code style, an onboarding process, tasks split for a shared codebase. |
| 4 | 2025-04 | Agents | Claude Code and Codex become usable mid-build. Functions and components written under constant observation with no loss of quality; linting, pre-commit hooks, and the pipelines with their help. |
| 5 | 2025-05 | Pipelines | GitLab CI and Docker to prod, stage, and demo. A feature's release time from several hours to 15 minutes. |
| 6 | 2025-06 | Hand-off | Live in the founder's hands when the engagement ends. |

Event 3, "Two join", is the loud event. Events 3 and 4 share a month; the composition must stack or offset them without inventing a date.

## 8. Composition brief (for the design pass)

**Story: six months.** A timeline from January to June 2025, drawn to the month. The first three months are one developer building the MVP; at the turn the MVP ships and two developers join; the agents arrive in the same month and their share grows; the pipelines land; the engagement ends with the product live. The AI story is told as what it was: a mid-project arrival folded into a process that already existed. This page carries no How It Was Built block and no anchor figure; the codebase and team facts live on the line itself, and the second paragraph closes the page.

Constraints, all from `DESIGN.md`:

- Stays inside the Monolith: zero chroma, 0px corners, no shadows, no icons, ghost hairlines at 20% Slate. The time axis is a hairline; ticks are the Work page's 1px Slate tick vocabulary; month labels in label caps; the zh locale renders months and numerals through the Chinese numeral helper.
- No hero watermark numeral (the Own-Loud-Element Rule). The loud element is the turn at event 3.
- A new shape: a scaled time axis with events on it. It must not read as a fifth stage-walk, a Growth Curve climb, or a ledger. The one-developer stretch (three months) and the three-developer stretch should be legible as lengths, not just as labels.
- Reveal through the shared scroll-reveal mechanism in `src/widgets/project-compositions/lib`; 300ms ease-out rise staggered per event; reduced motion drops the rise and keeps the fade.
- Any axis labels (months, "one developer", "three developers") need locale keys for en, ru, zh.
- Hero figure, if one is drawn: material limited to the real artifacts: the order book with live balances, the chat panel, the price chart, the three-environment pipeline, the review gate. Preferred: the pipeline to three environments drawn at hairline in Ash, since it is the one artifact the agents and the team both touched. Hidden below 640px if its text would not read.
- Registered under `m-invest` in `src/widgets/project-compositions/index.ts`.
