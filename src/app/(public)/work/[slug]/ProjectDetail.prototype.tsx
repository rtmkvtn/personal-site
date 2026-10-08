"use client";

// PROTOTYPE for wayfinder ticket #71: three variants of a per-project
// "How it was built" block on the existing /work/[slug] route, switchable
// via ?variant=A|B|C. Throwaway; lives on a prototype branch after the decision.

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import type { Project } from "@/shared/config";
import { useLocalizedProject } from "@/shared/lib/i18n";
import { ProjectGallery } from "@/shared/ui/ProjectGallery";
import { ProjectVideo } from "@/shared/ui/ProjectVideo";
import { PrototypeSwitcher } from "@/shared/ui/PrototypeSwitcher/PrototypeSwitcher";
import base from "./page.module.scss";
import p from "./prototype.module.scss";

// Proposed ProjectJson field (localized in the real schema; en-only here).
interface AiFirstBlock {
  tools: string[];
  agentsOwned: string[];
  authorKept: string[];
  anchor: { value: string; label: string };
  note?: string;
}

const CURRENCY_EXCHANGE_AI_FIRST: AiFirstBlock = {
  tools: ["Claude Code", "Codex", "Custom skills & agents", "Claude Design"],
  agentsOwned: ["Implementation", "Tests", "CI", "Documentation"],
  authorKept: ["Architecture", "Specs & tickets", "Code review", "Service contracts"],
  anchor: { value: "2 mo", label: "Bookkeeping module, first shareholder conversation to production MVP" },
  note:
    "Started solo. When two developers joined, moved the team onto one AI-first workflow: repo-level agent config, shared skills and agents, spec-driven tickets, a review rule for agent-written PRs.",
};

const VARIANTS = [
  { key: "A", name: "Ledger plane" },
  { key: "B", name: "Marginalia" },
  { key: "C", name: "Method strip" },
];

type Localized = ReturnType<typeof useLocalizedProject>;

function Achievements({ project }: { project: Localized }) {
  if (project.achievements.length === 0) return null;
  return (
    <ul className={base.achievements}>
      {project.achievements.map((a) => (
        <li key={a}>{a}</li>
      ))}
    </ul>
  );
}

function Media({ project }: { project: Localized }) {
  return (
    <>
      {project.video && <ProjectVideo src={project.video} />}
      <ProjectGallery images={project.gallery} />
    </>
  );
}

/* A: a tonal plane between description and achievements, asymmetric two-column */
function VariantA({ project, ai }: { project: Localized; ai: AiFirstBlock }) {
  return (
    <main className={base.main}>
      <h1 className={base.title}>{project.name}</h1>
      <p className={base.description}>{project.description}</p>

      <section className={p.ledger}>
        <p className={p.label}>How it was built</p>
        <div className={p.ledgerGrid}>
          <p className={p.ledgerMethod}>
            AI-first. I specify and review; agents implement, test, and refactor.
            {ai.note && <> {ai.note}</>}
          </p>
          <dl className={p.ledgerList}>
            <dt>Tools</dt>
            <dd>{ai.tools.join(" · ")}</dd>
            <dt>Agents owned</dt>
            <dd>{ai.agentsOwned.join(" · ")}</dd>
            <dt>I kept</dt>
            <dd>{ai.authorKept.join(" · ")}</dd>
            <dt>Bookkeeping</dt>
            <dd className={p.ledgerAnchor}>
              {ai.anchor.value}
              <span className={p.ledgerAnchorLabel}>{ai.anchor.label}</span>
            </dd>
          </dl>
        </div>
      </section>

      <Achievements project={project} />
      <Media project={project} />
    </main>
  );
}

/* B: achievements left, a hairline-anchored aside on the far right */
function VariantB({ project, ai }: { project: Localized; ai: AiFirstBlock }) {
  return (
    <main className={`${base.main} ${p.wide}`}>
      <h1 className={base.title}>{project.name}</h1>
      <p className={base.description}>{project.description}</p>

      <div className={p.marginGrid}>
        <div>
          <Achievements project={project} />
        </div>
        <aside className={p.marginAside}>
          <p className={p.label}>How it was built</p>
          <p className={p.marginLine}>
            <span className={p.marginKey}>Method</span>
            Specify &amp; review by me. Implement, test, refactor by agents.
          </p>
          <p className={p.marginLine}>
            <span className={p.marginKey}>Tools</span>
            {ai.tools.join(", ")}
          </p>
          <p className={p.marginLine}>
            <span className={p.marginKey}>Team</span>
            Solo start, then a two-developer team on one shared AI-first workflow.
          </p>
          <p className={p.marginLine}>
            <span className={p.marginKey}>{ai.anchor.value}</span>
            {ai.anchor.label}
          </p>
        </aside>
      </div>

      <Media project={project} />
    </main>
  );
}

/* C: a horizontal four-step method strip with the anchor as a display number */
function VariantC({ project, ai }: { project: Localized; ai: AiFirstBlock }) {
  const steps = [
    { who: "Me", what: "Specify", detail: "Architecture, specs, tickets, service contracts" },
    { who: "Agents", what: "Implement", detail: ai.tools.slice(0, 2).join(" & ") + ", custom skills and agents" },
    { who: "Agents", what: "Verify", detail: "Tests, CI, documentation" },
    { who: "Me", what: "Review", detail: "Every agent-written PR against one checklist" },
  ];
  return (
    <main className={base.main}>
      <h1 className={base.title}>{project.name}</h1>
      <p className={base.description}>{project.description}</p>
      <Achievements project={project} />

      <section className={p.strip}>
        <div className={p.stripHead}>
          <p className={p.label}>How it was built</p>
          <p className={p.stripAnchor}>
            <span className={p.stripAnchorValue}>{ai.anchor.value}</span>
            <span className={p.stripAnchorLabel}>{ai.anchor.label}</span>
          </p>
        </div>
        <ol className={p.stripSteps}>
          {steps.map((s, i) => (
            <li key={s.what} className={p.stripStep}>
              <span className={p.stripIndex}>{String(i + 1).padStart(2, "0")}</span>
              <span className={p.stripWho}>{s.who}</span>
              <span className={p.stripWhat}>{s.what}</span>
              <span className={p.stripDetail}>{s.detail}</span>
            </li>
          ))}
        </ol>
        {ai.note && <p className={p.stripNote}>{ai.note}</p>}
      </section>

      <Media project={project} />
    </main>
  );
}

function Inner({ project: raw }: { project: Project }) {
  const project = useLocalizedProject(raw);
  const variant = useSearchParams().get("variant") ?? "A";
  const ai = CURRENCY_EXCHANGE_AI_FIRST;
  return (
    <>
      {variant === "A" && <VariantA project={project} ai={ai} />}
      {variant === "B" && <VariantB project={project} ai={ai} />}
      {variant === "C" && <VariantC project={project} ai={ai} />}
      <PrototypeSwitcher variants={VARIANTS} current={variant} />
    </>
  );
}

export function ProjectDetailPrototype({ project }: { project: Project }) {
  return (
    <Suspense>
      <Inner project={project} />
    </Suspense>
  );
}
