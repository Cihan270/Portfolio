import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/types";
import { CaseVisual } from "@/components/visuals/CaseVisual";

/**
 * Compact case card: visual on top with the category as a label, then the
 * organization, one line of description and the one-line result.
 * The whole card is one link.
 */
export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className="group relative flex h-full flex-col border border-line bg-surface transition-colors duration-300 hover:border-ink">
      <div className="bg-grid relative overflow-hidden border-b border-line bg-paper-2">
        <div className="flex aspect-[16/10] items-center justify-center p-4 transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:p-6">
          <CaseVisual name={project.visual} className="max-h-full" />
        </div>
        <p className="absolute top-3 left-3 rounded-full border border-line bg-paper/85 px-2.5 py-1 text-[0.68rem] tracking-tight text-ink-2 backdrop-blur-[2px]">
          {project.category}
        </p>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-medium tracking-tight text-ink">
            <Link
              href={`/work/${project.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {project.organization}
            </Link>
          </h3>
          <span className="label shrink-0">{project.year}</span>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>

        <div className="mt-auto pt-4">
          <p className="label !text-[0.6rem]">{project.cardOutcome.label}</p>
          <p className="mt-1 flex items-start justify-between gap-3 text-sm font-medium text-ink">
            {project.cardOutcome.text}
            <ArrowUpRight
              size={15}
              strokeWidth={1.75}
              aria-hidden
              className="mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </p>
        </div>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 ring-2 ring-accent ring-offset-2 ring-offset-paper transition-opacity group-has-[a:focus-visible]:opacity-100"
      />
    </article>
  );
}
