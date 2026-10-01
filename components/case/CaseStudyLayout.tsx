import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Info, ShieldCheck } from "lucide-react";
import type { CaseStudy } from "@/data/types";
import { Breadcrumbs } from "@/components/case/Breadcrumbs";
import { CaseSection } from "@/components/case/CaseSection";
import { NextProject } from "@/components/case/NextProject";
import { DevTodo } from "@/components/DevTodo";
import { ProcessDiagram } from "@/components/ProcessDiagram";
import { Tag } from "@/components/Tag";
import { Reveal } from "@/components/motion/Reveal";
import { CaseVisual } from "@/components/visuals/CaseVisual";
import { McdaFigure } from "@/components/visuals/McdaFigure";

interface Props {
  project: CaseStudy;
  next: CaseStudy;
}

export function CaseStudyLayout({ project, next }: Props) {
  const outcomeLabel = project.outcome.heading;
  const sections = [
    { id: "challenge", label: "The challenge" },
    { id: "role", label: "My role" },
    { id: "approach", label: "Approach" },
    { id: "methods", label: "Methods & tools" },
    { id: "analysis", label: "Analysis" },
    { id: "outcome", label: outcomeLabel },
    ...(project.deliverables.length ? [{ id: "deliverables", label: "Key deliverables" }] : []),
    { id: "learned", label: "What I learned" },
  ];
  const n = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const meta = [
    { label: "Organization", value: project.organization + (project.organizationNote ? ` — ${project.organizationNote}` : "") },
    { label: "Project type", value: project.category },
    { label: "Year", value: project.year },
    { label: "My role", value: project.role },
    ...(project.team ? [{ label: "Team", value: project.team }] : []),
  ];

  return (
    <article>
      {/* Header */}
      <header className="container-page pt-8 md:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Work", href: "/#work" },
              { label: project.organization },
            ]}
          />
          <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-ink">
            <ArrowLeft size={15} strokeWidth={1.75} aria-hidden />
            <span className="link-underline">Back to work</span>
          </Link>
        </div>

        <div className="mt-12 md:mt-20">
          <p className="label animate-rise">{project.category}</p>
          <h1 className="mt-5 text-5xl leading-[0.95] font-medium tracking-[-0.045em] text-ink sm:text-7xl lg:text-8xl">
            {project.organization}
          </h1>
          {project.organizationNote && (
            <p className="mt-3 text-lg text-muted sm:text-xl">{project.organizationNote}</p>
          )}
          {project.website && (
            <a
              href={project.website.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
            >
              <span className="link-underline">{project.website.label}</span>
              <ArrowUpRight size={15} strokeWidth={1.75} aria-hidden />
            </a>
          )}
          <p className="animate-rise mt-8 max-w-3xl text-xl leading-snug text-ink-2 [animation-delay:100ms] sm:text-2xl">
            {project.summary}
          </p>
        </div>

        <dl
          className={`mt-12 grid grid-cols-2 gap-px border-t border-ink bg-line ${
            meta.length > 4 ? "md:grid-cols-5" : "md:grid-cols-4"
          }`}
        >
          {meta.map((m) => (
            <div key={m.label} className="bg-paper py-4 pr-4 pl-4 max-md:odd:pl-0 md:py-5 md:first:pl-0">
              <dt className="label">{m.label}</dt>
              <dd className="mt-2 text-[0.95rem] font-medium text-ink">{m.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-start gap-3 border-y border-line py-4 text-sm">
          <Info size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" aria-hidden />
          <p className="text-ink-2">
            <span className="font-medium text-ink">{project.context.label}.</span>{" "}
            {project.context.type === "academic"
              ? "Carried out as a student consultant within the HBO-ICT programme — not as an employee of the organization."
              : "Early-stage company; no client results are presented."}
          </p>
        </div>
      </header>

      {/* Visual */}
      <div className="container-page mt-10 md:mt-14">
        <figure>
          <div className="bg-grid flex items-center justify-center border border-line bg-surface px-4 py-10 sm:px-10 sm:py-16">
            <CaseVisual name={project.visual} className="max-w-2xl" />
          </div>
          <figcaption className="mt-3 text-sm text-muted">
            Recreated abstract diagram of the problem space — not an internal document or system.
          </figcaption>
        </figure>
      </div>

      {/* Body */}
      <div className="container-page mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <p className="label !text-ink">On this page</p>
            <ol className="mt-4 space-y-2 text-sm">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="group flex gap-3 text-muted transition-colors hover:text-ink">
                    <span className="font-mono text-xs leading-5">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>
            {project.confidential && (
              <p className="mt-10 flex gap-2 border-t border-line pt-4 text-xs leading-relaxed text-muted">
                <ShieldCheck size={14} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
                Details simplified or anonymised for confidentiality.
              </p>
            )}
          </nav>
        </aside>

        <div className="min-w-0 lg:col-span-9">
          {project.confidential && (
            <Reveal className="mb-16 flex gap-3 border-l-2 border-accent bg-accent-soft/60 p-5 text-sm leading-relaxed text-ink-2">
              <ShieldCheck size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent" aria-hidden />
              <p>
                Certain details and visuals have been simplified or anonymised to respect project confidentiality.
              </p>
            </Reveal>
          )}

          <DevTodo items={project.todos} title="Open questions for this case" />

          <CaseSection id="challenge" index={n("challenge")} title="The challenge">
            {project.challenge.map((p, i) => (
              <p key={i} className={i === 0 ? "text-xl leading-snug text-ink sm:text-2xl" : ""}>
                {p}
              </p>
            ))}
          </CaseSection>

          <CaseSection id="role" index={n("role")} title="My role">
            {project.roleDescription.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </CaseSection>

          <CaseSection id="approach" index={n("approach")} title="Approach" wide>
            <ProcessDiagram steps={project.approach} />
          </CaseSection>

          <CaseSection id="methods" index={n("methods")} title="Methods & tools">
            <ul className="flex flex-wrap gap-2">
              {project.methods.map((m) => (
                <li key={m}>
                  <Tag>{m}</Tag>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection id="analysis" index={n("analysis")} title="Analysis">
            <div className="space-y-10">
              {project.analysis.map((block) => (
                <div key={block.heading}>
                  <h3 className="text-lg font-medium tracking-tight text-ink">{block.heading}</h3>
                  <div className="mt-3 space-y-4">
                    {block.body.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              ))}
              {project.mcdaAlternatives && <McdaFigure alternatives={project.mcdaAlternatives} />}
            </div>
          </CaseSection>

          <CaseSection id="outcome" index={n("outcome")} title={outcomeLabel}>
            <div className="border border-ink bg-surface">
              <div className="p-6 sm:p-8">
                <p className="text-xl leading-snug font-medium tracking-tight text-ink sm:text-2xl">
                  {project.outcome.summary}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {project.outcome.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-ink" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex gap-2.5 border-t border-line bg-paper px-6 py-4 text-sm text-muted sm:px-8">
                <Info size={15} strokeWidth={1.75} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  <span className="font-medium text-ink">Status: </span>
                  {project.outcome.status}
                </span>
              </p>
            </div>
          </CaseSection>

          {project.deliverables.length > 0 && (
            <CaseSection id="deliverables" index={n("deliverables")} title="Key deliverables">
              <ol className="grid gap-px border border-line bg-line sm:grid-cols-2 sm:[&>li:last-child:nth-child(odd)]:col-span-2">
                {project.deliverables.map((d, i) => (
                  <li key={d} className="flex items-baseline gap-4 bg-paper p-5">
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-medium text-ink">{d}</span>
                  </li>
                ))}
              </ol>
            </CaseSection>
          )}

          <CaseSection id="learned" index={n("learned")} title="What I learned">
            <div className="grid gap-8 sm:grid-cols-2">
              {project.learnings.map((l) => (
                <div key={l.heading} className="border-t border-line pt-5">
                  <h3 className="text-lg font-medium tracking-tight text-ink">{l.heading}</h3>
                  {l.body.map((p, i) => (
                    <p key={i} className="mt-3 text-[0.98rem]">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </CaseSection>
        </div>
      </div>

      <NextProject project={next} />
    </article>
  );
}
