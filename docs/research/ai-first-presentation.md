# How AI-first engineers present their method in 2026 portfolios and CVs

Research for [#70](https://github.com/rtmkvtn/personal-site/issues/70), part of the
[AI-first content rewrite map (#67)](https://github.com/rtmkvtn/personal-site/issues/67).
Researched 2026-10-07. Vocabulary follows `GLOSSARY.md`: *AI-first development* is a
claim about how the work was done, never about what the product does; *team AI-first
migration* is moving a team from ad-hoc AI tool use to one shared workflow.

## Short answer

Credible AI-first engineers in 2026 keep the identity conventional and put the method in
evidence. Nobody senior whose method is widely respected (Willison, Hashimoto, Ball, Beck,
Ronacher) carries an AI prefix in their bio; they show a dated workflow write-up, a share of
code they no longer type, and a stated rule of accountability ("I won't commit code I
couldn't explain"). The vocabulary that has won among practitioners is **agentic
engineering** (Karpathy, Feb 2026; adopted by Willison); the safe institutional term is
**AI-assisted**; **AI-native** is the dominant form in job titles; **AI-first** is used
mainly by employers and carries a residual "replace people" connotation from the 2025
Duolingo and Shopify memos.

Hiring managers read **"AI engineer"** as *builds LLM features* and now distrust it without
shipped, quantified systems. They read **"AI-first / AI-native engineer"** as *uses coding
agents as the primary workflow*, which in 2026 is a baseline (95% of engineers use AI
weekly; 66% use coding agents), so the label alone is a tiebreaker at best. What they
actually probe is the method: how you specify, what the agent got wrong, how you verified
it, and whether you can show a public artifact.

**"AI-First Fullstack Engineer" has traction as a job-posting title, not as a
self-headline.** It exists verbatim or near-verbatim in roughly half a dozen postings
(WorkFlex, OnFrontiers, Jobgether, JobLeads, hh.ru, DATASEC) against ~15,000 "AI Engineer"
postings; the more common form is "Fullstack Software Engineer (AI-Native)". No source
praises it as a self-applied headline; several mock stacked AI prefixes. It is defensible
on this site only because the About surface and the two 2025 projects back it with
evidence, and because the standing decision rules out "AI Engineer".

## Evidence

### 1. Adoption: agentic coding is the norm, so the label is not the differentiator

- Stack Overflow Developer Survey 2026 (6 Oct 2026, 30k+ respondents): 66% use coding
  agents (31% in 2025); 73% of users daily; Claude Code 66%, Copilot 59%; trust is
  conditional, 48% trust AI "when they can easily validate the answers".
  https://survey.stackoverflow.co/2026/ai
- Stack Overflow pulse "Agents on a leash" (27 May 2026): "63% of technologists still
  rarely or never let agents run entirely on autopilot".
  https://stackoverflow.blog/2026/05/27/agents-on-a-leash-agentic-ai-remains-mostly-monitored-at-work/
- JetBrains "AI Coding Agents: Adoption Trends" (Aug 2026, 15k devs): 90% use agents at
  least weekly, 68% daily; Claude Code 39%.
  https://blog.jetbrains.com/research/2026/08/ai-coding-agent-adoption-2026/
- JetBrains State of Developer Ecosystem 2025: "68% expect employers to require
  proficiency in AI tools"; "Often, AI use isn't systematized. Developers are just using
  it ad hoc." https://devecosystem-2025.jetbrains.com/artificial-intelligence
  (This ad-hoc baseline is exactly what a team AI-first migration fixes.)
- Pragmatic Engineer, "AI Tooling for Software Engineers in 2026" (Mar 2026, n=906): 95%
  use AI weekly; 75% use it for at least half their work; 55% regularly use agents; Claude
  Code "most loved tool at 46%". https://newsletter.pragmaticengineer.com/p/ai-tooling-2026
- DORA 2025 "State of AI-assisted Software Development": 90% use AI at work; "AI doesn't
  fix a team; it amplifies what's already there." DORA uses *AI-assisted*, never
  *AI-first*. https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report
- METR (Jul 2025 RCT, Feb 2026 update): early-2025 developers were 19% slower with AI
  while believing they were 20% faster; by early 2026 returning developers trend ~18%
  faster (not significant). A reason to quote outcomes, not speed multipliers.
  https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
  https://metr.org/blog/2026-02-24-uplift-update/

### 2. First-party definitions describe a method, never a title

- Anthropic, "How AI is transforming work at Anthropic" (2 Dec 2025): engineers describe
  themselves as "manager[s] of AI agents"; one shifted "70%+ to being a code
  reviewer/reviser rather than a net-new code writer"; employees "fully delegate" only
  0-20% of work. https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic
- Anthropic, "2026 Agentic Coding Trends Report": "being a software engineer increasingly
  means orchestrating agents that write code, evaluating their output, providing strategic
  direction"; value shifts to "system architecture design, agent coordination, quality
  evaluation, and strategic problem decomposition". Zero occurrences of "AI-first" or
  "AI-native" in the PDF.
  https://resources.anthropic.com/hubfs/2026%20Agentic%20Coding%20Trends%20Report.pdf
- Anthropic / Fiona Fung, "Running an AI-native engineering org" (3 Jun 2026): "By default,
  every commit is Claude-assisted"; de-emphasises "raw throughput; the models handle that".
  https://claude.com/blog/running-an-ai-native-engineering-org
- OpenAI, "The Shift to Agentic AI: Evidence from Codex" (Jun 2026): the user "delegates,
  monitors, reviews, and coordinates multiple streams of work"; >10% of users run three or
  more concurrent agents weekly. Zero occurrences of "AI-first"/"AI-native".
  https://cdn.openai.com/pdf/5d1e1489-21c0-43e4-9d42-f87efdbf0082/the-shift-to-agentic-ai-evidence-from-codex.pdf
- Thoughtworks Radar: "Complacency with AI-generated code" has been on **Hold** since
  Oct 2024 through Nov 2025; vibe coding defined as letting AI generate "with minimal
  review". https://www.thoughtworks.com/en-us/radar/techniques/complacency-with-ai-generated-code

### 3. How respected practitioners present it

| Who | Bio / headline carries AI wording? | Method wording | Evidence attached |
|---|---|---|---|
| Simon Willison | No (GitHub bio plain) | "responsible AI-assisted programming" (2025); "agentic engineering" (2026-02-23 update) | 238 tools, each with a linked LLM transcript; "95% of the code that I produce, I didn't type myself" |
| Mitchell Hashimoto | No | "I'm not shipping code I don't understand" | 16 full agent-session transcripts, $15.98 of tokens; Ghostty `AI_POLICY.md` requires naming the tool and "the extent that the work was AI-assisted" |
| Thorsten Ball | No ("co-founder and co-creator of Amp") | "paint-by-numbers programming: I put in the numbers and the lines and the agent then goes and puts in the colors" | "Amp now writes 70-80% of the code I commit" |
| Kent Beck | No | "augmented coding": "you care about the code, its complexity, the tests, & their coverage" | "more consequential programming decisions per hour" |
| Armin Ronacher | No | "an engineering lead to a virtual programmer intern"; "I want to understand the code I ship" | Claude Code "almost entirely hands-off" |
| Peter Steinberger | Yes ("Came back from retirement to mess with AI"; "Polyagentmorous builder") | "the no-bs Way of Agentic Engineering"; "I ship code I don't read" | 3-8 agents in parallel; ~300k lines TS; public commit volume |
| Geoffrey Huntley | Yes ("i created the 'ralph loop'") | "There is no way this is possible without senior expertise guiding Ralph" | "$50k contract delivered for $297 USD" |
| Kieran Klaassen (Every) | Yes, as title: "Compound Engineer" | Plan / Work / Review / Compound; "The engineer reviews the output itself and the lessons learned" | 25k-star plugin |
| Birgitta Böckeler (Thoughtworks) | Yes, as title: "AI-First Software Delivery Lead" / "Distinguished Engineer for AI-assisted Software Delivery" | "The basics are all automated, but human engineers supervise and adjust the results" | martinfowler.com memos |
| Boris Cherny (Claude Code) | No ("Head of Applications @Anthropic") | "I haven't written a line of code by hand in ... eight months" | 22-27 PRs/day, "100% written by Claude" |

Sources: https://simonwillison.net/2025/Mar/19/vibe-coding/ ·
https://simonwillison.net/2025/Oct/7/vibe-engineering/ ·
https://simonw.substack.com/p/agentic-engineering-patterns ·
https://tools.simonwillison.net/colophon ·
https://mitchellh.com/writing/non-trivial-vibing ·
https://ampcode.com/how-i-use-amp ·
https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes ·
https://lucumr.pocoo.org/2025/6/4/changes/ · https://lucumr.pocoo.org/2026/6/23/the-coming-loop/ ·
https://steipete.me/posts/just-talk-to-it ·
https://newsletter.pragmaticengineer.com/p/the-creator-of-clawd-i-ship-code ·
https://ghuntley.com/ralph/ · https://github.com/ghuntley ·
https://every.to/chain-of-thought/compound-engineering-how-every-codes-with-agents ·
https://www.thoughtworks.com/en-de/profiles/b/birgitta-bockeler ·
https://newsletter.pragmaticengineer.com/p/mitchell-hashimoto

The one-line division of labour that gets quoted most, Hashimoto (Feb 2026): "If I'm
coding, I want an agent planning. If they're coding, I want to be reviewing."

Karpathy's definition (X, Feb 2026; primary returned 402, quote consistent across three
secondary sources): "Agentic because the new default is that you are not writing the code
directly 99% of the time, you are orchestrating agents who do and acting as oversight.
Engineering because there is an art and science and expertise to it."

Willison's distancing line (19 Mar 2025): "If an LLM wrote the code for you, and you then
reviewed it, tested it thoroughly and made sure you could explain how it works to someone
else that's not vibe coding, it's software development."

### 4. Job postings: what "AI-first" and "AI-native" mean to employers

- **Proton.ai, "Fullstack Software Engineer (AI-Native)"** (Greenhouse, verified
  2026-10-07): "Every engineer at Proton uses Claude Code (and other agentic dev tools) as a
  first-class collaborator." / "You're an AI-native operator, not a code writer." / "with
  AI doing the typing and you doing the thinking." / wants "Resume-level hands-on
  experience, not LLM-generated portfolios."
  https://job-boards.greenhouse.io/protonai/jobs/5994707004
- **Life360, "Senior Software Engineer II (AI Native)"**: "your primary workflow involves
  orchestrating agents to create specs, generate results, and perform reviews"; "AI isn't
  just a tool we use — it's how we work."
  https://job-boards.greenhouse.io/life360/jobs/8841875002
- **WorkFlex, "Full Stack Software Engineer - AI-First (Java, Angular)"**: "You are the
  orchestrator who guides the AI"; also "prompt-engineering your way to 10x productivity"
  (the buzzword tell). https://careers.workflex.com/jobs/3441198-full-stack-software-engineer-ai-first-java-angular
- **OnFrontiers, "Software Engineer, Full-Stack (AI-First)"**: "Work AI-first: pair with
  Claude and our internal tooling to design, write, test, and review code".
  https://www.builtinnyc.com/job/software-engineer-full-stack-ai-first/10028911
- **Pattern, "Senior Software Engineer, AI"** (Lever): "Work agentically"; to stand out,
  show "how you already use agentic coding tools in your daily work and how you review and
  verify what they produce". https://jobs.lever.co/pattern/20498a77-c08b-4fdb-95a8-61a1437ad40a
- **ID.me, new-grad SWE II**: requires an "AI-native development workflow" with "daily,
  hands-on use of AI coding tools (e.g., Claude Code, Cursor, Copilot)" and "the ability to
  critically evaluate AI-generated code". https://job-boards.greenhouse.io/idme/jobs/8011089003
- **DATASEC (Germany), "AI-first Developer (m/w/d)"**: "Du bist kein klassischer Entwickler
  mehr, der Zeile für Zeile tippt – du orchestrierst." / "gerade weil AI-generierter Code
  ein scharfes Review braucht".
  https://www.karriere-suedwestfalen.de/stellenangebot/ai-first-developer-plattform-modernization-837403
- **hh.ru (Russia), "AI-First разработчик (Vibe Coding)"** (Feb 2026).
  https://hh.ru/vacancy/130404276
- **YC Work at a Startup**: VOYGR wants "AI-native – you push Claude Code, Cursor, or
  similar tools hard, and you have the taste to know when the output is good and when it's
  not"; Huscarl wants a "track-record building with AI tools and managing multiple coding
  sessions". https://www.ycombinator.com/companies/voygr/jobs/FYeofGm-founding-product-engineer
  · https://www.ycombinator.com/companies/huscarl/jobs/fQTxjSs-member-of-technical-staff-paris
- **Scale of the title**: ~6 literal "AI-First full-stack" titles found vs ~14,800
  "AI engineer" jobs on Glassdoor US (snippet, Oct 2026); ~15 "(AI-Native)" titles on
  Greenhouse/Ashby/Lever (Proton, Life360, PALO IT, Tread, Accenture, JTI, Kognitos ...).
- **The Hiring Brief**, 37,920 public-company postings (Apr-May 2026): only 14.6% mention
  any AI tool; "Agentic AI" mentioned in 8%, required in 0.1%; AI fluency is "a tiebreaker,
  not a barrier". https://thehiringbrief.substack.com/p/what-ai-native-actually-means-in
- **Indeed Hiring Lab** (8 Jul 2026): US software postings grew ~15% since Claude Code
  launched while all postings fell 7%; "37% is due to jobs that mention AI in their title".
  https://hiringlab.indeed.com/2026/07/08/ai-and-job-postings-from-destruction-to-creation/

### 5. Hiring-manager and CTO reading of the labels

- **Ivan Turković, CTO, "AI Job Titles in 2026: A CTO's Guide to the Naming Chaos"**
  (24 Apr 2026, verified): "stop collecting titles like Pokémon. Nobody senior is
  impressed. The best engineer I hired last year had 'Software Engineer' on her LinkedIn
  and shipped three production LLM systems." Headline mocked: "AI-Native Vibe Engineer |
  Builder | Forward-Deployed Agentic Context Architect". His reference guide files
  "AI-Assisted / AI-Augmented / AI-Native Developer" as a **skill, not a title**, and "AI
  Engineer" as "Builds AI-powered application features ... The default general-purpose
  title for production LLM work in 2026."
  https://www.ivanturkovic.com/2026/04/24/ai-job-titles-2026-naming-chaos/ ·
  https://www.ivanturkovic.com/the-ai-job-title-reference-guide-2026/
- **HN "Ask HN: What Is an 'AI Engineer'?"** (~Jun 2026): "You don't title yourself after
  your tools." / "You don't call someone who integrates the Twilio API a 'Twilio
  Engineer'." / simonw: "AI Engineer: builds software using LLMs" vs "Agentic Engineer:
  uses AI coding agents." https://news.ycombinator.com/item?id=48312377
- **HN "Ask HN: What's a good title for a software engineer now?"** (~1 Oct 2026): "Software
  engineer. Put the AI stuff in the bullet points." https://news.ycombinator.com/item?id=49916803
- **Pragmatic Engineer, "Tech jobs market in 2026, part 3"** (7 Jul 2026): UK head of eng
  sees candidates "rebranding themselves as senior AI Engineers" with "RAG, evals,
  inference" keywords and no substance; Berlin EM: "CVs are high-quality, but the people
  behind them are not." https://newsletter.pragmaticengineer.com/p/tech-jobs-market-in-2026-part-3-hiring
- **Pragmatic Engineer, "The state of the tech industry in 2026"** (6 Oct 2026): a Series D
  director: "AI positivity was something we started to screen for in our hiring process."
  https://newsletter.pragmaticengineer.com/p/the-state-of-the-tech-industry-in
- **Augment Code, "How we hire AI-native engineers now"** (12 Mar 2026): "The human role is
  shifting from author to architect and editor"; assesses "Agent Leverage" (can they direct
  and validate AI-generated work). https://www.augmentcode.com/blog/how-we-hire-ai-native-engineers-now
- **Metaview on the Shopify memo** (Apr 2025): don't accept "I use AI every day"; probe
  "what the AI missed", how output was verified, and where human judgment stayed.
  https://www.metaview.ai/resources/blog/ai-baseline-shopify-memo-hiring-process
- **Uplers** (23 Jul 2026): "AI Engineer builds the AI; AI-native engineer builds with AI."
  Interview probe: "What did the AI get wrong, and how did you catch it?" Red flags:
  "unexplained fast delivery". https://www.uplers.com/article/the-guide-to-hiring-ai-native-engineers/
- **Cursor's own hiring** (Jun 2025): "hired lots of people who are fantastic programmers who
  actually have no experience with AI tools". The leading AI editor does not screen on
  tool fluency. https://www.aol.com/inside-cursors-hiring-strategy-no-052015324.html
- **Zapier AI Fluency rubric** (Wade Foster, 2025-2026): "Adoptive: I orchestrate AI and
  build systems that elevate how I work"; "Transformative: I re-engineer how work happens."
  https://x.com/wadefoster/status/1930680089651425452
- **Joberney** (4 Aug 2026): "Recruiters reward AI skills. They distrust AI authorship."
  Cites Schilke & Reimann: disclosing that a model did the work is trusted less "holding
  the quality of the work constant". Mocked: "Vibe coded a full-stack SaaS app using
  Claude Code and Next.js". https://joberney.com/blog/vibe-coding-on-resume
- **Nate B. Jones, "The AI Resume Survival Guide"** (7 Dec 2025): credible bullets follow
  Tool + Task + Outcome + Context. https://natesnewsletter.substack.com/p/the-ai-resume-survival-guide-for-72f
- **HireHi.ru** (Russian market, Mar/Aug 2026): credible: "Стандартизировал работу команды с
  AI-инструментами, ввел промпт-шаблоны и регламент проверки"; avoid "AI полностью пишет за
  меня код", "в 5 раз быстрее благодаря AI" without context.
  https://hirehi.ru/blog/reziume-razrabotchika-2026-kak-opisat-ai-instrumenty-i-ne-poluchit-otkaz

### 6. The "AI-first" connotation problem

- **Tim O'Reilly, "AI First Puts Humans First"** (28 May 2025): prefers "AI native"
  because in the press "AI first" has come to mean "using AI to replace people".
  https://www.oreilly.com/radar/ai-first-puts-humans-first
- **Duolingo "AI-first" memo** (28 Apr 2025) and the walk-back (23 May 2025); Duolingo later
  dropped AI usage from reviews. https://www.prdaily.com/the-scoop-duolingo-ceo-walks-back-ai-first-memo/
- **Shopify** (7 Apr 2025): "Reflexive AI usage is now a baseline expectation";
  **Microsoft** (Jun 2025): "using AI is no longer optional"; **Coinbase** (Aug 2025) fired
  engineers who did not onboard; **Meta** added "AI-driven impact" to 2026 reviews then
  dropped it in Sep 2026 after "tokenmaxxing". Mandates peaked in 2025 and partially
  reversed in 2026, so a 2026 reader treats AI usage as a given and output quality as the
  signal. https://www.digitalcommerce360.com/2025/04/08/internal-memo-shopify-ceo-declares-ai-non-optional/ ·
  https://techcrunch.com/2025/08/22/coinbase-ceo-explains-why-he-fired-engineers-who-didnt-try-ai-immediately ·
  https://the-decoder.com/meta-drops-ai-usage-from-engineer-performance-reviews-after-tokenmaxxing-backfires/
- **Blind** (Jul 2025): some senior engineers read employer "AI-first" as a red flag.
  https://www.teamblind.com/post/interviewing-approach-in-2025-k4ocmow6

## Phrasings that work

Each comes with who uses it or endorses it. All are compatible with the glossary's
definition of AI-first development.

**Division of labour (the core sentence of the method)**

- "I architect and review, agents execute." (HN candidate, Jul 2026)
- "AI does the typing, I do the thinking." (Proton.ai posting; near-verbatim)
- "If I'm coding, I want an agent planning. If they're coding, I want to be reviewing."
  (Hashimoto)
- "I specify and review; agents implement, test, and refactor." (direct restatement of the
  glossary definition, matches every source above)
- "I don't type the code" rather than "I don't understand the code." (the line Willison,
  Hashimoto, Ronacher all draw)

**Accountability (the credibility guard every respected practitioner adds)**

- "I won't commit any code to my repository if I couldn't explain exactly what it does to
  somebody else." (Willison)
- "Every line is reviewed; nothing ships that I can't explain." (restatement)
- "Human-in-the-loop on every merge." (Ghostty policy wording)

**Quantified share, always paired with review**

- "95% of the code I produce, I didn't type myself." (Willison)
- "Amp now writes 70-80% of the code I commit." (Ball)
- "X% of merged PRs agent-authored, 100% human-reviewed." (Honeycomb / Karpathy 80-20 style)

**Achievement bullets (Tool + Task + Outcome + Context)**

- "Reduced API integration turnaround from 3 days to 4 hours by directing Claude Code
  agents to scaffold, implement, and test endpoint wrappers against live specifications."
  (techncv example, 2026)
- "Built and shipped a booking tool now used by 3 local studios; replaced a shared
  spreadsheet that was double-booking roughly 6 slots a week." (Joberney's "claim the
  build, not the tool")
- "Shipped solo what previously took a small team" is the outcome form of the glossary
  definition; attach the scope (modules, request volume, environments) as in the existing
  Currency Exchange achievements.

**Team AI-first migration**

- "Moved an N-engineer team from ad-hoc AI tool use to one shared agentic workflow
  (repo-level CLAUDE.md, spec templates, agent-PR review checklist)." (synthesis consistent
  with HireHi.ru, ResumeOptimizerPro, Zapier rubric)
- "Standardized the team's AI-tool workflow; introduced prompt templates and a verification
  protocol." (HireHi.ru, translated)
- "Led adoption of Claude Code across a 15-person backend team, establishing prompt
  engineering guidelines and AI code review standards, increasing team PR throughput by 55%
  while maintaining zero regression in production defect rate." (ResumeOptimizerPro example)
- Employer-side verbs to mirror: "orchestrate", "re-engineer how work happens" (Zapier);
  "agentic workflow"; "spec-driven" (JTI, Osmani, Böckeler).
- Avoid "AI transformation lead" / "AI enablement" as self-titles: consulting and HR
  vocabulary, absent from engineer-credible sources.

**Evidence to attach (what postings and practitioners actually show)**

- A public repo with the workflow artifacts: `CLAUDE.md`, rules, spec/plan templates
  (Harper Reed's `spec.md` / `prompt_plan.md` / `todo.md`; INDATA requires "a public project
  demonstrating actual use of Claude Code").
- A dated workflow write-up ("How I ..."), the format Willison, Ball, Ronacher, Steinberger,
  Hashimoto all use.
- Commit history showing iteration, "not a single AI-dump commit" (matchresume.ai).
- Numbers: share of code not typed, agents run in parallel, PR counts, cost.

## Phrasings to avoid

- **Stacked AI prefixes in the headline**: "AI-Native Vibe Engineer | Builder |
  Forward-Deployed Agentic Context Architect" (Turković). Rule: at most one modifier.
- **"AI Engineer" for agent use**: "You don't title yourself after your tools" (HN);
  "rebranding themselves as senior AI Engineers" is a named red flag (Pragmatic Engineer).
  Also outside this site's scope by standing decision.
- **"Prompt Engineer", "AI builder"** as self-titles (Nate Jones; "a yellow flag in 2026").
- **"Vibe coded ..."** for anything reviewed or shipped to users (Willison, Beck,
  Hashimoto, Joberney; Stack Overflow 2025: 77% say vibe coding is not part of their
  professional work). The glossary already lists it under *Avoid*.
- **Tool-as-headline bullets**: "Used AI tools to write code faster", "Built a web app with
  Claude Code" (matchresume.ai). Tools belong in the stack, outcomes in the achievement.
- **Tools under Skills with no context**: listing "Copilot" or "ChatGPT" "tells them nothing
  useful and signals inflation" (Arslan Ahmad); "like listing Microsoft Word in 2010".
- **Autonomy and speed boasts**: "AI writes all my code", "10x productivity", "5x faster"
  with no context (HireHi.ru; WorkFlex's own "10x" line reads as the weak part of the
  posting; METR shows self-reported speedups are unreliable). "Unexplained fast delivery"
  is an interview red flag (Uplers).
- **Exploration verbs**: "exploring ChatGPT", "experimenting with LLMs", "exploring the
  potential of AI to transform workflows" (Nate Jones).
- **Generic slop vocabulary**: "leverage", "synergize", "results-driven", "ninja/guru".
- **AI-feature language for a product that has none**: "AI-powered", "AI integration",
  "AI usage" (glossary *Avoid* list; "AI-powered" is also the main trend-chasing tell in
  the Pragmatic Engineer hiring-manager quotes).
- **AI-written prose anywhere on the site**: "seemingly AI-generated profiles" are binned
  on sight (Orosz, Apr 2025; Proton: "not LLM-generated portfolios").

## Recommendation on the role line "AI-First Fullstack Engineer"

Keep it, with two conditions. The evidence shows "AI-First Fullstack Engineer" is a live,
understood job-posting title (WorkFlex, OnFrontiers, Jobgether, JobLeads, DATASEC, hh.ru)
that employers define exactly as the glossary does (orchestrate, specify, review), and it is
not "AI Engineer", so a hiring manager who knows the split will read it as a method claim
rather than a product claim. It is nonetheless rarer than "Fullstack Engineer (AI-Native)",
it carries O'Reilly's "replace people" overtone for non-engineer readers, and the engineers
who are most respected for the method leave their bio plain and prove it elsewhere.
So: first, the role line must be the only AI modifier anywhere in the identity (no
"agentic", "AI-native", or tool names next to it), it stays one line under the name as the
glossary defines, and the site metadata title in `src/app/layout.tsx` follows it. Second,
it is only credible because the About surface states the division of labour in one
sentence ("I specify and review; agents implement, test, and refactor") plus one
accountability sentence, and because the Currency Exchange and M-INVEST achievements carry
the outcome evidence (solo scope, the team AI-first migration, numbers) with Claude Code in
the stack rather than in the headline. If a later session wants a safer variant, the
closest alternatives with the same meaning are "Fullstack Engineer, AI-first" (modifier
after the noun, the form candidates actually use on HN) and "Agentic Fullstack Engineer"
(Karpathy/Willison vocabulary, still unusual as a title). "AI-Native Fullstack Engineer"
would match more postings but conflicts with the glossary term and with the decision
already taken on #67.

## Gaps and unverified items

- Karpathy's Feb 2026 "agentic engineering" post: primary returned HTTP 402; wording is
  consistent across three secondary sources.
- Reddit threads (r/cscareerquestions, r/ExperiencedDevs) could not be fetched; no
  upvoted comments quoted.
- LinkedIn headlines for Osmani and Cherny are behind a login wall; only search snippets.
- Pragmatic Engineer "impact of AI on software engineers 2026" hiring section is paywalled.
- "17M agent PRs/month on GitHub" and "42% of software JDs mention AI skills" circulate
  online with no primary source; not used.
- No Dutch or Chinese market sentiment found beyond generic listings (one Chinese
  "AI效率工程师" posting seeking Cursor/Claude Code heavy users, no fetchable URL).
- No top-tier engineering-leader blog gives a verbatim "led the team's AI-first migration"
  bullet; the examples above come from resume-industry and Russian-market sources plus
  employer rubrics.
