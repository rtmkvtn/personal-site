# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: hiring managers and technical recruiters screening Artem Kovtun for a fullstack engineering role, deciding in a minute or two whether to interview. Secondary: founders and CTOs considering contract work or help moving a team onto an AI-first workflow. The site exists to move both from "another fullstack CV" to "this person works in a way I want on my team".

## Product Purpose

A personal portfolio site, trilingual (English source, Russian and Chinese), presenting six real projects, an aggregated hard-skills view, an About page, and contact details. Success is an inbound conversation: an interview request or a project inquiry that already understands the AI-first method before the first call.

## Positioning

An AI-first fullstack engineer, not tied to one domain. The method is the claim: the engineer specifies and reviews, agents implement, test, and refactor, and nothing ships that the engineer can't explain. The evidence is a solo-built financial back office, a team moved onto one shared AI-first workflow, and a project history spanning fintech, health-tech, ed-tech, and marketplaces. The domain breadth is part of the position, not a footnote. Not an "AI engineer": no product here ships an AI feature, and the site must never claim one.

## Operating Context

Visitors arrive from a CV link, LinkedIn, or a direct share, usually on desktop during screening and sometimes on a phone. They scan Work and Hard Skills first, read About if interested, then look for contact details. Content is file-based: one JSON file per project with media folders, plus three locale files. There is no CMS and no backend; the site is a Next.js app deployed as a static-style build.

## Capabilities and Constraints

- Surfaces: Home (role line and CTA), Work (continuous project scroller with a hover detail panel, and a detail page per project), Hard Skills (force-directed bubble chart aggregated from project stacks, with a detail panel), About, Contact.
- Projects carry: name, type, stack, highlight, achievements, description, dates, optional link, optional gallery and video, and, for the AI-first projects, the method told inside each project's own composition. The former "How it was built" block is retired: no page carries it, and its content moved into the Currency Exchange and M-INVEST compositions.
- Locale: en is the source of truth; ru and zh follow per field with English fallback. The zh locale renders digits as Chinese numerals in dates, indices, and stats.
- Vocabulary is fixed in `GLOSSARY.md`: AI-first development, team AI-first migration, surface, role line, stack, achievement, highlight.
- The four pre-2025 projects deliberately carry no AI-first content; the absence is the contrast, and no marker is wanted.
- Known defects on the tracker: unknown project slugs return HTTP 200 (#82); the Work page's scrolling list is hidden from screen readers (#83).
- Undecided: whether project pages should link to live products or repositories for projects other than ZiphyCare, which is the only one with a link today.

## Brand Commitments

- Name: "rtmkvtn" as the wordmark and site identity; "Artem" on the home page.
- Role line: "AI-First Fullstack Engineer", the only AI modifier allowed anywhere in the identity. No "AI Engineer", no "agentic" or tool names beside it.
- Voice: short declaratives, specifics over adjectives, human-written. Approved copy lives in `docs/specs/ai-first-content-spec.md` and the locale files; it was written line by line and must not be regenerated.
- Existing visual language: a dark, editorial, architectural-minimalism system documented in `DESIGN.md` ("The Monolith"), already implemented across every surface. Future visual decisions are made in that context, not here.

## Evidence on Hand

- Six real projects with achievements, some quantified, in `public/content/projects/<slug>/project.json`, each with a `gallery/` folder. ZiphyCare has a public link; the others have none recorded.
- Two approved anchor figures: the Currency Exchange bookkeeping module took about two months from first shareholder conversation to production MVP; M-INVEST's CI/CD cut feature release time from several hours to 15 minutes.
- The team AI-first migration on Currency Exchange: two developers moved from ad-hoc AI tool use to repo-level agent config, shared skills and agents, spec-driven tickets, and a review rule for agent-written PRs. Outcome is qualitative only; no throughput or defect numbers exist and none may be invented.
- Research on how AI-first engineers present themselves, with a phrasing avoid-list, on the `research/ai-first-presentation` branch.
- Contact: email rtmkvtn@gmail.com, LinkedIn https://www.linkedin.com/in/rtmkvtn. The current code still carries the template placeholders `hello@studiomonolith.dev` and a `#` LinkedIn href; replace them with these.
- No testimonials, no client logos, no press, no public metrics beyond the two anchors above. Do not fabricate any.

## Product Principles

1. Evidence before labels. Every claim about method or skill points at a project, a figure, or a named practice; adjectives without backing are cut.
2. One AI modifier, carried by proof. The identity stays "AI-First Fullstack Engineer"; the proof lives in the two 2025 projects and About, never in stacked titles.
3. Honest contrast. Pre-2025 work stays as it was; the difference between then and now is shown, not apologised for.
4. Three locales, one source. English is written first and approved; Russian and Chinese follow it faithfully, with Latin kept for "AI-first" and tool names.
5. Scan first, read second. A screening reader must get the position from Home, Work, and Hard Skills alone; About rewards the ones who stay.

## Accessibility & Inclusion

No external standard is mandated. Known gap to close: the Work page's project list is entirely `aria-hidden` (#83). The design system's reliance on tonal contrast means text and ghost hairlines must stay legible on the dark surface across locales, including CJK glyphs via Noto Sans SC.
